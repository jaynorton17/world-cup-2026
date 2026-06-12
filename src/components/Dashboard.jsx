import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, limit, onSnapshot, query } from 'firebase/firestore';
import { MASTER_LEAGUE_ID, MASTER_LEAGUE_NAME } from '../utils/leaguesData.js';
import {
  WORLD_CUP_2026_MATCHES,
  PODIUM_POINTS,
  PODIUM_TRIPLE_MULTIPLIER,
  isMatchDeadlinePassed,
  isExactScore,
  getFlagUrl,
  formatMatchKickoff,
} from '../utils/worldCupData.js';
import { getTeamData } from '../utils/teamData.js';
import useTickingInterval from '../hooks/useTickingInterval.js';

const USERS_QUERY_LIMIT = 500;

function FlagImg({ team, size = 20 }) {
  const url = getFlagUrl(team);
  if (!url) return <span className="dash-flag-placeholder" style={{ width: size, height: size * 0.75 }} />;
  return (
    <img
      className="dash-flag"
      src={url}
      alt={team}
      width={size}
      height={size * 0.75}
      loading="lazy"
      onError={(e) => { e.target.style.display = 'none' }}
    />
  );
}

function shortTeam(name) {
  if (name === 'Bosnia and Herzegovina') return 'Bosnia';
  if (name === 'Ivory Coast' || name === "C\u00F4te d'Ivoire") return 'Ivory Coast';
  if (name === 'South Korea' || name === 'Korea Republic') return 'S. Korea';
  if (name === 'Iran' || name === 'IR Iran') return 'Iran';
  if (name === 'Cape Verde' || name === 'Cabo Verde') return 'C. Verde';
  if (name === 'DR Congo' || name === 'Congo DR') return 'DR Congo';
  if (name === 'Saudi Arabia') return 'Saudi Ar.';
  if (name === 'United States' || name === 'USA') return 'USA';
  if (name.length > 9) return name.slice(0, 8) + '\u2026';
  return name;
}

export default function Dashboard({ user, firestore, onOpenPodium }) {
  const navigate = useNavigate();
  const [matchDocs, setMatchDocs] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [userDoc, setUserDoc] = useState(null);
  const [leagues, setLeagues] = useState([]);
  const [leagueIdx, setLeagueIdx] = useState(0);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore, 'worldCupPredictions'), (snap) => {
      setMatchDocs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }, (err) => { console.warn('Dashboard predictions snapshot error', err); });
    return unsub;
  }, [firestore]);

  useEffect(() => {
    if (!firestore) return;
    const unsub = onSnapshot(query(collection(firestore, 'users'), limit(USERS_QUERY_LIMIT)), (snap) => {
      const map = {};
      snap.docs.forEach((d) => { map[d.id] = d.data(); });
      setUsersMap(map);
    }, (err) => { console.warn('Dashboard users snapshot error', err); });
    return unsub;
  }, [firestore]);

  useEffect(() => {
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore, 'leagues'), (snap) => {
      setLeagues(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }, (err) => { console.warn('Dashboard leagues snapshot error', err); });
    return unsub;
  }, [firestore]);

  useEffect(() => {
    if (!firestore || !user) return;
    const unsub = onSnapshot(doc(firestore, 'users', user.uid), (snap) => {
      setUserDoc(snap.data() || null);
    }, (err) => { console.warn('Dashboard userDoc snapshot error', err); });
    return unsub;
  }, [firestore, user]);

  const userLeagueIds = userDoc?.leagueIds || [];

  const allLeagues = useMemo(() => {
    const userLeagues = leagues
      .filter((l) => l.id !== MASTER_LEAGUE_ID && userLeagueIds.includes(l.id))
      .sort((a, b) => a.name.localeCompare(b.name));
    return [{ id: MASTER_LEAGUE_ID, name: MASTER_LEAGUE_NAME }, ...userLeagues];
  }, [leagues, userLeagueIds]);

  const selectedLeagueId = allLeagues[leagueIdx]?.id || MASTER_LEAGUE_ID;

  const [leaguePaused, setLeaguePaused] = useState(false);

  useTickingInterval(() => {
    setLeagueIdx((prev) => (prev + 1) % allLeagues.length);
  }, 4000, allLeagues.length > 1 && !leaguePaused);

  const cycleLeague = (dir) => {
    setLeaguePaused(true);
    setLeagueIdx((prev) => {
      const next = prev + dir;
      if (next < 0) return allLeagues.length - 1;
      if (next >= allLeagues.length) return 0;
      return next;
    });
    setTimeout(() => setLeaguePaused(false), 8000);
  };

  const sortedUserUids = useMemo(() => {
    if (!selectedLeagueId) return [];
    const memberUids = Object.keys(usersMap).filter((uid) => {
      const role = usersMap[uid]?.role;
      if (role === 'admin' || role === 'juniorAdmin') return false;
      const ids = usersMap[uid]?.leagueIds || [];
      if (selectedLeagueId === MASTER_LEAGUE_ID) return true;
      return ids.includes(selectedLeagueId);
    });
    return memberUids.sort((a, b) => {
      const nA = usersMap[a]?.displayName || (a === user?.uid && user?.displayName) || a;
      const nB = usersMap[b]?.displayName || (b === user?.uid && user?.displayName) || b;
      return nA.localeCompare(nB);
    });
  }, [usersMap, selectedLeagueId]);

  const matches = useMemo(() => {
    const map = {};
    matchDocs.forEach((d) => { map[d.matchKey] = d; });
    return WORLD_CUP_2026_MATCHES.map((m) => {
      const doc = map[m.matchKey] || {};
      return { ...m, id: doc.id || m.matchKey, predictions: doc.predictions || {}, actual: doc.actual || { homeScore: null, awayScore: null }, points: doc.points || {} };
    });
  }, [matchDocs]);

  const userPoints = useMemo(() => {
    const pts = {};
    Object.keys(usersMap).forEach((uid) => { pts[uid] = 0; });
    matches.forEach((m) => {
      Object.entries(m.points || {}).forEach(([uid, p]) => {
        if (pts[uid] !== undefined) pts[uid] += Number(p || 0);
      });
    });
    return pts;
  }, [matches, usersMap]);

  const leaderboard = useMemo(() => {
    return sortedUserUids
      .map((uid) => ({ uid, name: usersMap[uid]?.displayName || (uid === user?.uid && user?.displayName) || uid.slice(0, 6), points: userPoints[uid] || 0 }))
      .sort((a, b) => b.points - a.points);
  }, [sortedUserUids, userPoints, usersMap, user]);

  const myPoints = userPoints[user?.uid] || 0;

  const [pointsPlayerUid, setPointsPlayerUid] = useState(user?.uid || null);

  const pointsPlayerName = useMemo(() => {
    if (pointsPlayerUid === user?.uid) return 'Your';
    return (usersMap[pointsPlayerUid]?.displayName || 'Player') + "'s";
  }, [pointsPlayerUid, usersMap, user]);

  const predictedCount = useMemo(
    () => matches.filter((m) => m.stage === 'group' && m.predictions?.[user?.uid]?.homeScore != null).length,
    [matches, user],
  );

  const totalGroup = useMemo(
    () => matches.filter((m) => m.stage === 'group').length,
    [matches],
  );

  const nextKickoff = useMemo(() => {
    return matches
      .filter((m) => {
        if (isMatchDeadlinePassed(m.matchDate)) return false;
        if (m.actual?.homeScore != null) return false;
        return true;
      })
      .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))[0] || null;
  }, [matches]);

  useTickingInterval(() => {
    if (!nextKickoff?.matchDate) { setCountdown(''); return; }
    const diff = new Date(nextKickoff.matchDate).getTime() - Date.now();
    if (diff <= 0) { setCountdown('LIVE'); return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const parts = [];
    if (d > 0) parts.push(d + 'd');
    parts.push(String(h).padStart(2, '0') + 'h');
    parts.push(String(m).padStart(2, '0') + 'm');
    parts.push(String(s).padStart(2, '0') + 's');
    setCountdown(parts.join(' '));
  }, 1000, !!nextKickoff?.matchDate);

  const miniLeaderboard = useMemo(() => {
    const idx = leaderboard.findIndex((e) => e.uid === user?.uid);
    if (idx < 0) return leaderboard.slice(0, 5);
    const start = Math.max(0, idx - 2);
    const end = Math.min(leaderboard.length, idx + 3);
    return leaderboard.slice(start, end);
  }, [leaderboard, user]);

  const scoredMatches = useMemo(() => {
    return matches
      .filter((m) => m.actual?.homeScore != null && m.predictions?.[pointsPlayerUid]?.homeScore != null)
      .sort((a, b) => new Date(b.matchDate) - new Date(a.matchDate));
  }, [matches, pointsPlayerUid]);

  const exactCount = useMemo(() => {
    return scoredMatches.filter((m) => isExactScore(m.predictions?.[pointsPlayerUid], m.actual)).length;
  }, [scoredMatches, pointsPlayerUid]);

  const outcomeCount = useMemo(() => {
    return scoredMatches.filter((m) => {
      const pred = m.predictions?.[pointsPlayerUid];
      if (!pred) return false;
      if (isExactScore(pred, m.actual)) return false;
      const pH = Number(pred.homeScore), pA = Number(pred.awayScore);
      const aH = Number(m.actual.homeScore), aA = Number(m.actual.awayScore);
      const pOut = pH > pA ? 'home' : pH < pA ? 'away' : 'draw';
      const aOut = aH > aA ? 'home' : aH < aA ? 'away' : 'draw';
      return pOut === aOut;
    }).length;
  }, [scoredMatches, pointsPlayerUid]);

  const wrongCount = useMemo(() => {
    return scoredMatches.filter((m) => {
      const pts = m.points?.[pointsPlayerUid];
      return pts === 0 || pts == null;
    }).length;
  }, [scoredMatches, pointsPlayerUid]);

  const pointsTotal = userPoints[pointsPlayerUid] || 0;

  return (
    <section className="panel dash-panel">
      <h1 className="dash-title">{user?.displayName?.split(' ')[0] || 'Player'}'s Dashboard</h1>

      {/* Next Match */}
      {nextKickoff && (
        <div className="dash-next-match" onClick={() => navigate('/matches')} style={{ cursor: 'pointer' }}>
          <div className="dash-next-match-label">Next Match</div>
          <div className="dash-next-match-teams">
            <div className="dash-next-match-team">
              <FlagImg team={nextKickoff.homeTeam} size={44} />
              <span className="dash-next-match-team-name">{shortTeam(nextKickoff.homeTeam)}</span>
              <span className="dash-next-match-rank">FIFA #{getTeamData(nextKickoff.homeTeam).fifaRank}</span>
            </div>
            <span className="dash-next-match-vs">vs</span>
            <div className="dash-next-match-team dash-next-match-team--away">
              <FlagImg team={nextKickoff.awayTeam} size={44} />
              <span className="dash-next-match-team-name">{shortTeam(nextKickoff.awayTeam)}</span>
              <span className="dash-next-match-rank">FIFA #{getTeamData(nextKickoff.awayTeam).fifaRank}</span>
            </div>
          </div>
          <div className="dash-next-match-venue">{'\uD83C\uDFDF\uFE0F'} {nextKickoff.venue}</div>
          <div className="dash-next-match-kickoff">{'\u26BD'} {formatMatchKickoff(nextKickoff.matchDate)}</div>
          <div className="dash-next-match-countdown">{countdown || '\u2014'}</div>
          <div className="dash-next-match-prediction">
            <span className="dash-next-match-pred-label">YOUR PREDICTION</span>
            {user && nextKickoff.predictions?.[user.uid] ? (
              <div className="dash-next-match-pred-score-row">
                <FlagImg team={nextKickoff.homeTeam} size={14} />
                <span className="dash-next-match-pred-score">
                  {nextKickoff.predictions[user.uid].homeScore} : {nextKickoff.predictions[user.uid].awayScore}
                </span>
                <FlagImg team={nextKickoff.awayTeam} size={14} />
              </div>
            ) : (
              <span className="dash-next-match-pred-btn">{'\u26A1'} Predict this match</span>
            )}
          </div>
          <div className="dash-next-match-footer">
            <span className="dash-next-match-pred-count">{predictedCount} of {totalGroup} predicted</span>
            <button type="button" className="dash-next-match-predictions-link" onClick={(e) => { e.stopPropagation(); navigate('/my-predictions'); }}>
              Go to Predictions {'\u2192'}
            </button>
          </div>
        </div>
      )}
      {!nextKickoff && (
        <div className="dash-next-match dash-next-match--empty">
          <div className="dash-next-match-label">Next Match</div>
          <div className="dash-empty">All group matches complete!</div>
          <div className="dash-next-match-footer">
            <span className="dash-next-match-pred-count">{predictedCount} of {totalGroup} predicted</span>
            <button type="button" className="dash-next-match-predictions-link" onClick={() => navigate('/my-predictions')}>
              Go to Predictions {'\u2192'}
            </button>
          </div>
        </div>
      )}

      {/* Leagues Tile */}
      <div className="dash-league-tile">
        <div className="dash-league-header">
          <button type="button" className="dash-league-arrow" onClick={() => cycleLeague(-1)} aria-label="Previous league">{'\u25C0'}</button>
          <span className="dash-league-name" onClick={() => {
            const id = selectedLeagueId === MASTER_LEAGUE_ID ? '' : selectedLeagueId;
            navigate(id ? `/leagues/${id}` : '/leaderboard');
          }} style={{ cursor: 'pointer' }}>
            {allLeagues[leagueIdx]?.name || MASTER_LEAGUE_NAME}
          </span>
          <button type="button" className="dash-league-arrow" onClick={() => cycleLeague(1)} aria-label="Next league">{'\u25B6'}</button>
        </div>
        <div className="dash-mini-lb">
          {miniLeaderboard.map((entry) => {
            const isMe = entry.uid === user?.uid;
            const pos = leaderboard.indexOf(entry) + 1;
            return (
              <div key={entry.uid} className={`dash-mini-lb-row${isMe ? ' dash-mini-lb-row--me' : ''}`}>
                <span className="dash-mini-lb-pos">{pos}</span>
                <span className="dash-mini-lb-name">{entry.name}</span>
                <span className="dash-mini-lb-pts">{entry.points}</span>
              </div>
            );
          })}
          {miniLeaderboard.length === 0 && (
            <div className="dash-empty">No league data yet</div>
          )}
        </div>
        {userDoc?.podiumPrediction && (() => {
          const pp = userDoc.podiumPrediction;
          const picks = pp.final || pp.initial || pp;
          const isFinalized = !!pp.final;
          const isTripleEligible = isFinalized && pp.initial && pp.final
            && pp.initial.first === pp.final.first
            && pp.initial.second === pp.final.second
            && pp.initial.third === pp.final.third;
          return (
            <div className="dash-podium-mini">
              <div className="dash-podium-mini-title">My Podium Picks</div>
              {[
                { key: 'first', icon: '\uD83E\uDD47', team: picks.first, pts: PODIUM_POINTS.first },
                { key: 'second', icon: '\uD83E\uDD48', team: picks.second, pts: PODIUM_POINTS.second },
                { key: 'third', icon: '\uD83E\uDD49', team: picks.third, pts: PODIUM_POINTS.third },
              ].map((p) => (
                <div key={p.key} className="dash-podium-mini-row">
                  <span className="dash-podium-mini-medal">{p.icon}</span>
                  <span className="dash-podium-mini-team">{p.team}</span>
                  <span className="dash-podium-mini-pts">+{isTripleEligible ? p.pts * PODIUM_TRIPLE_MULTIPLIER : p.pts}</span>
                </div>
              ))}
            </div>
          );
        })()}
        {(!userDoc?.podiumPrediction) && (
          <div className="dash-podium-mini dash-podium-mini--empty" onClick={onOpenPodium} style={{ cursor: 'pointer' }}>
            <div className="dash-podium-mini-title">Podium Picks</div>
            <div className="dash-podium-mini-empty-text">Set your podium picks {'\u2192'}</div>
          </div>
        )}
      </div>

      {/* Your Points */}
      <div className="dash-points-tile">
        <div className="dash-points-header">
          <select
            className="dash-points-player-select"
            value={pointsPlayerUid || ''}
            onChange={(e) => setPointsPlayerUid(e.target.value)}
          >
            <option value={user?.uid}>{user?.displayName || 'You'}</option>
            {leaderboard.filter((e) => e.uid !== user?.uid).map((e) => (
              <option key={e.uid} value={e.uid}>{e.name}</option>
            ))}
          </select>
          <span className="dash-points-total">{pointsTotal} pts</span>
        </div>
        <div className="dash-points-summary">
          <span className="dash-points-badge dash-points-badge--exact">{exactCount} exact</span>
          <span className="dash-points-badge dash-points-badge--outcome">{outcomeCount} outcome</span>
          <span className="dash-points-badge dash-points-badge--wrong">{wrongCount} wrong</span>
        </div>
        {scoredMatches.length === 0 && (
          <div className="dash-empty">No scored matches yet</div>
        )}
        <div className="dash-points-list">
          {scoredMatches.map((m) => {
            const pred = m.predictions?.[pointsPlayerUid];
            const pts = Number(m.points?.[pointsPlayerUid] || 0);
            const exact = isExactScore(pred, m.actual);
            const pH = Number(pred?.homeScore), pA = Number(pred?.awayScore);
            const aH = Number(m.actual.homeScore), aA = Number(m.actual.awayScore);
            const pOut = pH > pA ? 'home' : pH < pA ? 'away' : 'draw';
            const aOut = aH > aA ? 'home' : aH < aA ? 'away' : 'draw';
            const outcome = pOut === aOut;
            let badgeCls = 'dash-points-match-badge--wrong';
            let badgeText = 'Wrong';
            if (exact) { badgeCls = 'dash-points-match-badge--exact'; badgeText = 'Exact'; }
            else if (outcome) { badgeCls = 'dash-points-match-badge--outcome'; badgeText = 'Outcome'; }

            return (
              <div key={m.matchKey} className="dash-points-match-row">
                <div className="dash-points-match-teams">
                  <FlagImg team={m.homeTeam} size={14} />
                  <span className="dash-points-match-name">{shortTeam(m.homeTeam)}</span>
                  <span className="dash-points-match-score">{m.actual.homeScore} - {m.actual.awayScore}</span>
                  <span className="dash-points-match-name">{shortTeam(m.awayTeam)}</span>
                  <FlagImg team={m.awayTeam} size={14} />
                </div>
                <div className="dash-points-match-pred">
                  Pred: {pred ? `${pred.homeScore}-${pred.awayScore}` : '-'}
                </div>
                <span className={`dash-points-match-badge ${badgeCls}`}>{badgeText}</span>
                <span className="dash-points-match-pts">{pts > 0 ? `+${pts}` : '0'}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
