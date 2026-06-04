import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  collection,
  doc,
  onSnapshot,
  writeBatch,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  WORLD_CUP_2026_MATCHES,
  STAGE_LABELS,
  STAGE_ORDER,
  GROUP_NAMES,
  getCurrentRound,
  calculateMatchPoints,
  isExactScore,
  isMatchDeadlinePassed,
  isMatchPast,
  getFlagUrl,
  formatMatchKickoff,
  POINTS_CORRECT_OUTCOME,
  POINTS_WRONG,
} from '../utils/worldCupData.js';
import { autoFetchResults } from '../utils/worldCupApi.js';
import { getTeamData } from '../utils/teamData.js';
import MatchDetailModal from './MatchDetailModal.jsx';

const SCORE_EMPTY = { homeScore: null, awayScore: null };
const USER_COLORS = ['#5bc0ff', '#ff7eb3', '#3ddc84', '#f0c040', '#c084fc', '#fb923c', '#f97316', '#22d3ee'];

const deriveOutcome = (h, a) => {
  if (h == null || a == null) return null;
  return h > a ? 'home' : h < a ? 'away' : 'draw';
};

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

function FlagImg({ team, size = 24 }) {
  const url = getFlagUrl(team);
  if (!url) return <span className="wc-flag-placeholder" />;
  return (
    <img
      className="wc-flag"
      src={url}
      alt={team}
      width={size}
      height={size * 0.75}
      loading="lazy"
    />
  );
}

function seedWorldCupMatches(firestore) {
  if (!firestore) return;
  const batch = writeBatch(firestore);
  WORLD_CUP_2026_MATCHES.forEach((match) => {
    const ref = doc(firestore, 'worldCupPredictions', match.matchKey);
    batch.set(ref, {
      ...match,
      predictions: {},
      actual: SCORE_EMPTY,
      actualSetAt: null,
      points: {},
      status: 'open',
      updatedAt: serverTimestamp(),
    }, { merge: true });
  });
  batch.commit().catch((err) => console.warn('World Cup seed failed', err));
}

export default function WorldCupPanel({ user, firestore, userDoc }) {
  const [matchDocs, setMatchDocs] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [dbReady, setDbReady] = useState(false);
  const [modalMatchKey, setModalMatchKey] = useState(null);
  const [filter, setFilter] = useState(() => {
    const r = getCurrentRound();
    return r ? `round${r.round}` : 'all';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(null);

  const seededRef = useRef(false);

  useEffect(() => {
    if (!firestore) { setDbReady(true); return; }
    const unsub = onSnapshot(collection(firestore, 'worldCupPredictions'), (snap) => {
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMatchDocs(docs);
      setDbReady(true);
      if (docs.length === 0 && !seededRef.current) {
        seededRef.current = true;
        seedWorldCupMatches(firestore);
      }
    }, (err) => { console.warn('WC snapshot error', err); setDbReady(true); });
    return unsub;
  }, [firestore]);

  useEffect(() => {
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore, 'users'), (snap) => {
      const map = {};
      snap.docs.forEach((d) => { map[d.id] = d.data(); });
      setUsersMap(map);
    }, (err) => console.warn('Users snapshot error', err));
    return unsub;
  }, [firestore]);

  const isAdmin = user && usersMap[user.uid]?.role === 'admin';

  const wcActivatedDay = useMemo(() => {
    const round = getCurrentRound();
    if (!round || !userDoc) return null;
    const wc = userDoc.wildCards?.['round' + round.round];
    return wc?.day || null;
  }, [userDoc]);

  const sortedUserUids = useMemo(() => {
    return Object.keys(usersMap).sort((a, b) => {
      const nA = usersMap[a]?.displayName || usersMap[a]?.email || (a === user?.uid && user?.displayName) || a;
      const nB = usersMap[b]?.displayName || usersMap[b]?.email || (b === user?.uid && user?.displayName) || b;
      return nA.localeCompare(nB);
    });
  }, [usersMap]);

  const getDisplayName = useCallback((uid) => {
    return usersMap[uid]?.displayName || usersMap[uid]?.email || (uid === user?.uid && user?.displayName) || uid.slice(0, 6);
  }, [usersMap, user]);

  const getUserColor = useCallback((uid) => {
    const idx = sortedUserUids.indexOf(uid);
    return USER_COLORS[Math.max(0, idx) % USER_COLORS.length];
  }, [sortedUserUids]);

  const matches = useMemo(() => {
    const map = {};
    matchDocs.forEach((d) => { map[d.matchKey] = d; });
    return WORLD_CUP_2026_MATCHES.map((m) => {
      const doc = map[m.matchKey] || {};
      return {
        ...m,
        ...doc,
        id: doc.id || m.matchKey,
        predictions: doc.predictions || {},
        actual: doc.actual || SCORE_EMPTY,
        points: doc.points || {},
      };
    });
  }, [matchDocs]);

  const predictedCount = useMemo(
    () => matches.filter((m) => m.stage === 'group' && m.predictions?.[user?.uid]?.homeScore != null).length,
    [matches, user],
  );

  const unpredicted = useMemo(
    () => matches.filter((m) =>
      m.stage === 'group' &&
      !isMatchDeadlinePassed(m.matchDate) &&
      m.actual?.homeScore == null &&
      m.predictions?.[user?.uid]?.homeScore == null
    ).length,
    [matches, user],
  );

  const stageProgress = useMemo(() => {
    return STAGE_ORDER.map((stage) => {
      const stageMatches = matches.filter((m) => m.stage === stage);
      const total = stageMatches.length;
      const scored = stageMatches.filter((m) => m.actual?.homeScore != null).length;
      return { stage, label: STAGE_LABELS[stage], total, scored };
    });
  }, [matches]);

  const groupStandings = useMemo(() => {
    const result = {};
    GROUP_NAMES.forEach((g) => {
      const groupMatches = matches.filter((m) => m.groupName === g);
      const teams = {};
      groupMatches.forEach((m) => {
        const h = m.homeTeam, aw = m.awayTeam;
        if (!teams[h]) teams[h] = { team: h, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 };
        if (!teams[aw]) teams[aw] = { team: aw, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 };
        if (m.actual?.homeScore == null) return;
        const sh = Number(m.actual.homeScore), sa = Number(m.actual.awayScore);
        teams[h].pld++; teams[aw].pld++;
        teams[h].gf += sh; teams[h].ga += sa;
        teams[aw].gf += sa; teams[aw].ga += sh;
        if (sh > sa) { teams[h].w++; teams[h].pts += 3; teams[aw].l++; }
        else if (sh < sa) { teams[aw].w++; teams[aw].pts += 3; teams[h].l++; }
        else { teams[h].d++; teams[h].pts++; teams[aw].d++; teams[aw].pts++; }
      });
      const list = Object.values(teams).map((t) => ({ ...t, gd: t.gf - t.ga }));
      list.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.team.localeCompare(b.team));
      result[g] = list;
    });
    return result;
  }, [matches]);

  const pointTrend = useMemo(() => {
    const scored = matches
      .filter((m) => m.actual?.homeScore != null)
      .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));
    const totals = {};
    sortedUserUids.forEach((uid) => { totals[uid] = 0; });
    return scored.map((m) => {
      Object.entries(m.points || {}).forEach(([uid, p]) => {
        if (totals[uid] !== undefined) totals[uid] += Number(p || 0);
      });
      return { ...totals };
    });
  }, [matches, sortedUserUids]);

  const selectedMatch = useMemo(
    () => matches.find((m) => m.matchKey === modalMatchKey) || null,
    [matches, modalMatchKey],
  );

  const nextMatch = useMemo(() => {
    const upcoming = matches
      .filter((m) => {
        if (isMatchDeadlinePassed(m.matchDate)) return false;
        if (m.actual?.homeScore != null) return false;
        const pred = m.predictions?.[user?.uid];
        return pred?.homeScore == null;
      })
      .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));
    return upcoming[0] || null;
  }, [matches, user]);

  const nextKickoff = useMemo(() => {
    const upcoming = matches
      .filter((m) => {
        if (isMatchPast(m.matchDate)) return false;
        if (m.actual?.homeScore != null) return false;
        return true;
      })
      .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));
    return upcoming[0] || null;
  }, [matches]);

  const needsPrediction = nextKickoff?.matchKey === nextMatch?.matchKey;

  const upcomingMatches = useMemo(() => {
    if (!nextKickoff) return [];
    const filtered = matches
      .filter((m) => {
        if (isMatchDeadlinePassed(m.matchDate)) return false;
        if (m.actual?.homeScore != null) return false;
        if (m.matchKey === nextKickoff.matchKey) return false;
        return true;
      })
      .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));
    return filtered.slice(0, 3);
  }, [matches, nextKickoff]);

  const crowdTargets = useMemo(() => [nextKickoff, ...upcomingMatches].filter(Boolean), [nextKickoff, upcomingMatches]);

  const [crowdMatchIdx, setCrowdMatchIdx] = useState(0);

  useEffect(() => {
    if (crowdTargets.length < 2) return;
    const id = setInterval(() => {
      setCrowdMatchIdx((prev) => (prev + 1) % crowdTargets.length);
    }, 3000);
    return () => clearInterval(id);
  }, [crowdTargets]);

  const crowdData = useMemo(() => {
    const target = crowdTargets[crowdMatchIdx] || crowdTargets[0] || null;
    if (!target) return null;
    const preds = target.predictions || {};
    const uids = Object.keys(preds).filter((uid) => preds[uid]?.homeScore != null);
    const total = uids.length;
    if (total === 0) return null;
    let home = 0, draw = 0, away = 0;
    uids.forEach((uid) => {
      const { homeScore, awayScore } = preds[uid];
      if (homeScore > awayScore) home++;
      else if (homeScore === awayScore) draw++;
      else away++;
    });
    return {
      match: target,
      home: Math.round((home / total) * 100),
      draw: Math.round((draw / total) * 100),
      away: Math.round((away / total) * 100),
      total,
    };
  }, [crowdTargets, crowdMatchIdx]);

  const userTotalPoints = useMemo(() => {
    let total = 0;
    matches.forEach((m) => {
      total += Number(m.points?.[user?.uid] || 0);
    });
    return total;
  }, [matches, user]);

  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const tick = () => {
      if (!nextKickoff) { setCountdown(''); return; }
      const diff = new Date(nextKickoff.matchDate).getTime() - Date.now();
      if (diff <= 0) { setCountdown('LIVE'); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      let parts = [];
      if (d > 0) parts.push(`${d}d`);
      parts.push(`${h}h`.padStart(3, ' '));
      parts.push(`${m}m`.padStart(3, ' '));
      parts.push(`${s}s`.padStart(3, ' '));
      setCountdown(parts.join(' '));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [nextKickoff]);

  const submitPrediction = useCallback(async (matchKey, homeScore, awayScore) => {
    if (!firestore || !user) return;
    const ref = doc(firestore, 'worldCupPredictions', matchKey);
    await updateDoc(ref, {
      [`predictions.${user.uid}`]: { homeScore: Number(homeScore), awayScore: Number(awayScore) },
      updatedAt: serverTimestamp(),
    }).catch((err) => console.warn('Prediction save failed', err));
  }, [firestore, user]);

  const submitActual = useCallback(async (matchKey, homeScore, awayScore) => {
    if (!firestore || !isAdmin) return;
    const ref = doc(firestore, 'worldCupPredictions', matchKey);
    const pts = {};
    const match = matches.find((m) => m.matchKey === matchKey);
    if (match) {
      Object.entries(match.predictions || {}).forEach(([uid, pred]) => {
        pts[uid] = calculateMatchPoints(pred, { homeScore: Number(homeScore), awayScore: Number(awayScore) });
      });
    }
    await updateDoc(ref, {
      actual: { homeScore: Number(homeScore), awayScore: Number(awayScore) },
      actualSetAt: serverTimestamp(),
      points: pts,
      status: 'scored',
      updatedAt: serverTimestamp(),
    }).catch((err) => console.warn('Actual score save failed', err));
  }, [firestore, isAdmin, matches]);

  const updateTeams = useCallback(async (matchKey, homeTeam, awayTeam) => {
    if (!firestore || !isAdmin) return;
    const ref = doc(firestore, 'worldCupPredictions', matchKey);
    await updateDoc(ref, {
      homeTeam, awayTeam,
      knockoutPlaceholder: false,
      updatedAt: serverTimestamp(),
    }).catch((err) => console.warn('Team update failed', err));
  }, [firestore, isAdmin]);

  const handleAutoFetch = useCallback(async () => {
    if (!firestore || !isAdmin) return;
    setIsFetching(true);
    setFetchStatus(null);
    const result = await autoFetchResults(firestore, matchDocs);
    setFetchStatus(result);
    setIsFetching(false);
  }, [firestore, isAdmin, matchDocs]);

  const openModal = useCallback((matchKey) => {
    setModalMatchKey(matchKey);
  }, []);

  const closeModal = useCallback(() => {
    setModalMatchKey(null);
  }, []);

  const grouped = useMemo(() => {
    const groups = {};
    STAGE_ORDER.forEach((stage) => { groups[stage] = []; });
    matches.forEach((m) => { if (groups[m.stage]) groups[m.stage].push(m); });
    Object.keys(groups).forEach((stage) => {
      if (stage === 'group') {
        groups[stage].sort((a, b) => {
          const ga = a.groupName || '';
          const gb = b.groupName || '';
          if (ga !== gb) return ga.localeCompare(gb);
          return (a.matchday || 0) - (b.matchday || 0);
        });
      } else {
        groups[stage].sort((a, b) => (a.matchNumber || 0) - (b.matchNumber || 0));
      }
    });
    return groups;
  }, [matches]);

  if (!dbReady) {
    return <section className="panel lobby-panel wc-panel"><p className="wc-loading">Loading World Cup...</p></section>;
  }

  const outcomeLabel = (h, a) => {
    const o = deriveOutcome(h, a);
    if (o === 'home') return 'Home Win';
    if (o === 'away') return 'Away Win';
    if (o === 'draw') return 'Draw';
    return '';
  };

  const pointsBadge = (pts, isExact) => {
    if (isExact) return <span className="wc-badge wc-badge--exact" title="Exact score">+{pts}</span>;
    if (pts === POINTS_CORRECT_OUTCOME) return <span className="wc-badge wc-badge--outcome" title="Correct outcome">+2</span>;
    if (pts === 0) return <span className="wc-badge wc-badge--wrong" title="Wrong">0</span>;
    return null;
  };

  const matchStatusIcon = (m) => {
    if (m.actual?.homeScore != null) return '\uD83D\uDCCA';
    if (isMatchDeadlinePassed(m.matchDate)) return '\uD83D\uDD12';
    return '\u23F3';
  };

  const isSearchMatch = (m) => {
    if (searchQuery.trim().length < 2) return true;
    const q = searchQuery.trim().toLowerCase();
    return m.homeTeam.toLowerCase().includes(q) || m.awayTeam.toLowerCase().includes(q);
  };

  return (
    <section className="panel lobby-panel wc-panel" aria-label="World Cup 2026">
      <header className="wc-header">
        <div className="wc-title-row">
            <h2 className="wc-title">{'\uD83C\uDF0D'} World Cup 2026</h2>
        </div>
      </header>

      {nextKickoff && (
        <div className="wc-hero">
          <div className="wc-hero-teams">
            <FlagImg team={nextKickoff.homeTeam} size={56} />
            <div className="wc-hero-team">
              <span className="wc-hero-team-name">{nextKickoff.homeTeam}</span>
              <span className="wc-hero-rank">FIFA #{getTeamData(nextKickoff.homeTeam).fifaRank}</span>
            </div>
            <span className="wc-hero-vs">vs</span>
            <div className="wc-hero-team wc-hero-team--away">
              <span className="wc-hero-team-name">{nextKickoff.awayTeam}</span>
              <span className="wc-hero-rank">FIFA #{getTeamData(nextKickoff.awayTeam).fifaRank}</span>
            </div>
            <FlagImg team={nextKickoff.awayTeam} size={56} />
          </div>
          <div className="wc-hero-venue">{'\uD83C\uDFDF\uFE0F'} {nextKickoff.venue}</div>
          <div className="wc-hero-kickoff">{'\u26BD'} {formatMatchKickoff(nextKickoff.matchDate)}</div>
          <div className="wc-hero-countdown">{'\u23F0'} {countdown || '\u2014'}</div>
          <div className="wc-hero-prediction">
            <span className="wc-hero-pred-label">YOUR PREDICTION</span>
            {user && nextKickoff.predictions?.[user.uid] ? (
              <div className="wc-hero-pred-score-row">
                <FlagImg team={nextKickoff.homeTeam} size={16} />
                <span className="wc-hero-pred-score">
                  {nextKickoff.predictions[user.uid].homeScore} : {nextKickoff.predictions[user.uid].awayScore}
                </span>
                <FlagImg team={nextKickoff.awayTeam} size={16} />
              </div>
            ) : (
              <button type="button" className="wc-hero-pred-btn wc-hero-pred-btn--primary" onClick={() => openModal(nextKickoff.matchKey)}>
                {'\u26A1'} Predict this match
              </button>
            )}
          </div>
        </div>
      )}

      <div className="wc-tiles-row">
        {[0, 1, 2].map((i) => (
          <div key={i} className={'wc-tile' + (upcomingMatches[i] ? ' wc-tile--upcoming' : ' wc-tile--placeholder')}>
            {upcomingMatches[i] ? (
              <button type="button" className="wc-tile-inner" onClick={() => openModal(upcomingMatches[i].matchKey)}>
                <div className="wc-tile-teams">
                  <div className="wc-tile-team-row">
                    <FlagImg team={upcomingMatches[i].homeTeam} size={24} />
                    <span className="wc-tile-team-name">{shortTeam(upcomingMatches[i].homeTeam)}</span>
                  </div>
                  <span className="wc-tile-vs">vs</span>
                  <div className="wc-tile-team-row wc-tile-team-row--away">
                    <FlagImg team={upcomingMatches[i].awayTeam} size={24} />
                    <span className="wc-tile-team-name">{shortTeam(upcomingMatches[i].awayTeam)}</span>
                  </div>
                </div>
                <div className="wc-tile-info">
                  <span className="wc-tile-venue">{'\uD83C\uDFDF\uFE0F'} {upcomingMatches[i].venue}</span>
                  <span className="wc-tile-kickoff">{'\u26BD'} {formatMatchKickoff(upcomingMatches[i].matchDate)}</span>
                </div>
                <div className="wc-tile-countdown-wrap">
                  <TileCountdown matchDate={upcomingMatches[i].matchDate} />
                </div>
                <div className="wc-tile-prediction">
                  {user && upcomingMatches[i].predictions?.[user.uid] ? (
                    <div className="wc-tile-pred-score-row">
                      <FlagImg team={upcomingMatches[i].homeTeam} size={14} />
                      <span className="wc-tile-pred-score">{upcomingMatches[i].predictions[user.uid].homeScore} : {upcomingMatches[i].predictions[user.uid].awayScore}</span>
                      <FlagImg team={upcomingMatches[i].awayTeam} size={14} />
                    </div>
                  ) : (
                    <span className="wc-tile-pred-btn">{'\u26A1'} Predict</span>
                  )}
                </div>
              </button>
            ) : (
              <div className="wc-tile-inner">
                <div className="wc-tile-placeholder-icon">{'\uD83D\uDCC5'}</div>
                <div className="wc-tile-placeholder-title">Upcoming Match</div>
                <div className="wc-tile-placeholder-sub">No more fixtures</div>
              </div>
            )}
          </div>
        ))}
        <div className="wc-tile wc-tile--crowd">
          <div className="wc-tile-inner">
            {crowdData ? (
              <>
                <div className="wc-crowd-title">Crowd Predictions</div>
                <div className="wc-crowd-teams">
                  <FlagImg team={crowdData.match.homeTeam} size={20} />
                  <span className="wc-crowd-vs">vs</span>
                  <FlagImg team={crowdData.match.awayTeam} size={20} />
                </div>
                <div className="wc-crowd-bars">
                  {[
                    { label: shortTeam(crowdData.match.homeTeam), pct: crowdData.home, cls: 'wc-crowd-bar--home' },
                    { label: 'Draw', pct: crowdData.draw, cls: 'wc-crowd-bar--draw' },
                    { label: shortTeam(crowdData.match.awayTeam), pct: crowdData.away, cls: 'wc-crowd-bar--away' },
                  ].map((row) => (
                    <div key={row.label} className="wc-crowd-bar-row">
                      <span className="wc-crowd-label">{row.label}</span>
                      <div className="wc-crowd-bar-bg">
                        <div className={'wc-crowd-bar ' + row.cls} style={{ width: row.pct + '%' }} />
                      </div>
                      <span className="wc-crowd-pct">{row.pct}%</span>
                    </div>
                  ))}
                </div>
                <div className="wc-crowd-footnote">{crowdData.total} predictors</div>
              </>
            ) : (
              <div className="wc-crowd-empty">No crowd data yet</div>
            )}
          </div>
        </div>
      </div>

      <div className="wc-filter-row">
        <div className="wc-filter-pills">
          {[
            { value: 'round1', label: 'Round 1' },
            { value: 'round2', label: 'Round 2' },
            { value: 'round3', label: 'Round 3' },
            { value: 'all', label: 'All Fixtures' },
          ].map((f) => (
            <button key={f.value} type="button" className={`wc-filter-btn ${filter === f.value ? 'is-active' : ''}`} onClick={() => setFilter(f.value)}>
              {f.label}
            </button>
          ))}
        </div>
        <input
          type="text" className="wc-search-input" placeholder={'\uD83D\uDD0D Search team\u2026'}
          value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
        />
        {isAdmin && (
          <button type="button" className="wc-fetch-btn" onClick={handleAutoFetch} disabled={isFetching}>
            {isFetching ? '\u23F3 Fetching\u2026' : '\uD83D\uDD04 Auto-Fetch Results'}
          </button>
        )}
      </div>
      {fetchStatus && (
        <div className="wc-fetch-status">
          {'\u2705'} Fetched {fetchStatus.fetched} matches, wrote {fetchStatus.written} new result{fetchStatus.written === 1 ? '' : 's'}
          {fetchStatus.errors > 0 && (
            <span className="wc-fetch-status--error"> {'\u274C'} {fetchStatus.errors} error{fetchStatus.errors === 1 ? '' : 's'}</span>
          )}
        </div>
      )}

      {pointTrend.length >= 2 && sortedUserUids.length > 0 && (
        <div className="wc-trend">
          <svg viewBox="0 0 280 50" className="wc-trend-svg" preserveAspectRatio="none">
            {sortedUserUids.map((uid) => {
              const color = getUserColor(uid);
              const maxVal = Math.max(...pointTrend.map((p) => Math.max(...Object.values(p))), 1);
              const pts = pointTrend.map((p, i) => {
                const x = (i / (pointTrend.length - 1)) * 280;
                const y = 50 - ((p[uid] || 0) / maxVal) * 44 - 3;
                return `${x},${y}`;
              }).join(' ');
              return (
                <polyline key={uid} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" points={pts} />
              );
            })}
            {pointTrend.map((p, i) => (
              <g key={i}>
                {sortedUserUids.map((uid) => {
                  const x = (i / (pointTrend.length - 1)) * 280;
                  const maxVal = Math.max(...pointTrend.map((pt) => Math.max(...Object.values(pt))), 1);
                  const y = 50 - ((p[uid] || 0) / maxVal) * 44 - 3;
                  return <circle key={uid} cx={x} cy={y} r="2" fill={getUserColor(uid)} />;
                })}
              </g>
            ))}
          </svg>
          <div className="wc-trend-labels">
            {sortedUserUids.map((uid) => {
              const last = pointTrend.at(-1);
              return (
                <span key={uid} style={{ color: getUserColor(uid) }}>
                  {getDisplayName(uid)} ({last?.[uid] || 0})
                </span>
              );
            })}
          </div>
        </div>
      )}

      {filter === 'all' && (
        <div className="wc-stage-bar">
          {stageProgress.map((s) => (
            <div key={s.stage} className="wc-stage-bar-segment" title={`${s.label}: ${s.scored}/${s.total}`}>
              <div className="wc-stage-bar-fill" style={{ width: `${s.total > 0 ? (s.scored / s.total) * 100 : 0}%` }} />
            </div>
          ))}
        </div>
      )}

      {[1, 2, 3].map((day) => {
        if (filter !== 'all' && filter !== `round${day}`) return null;
        const dayMatches = grouped.group.filter((m) => m.matchday === day && isSearchMatch(m));
        if (dayMatches.length === 0) return null;
        return (
          <div key={day} className="wc-round-section">
            <div className="wc-round-title">Round {day}</div>
            <div className="wc-stage-matches">
              {dayMatches.map((m) => (
                <div key={m.matchKey} className={`wc-match-row${wcActivatedDay && m.matchDate.startsWith(wcActivatedDay) ? ' wc-match-row--wc-highlight' : ''}`} role="button" tabIndex={0} onClick={() => openModal(m.matchKey)} onKeyDown={(e) => e.key === 'Enter' && openModal(m.matchKey)}>
                  <span className="wc-match-status">{matchStatusIcon(m)}</span>
                  <span className="wc-match-teams">
                    <span className="wc-match-teams-home">
                      <FlagImg team={m.homeTeam} />
                      <span className="wc-team-name">{shortTeam(m.homeTeam)}</span>
                    </span>
                    {m.actual?.homeScore != null ? (
                      <span className="wc-inline-score wc-inline-score--actual">
                        {m.actual.homeScore} {'\u2013'} {m.actual.awayScore}
                      </span>
                    ) : null}
                    <span className="wc-match-teams-away">
                      <span className="wc-team-name">{shortTeam(m.awayTeam)}</span>
                      <FlagImg team={m.awayTeam} />
                    </span>
                  </span>
                  <span className="wc-match-points">
                    {m.actual?.homeScore != null && sortedUserUids.map((uid) => {
                      const pts = m.points?.[uid];
                      return pts != null ? pointsBadge(pts, isExactScore(m.predictions?.[uid], m.actual)) : null;
                    })}
                  </span>
                  <span className="wc-match-date">{formatMatchKickoff(m.matchDate)}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

       {filter === 'all' && (
        <div className="wc-knockout-section">
          <h3 className="wc-section-title">{'\uD83C\uDFC6'} Knockout Stage</h3>
          {['roundOf32', 'roundOf16', 'quarterFinal', 'semiFinal', 'thirdPlace', 'final'].map((stage) => {
            const stageMatches = grouped[stage];
            if (!stageMatches || stageMatches.length === 0) return null;
            const isBracket = stage === 'quarterFinal' || stage === 'semiFinal' || stage === 'final' || stage === 'thirdPlace';
            return (
              <div key={stage} className={`wc-stage-group ${isBracket ? 'wc-stage-bracket' : ''}`}>
                <h4 className="wc-stage-title">{STAGE_LABELS[stage]}</h4>
                <div className={`wc-stage-matches ${isBracket ? 'wc-bracket-grid' : ''}`}>
                  {stageMatches.filter(isSearchMatch).map((m) => (
                    <div key={m.matchKey} className={`wc-match-row ${isBracket ? 'wc-match-row--bracket' : ''}${wcActivatedDay && m.matchDate.startsWith(wcActivatedDay) ? ' wc-match-row--wc-highlight' : ''}`} role="button" tabIndex={0} onClick={() => openModal(m.matchKey)} onKeyDown={(e) => e.key === 'Enter' && openModal(m.matchKey)}>
                      <span className="wc-match-status">{matchStatusIcon(m)}</span>
                      <span className="wc-match-teams">
                        <span className="wc-match-teams-home">
                          <FlagImg team={m.homeTeam} />
                          <span className="wc-team-name">{shortTeam(m.homeTeam)}</span>
                        </span>
                        {m.actual?.homeScore != null ? (
                          <span className="wc-inline-score wc-inline-score--actual">
                            {m.actual.homeScore} {'\u2013'} {m.actual.awayScore}
                          </span>
                        ) : null}
                        <span className="wc-match-teams-away">
                          <span className="wc-team-name">{shortTeam(m.awayTeam)}</span>
                          <FlagImg team={m.awayTeam} />
                        </span>
                      </span>
                      <span className="wc-match-points">
                        {m.actual?.homeScore != null && sortedUserUids.map((uid) => {
                          const pts = m.points?.[uid];
                          return pts != null ? pointsBadge(pts, isExactScore(m.predictions?.[uid], m.actual)) : null;
                        })}
                      </span>
                      <span className="wc-match-date">{formatMatchKickoff(m.matchDate)}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <footer className="wc-footer">
        <span className="wc-legend"><span className="wc-legend-dot wc-legend-dot--exact" /> Exact (5 + 1 per goal)</span>
        <span className="wc-legend"><span className="wc-legend-dot wc-legend-dot--outcome" /> Outcome {POINTS_CORRECT_OUTCOME}pts</span>
        <span className="wc-legend"><span className="wc-legend-dot wc-legend-dot--wrong" /> Wrong {POINTS_WRONG}pts</span>
      </footer>

      {selectedMatch && createPortal(
        <div className="modal-backdrop" role="presentation" onClick={closeModal}>
          <div className="panel modal-panel wc-modal" role="dialog" aria-modal="true" aria-label="Match details" onClick={(e) => e.stopPropagation()}>
            <MatchDetailModal
              match={selectedMatch}
              user={user}
              userDoc={userDoc}
              firestore={firestore}
              isAdmin={isAdmin}
              matches={matches}
              sortedUserUids={sortedUserUids}
              getDisplayName={getDisplayName}
              getUserColor={getUserColor}
              onSubmitPrediction={submitPrediction}
              onSubmitActual={submitActual}
              onUpdateTeams={updateTeams}
              onClose={closeModal}
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

function TileCountdown({ matchDate }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = new Date(matchDate).getTime() - now;
  if (diff <= 0) return <span className="wc-tile-countdown wc-tile-countdown--live">LIVE</span>;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  let parts = [];
  if (d > 0) parts.push(d + 'd');
  parts.push(h + 'h', m + 'm', s + 's');
  return <span className="wc-tile-countdown">{parts.join(' ')}</span>;
}

function shortTeam(name) {
  if (name === 'Bosnia and Herzegovina') return 'Bosnia';
  if (name === "C\u00F4te d'Ivoire") return "C\u00F4te d'Ivoire";
  if (name === 'Korea Republic') return 'S. Korea';
  if (name === 'IR Iran') return 'Iran';
  if (name === 'Cabo Verde') return 'C. Verde';
  if (name === 'Congo DR') return 'Congo';
  if (name === 'Saudi Arabia') return 'Saudi Ar.';
  if (name === 'Netherlands') return 'Netherlands';
  if (name === 'Switzerland') return 'Switzerland';
  if (name === 'Czechia') return 'Czechia';
  if (name === 'T\u00FCrkiye') return 'T\u00FCrkiye';
  if (name === 'New Zealand') return 'N. Zealand';
  if (name.length > 9) return name.slice(0, 8) + '\u2026';
  return name;
}


