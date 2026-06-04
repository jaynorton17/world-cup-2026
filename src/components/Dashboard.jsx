import { useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { MASTER_LEAGUE_ID, MASTER_LEAGUE_NAME } from '../utils/leaguesData.js';
import { WORLD_CUP_2026_MATCHES, PODIUM_POINTS, PODIUM_TRIPLE_MULTIPLIER, isMatchDeadlinePassed, calculateMatchPoints, isExactScore, getFlagUrl, formatMatchKickoff } from '../utils/worldCupData.js';

const USER_COLORS = ['#5bc0ff', '#ff7eb3', '#3ddc84', '#f0c040', '#c084fc', '#fb923c', '#f97316', '#22d3ee'];

function FlagImg({ team, size = 20 }) {
  const url = getFlagUrl(team);
  if (!url) return <span className="dash-flag-placeholder" />;
  return <img className="dash-flag" src={url} alt={team} width={size} height={size * 0.75} loading="lazy" />;
}

function shortTeam(name) {
  if (name === 'Bosnia and Herzegovina') return 'Bosnia';
  if (name === "C\u00F4te d'Ivoire") return "C\u00F4te d'Ivoire";
  if (name === 'Korea Republic') return 'S. Korea';
  if (name === 'IR Iran') return 'Iran';
  if (name === 'Cabo Verde') return 'C. Verde';
  if (name === 'Congo DR') return 'Congo';
  if (name === 'Saudi Arabia') return 'Saudi Ar.';
  if (name === 'T\u00FCrkiye') return 'T\u00FCrkiye';
  if (name.length > 9) return name.slice(0, 8) + '\u2026';
  return name;
}

function DonutChart({ predicted, outstanding }) {
  const total = predicted + outstanding;
  const pct = total > 0 ? Math.round((predicted / total) * 100) : 0;
  const r = 40;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="dash-donut-wrap">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(61,220,132,0.12)" strokeWidth="10" />
        <circle cx="55" cy="55" r={r} fill="none" stroke="#3ddc84" strokeWidth="10"
          strokeDasharray={c} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 55 55)" style={{ transition: 'stroke-dashoffset 0.5s' }} />
        <text x="55" y="48" textAnchor="middle" fill="#f0f4ff" fontSize="26" fontWeight="800">{pct}%</text>
        <text x="55" y="66" textAnchor="middle" fill="#8aa0c0" fontSize="10">({predicted} made)</text>
      </svg>
      <div className="dash-donut-legend">
        <span><span className="dash-legend-dot" style={{ background: '#3ddc84' }} /> Predicted: {predicted}</span>
        <span><span className="dash-legend-dot" style={{ background: 'rgba(61,220,132,0.25)' }} /> Outstanding: {outstanding}</span>
      </div>
    </div>
  );
}

export default function Dashboard({ user, firestore, onOpenPodium }) {
  const navigate = useNavigate();
  const [matchDocs, setMatchDocs] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [userDoc, setUserDoc] = useState(null);
  const [leagues, setLeagues] = useState([]);
  const [selectedLeagueId, setSelectedLeagueId] = useState(MASTER_LEAGUE_ID);
  const [countdown, setCountdown] = useState('');
  const countdownRef = useRef(null);

  useEffect(() => {
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore, 'worldCupPredictions'), (snap) => {
      setMatchDocs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [firestore]);

  useEffect(() => {
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore, 'users'), (snap) => {
      const map = {};
      snap.docs.forEach((d) => { map[d.id] = d.data(); });
      setUsersMap(map);
    });
    return unsub;
  }, [firestore]);

  useEffect(() => {
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore, 'leagues'), (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setLeagues(list);
    });
    return unsub;
  }, [firestore]);

  useEffect(() => {
    if (!firestore || !user) return;
    const unsub = onSnapshot(doc(firestore, 'users', user.uid), (snap) => {
      setUserDoc(snap.data() || null);
    });
    return unsub;
  }, [firestore, user]);

  useEffect(() => {
    if (!userDoc || selectedLeagueId !== MASTER_LEAGUE_ID) return;
    const ids = userDoc?.leagueIds || [];
    if (ids.length > 0) setSelectedLeagueId(ids[0]);
  }, [userDoc, selectedLeagueId]);

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

  const getDisplayName = (uid) => usersMap[uid]?.displayName || (uid === user?.uid && user?.displayName) || uid.slice(0, 6);

  const getUserColor = (uid) => {
    const idx = sortedUserUids.indexOf(uid);
    return USER_COLORS[Math.max(0, idx) % USER_COLORS.length];
  };

  const matches = useMemo(() => {
    const map = {};
    matchDocs.forEach((d) => { map[d.matchKey] = d; });
    return WORLD_CUP_2026_MATCHES.map((m) => {
      const doc = map[m.matchKey] || {};
      return { ...m, ...doc, predictions: doc.predictions || {}, actual: doc.actual || { homeScore: null, awayScore: null }, points: doc.points || {} };
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

  const myRank = useMemo(() => {
    const idx = leaderboard.findIndex((e) => e.uid === user?.uid);
    return idx >= 0 ? idx + 1 : '-';
  }, [leaderboard, user]);

  const myPoints = userPoints[user?.uid] || 0;

  const predictedCount = useMemo(
    () => matches.filter((m) => m.stage === 'group' && m.predictions?.[user?.uid]?.homeScore != null).length,
    [matches, user],
  );

  const totalGroup = useMemo(
    () => matches.filter((m) => m.stage === 'group').length,
    [matches],
  );

  const unpredicted = matches.filter((m) =>
    m.stage === 'group' &&
    !isMatchDeadlinePassed(m.matchDate) &&
    m.actual?.homeScore == null &&
    m.predictions?.[user?.uid]?.homeScore == null
  ).length;

  const nextActualMatch = useMemo(() => {
    return matches
      .filter((m) => m.stage === 'group' && !isMatchDeadlinePassed(m.matchDate) && m.actual?.homeScore == null)
      .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))[0] || null;
  }, [matches]);

  const sameDayMatches = useMemo(() => {
    if (!nextActualMatch) return [];
    const targetDate = nextActualMatch.matchDate.split('T')[0];
    return matches.filter((m) =>
      m.stage === 'group' &&
      m.matchDate?.startsWith(targetDate) &&
      m.matchKey !== nextActualMatch.matchKey &&
      !isMatchDeadlinePassed(m.matchDate) &&
      m.actual?.homeScore == null
    ).sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));
  }, [matches, nextActualMatch]);

  useEffect(() => {
    if (!nextActualMatch?.matchDate) { setCountdown(''); return; }
    const tick = () => {
      const diff = new Date(nextActualMatch.matchDate).getTime() - Date.now();
      if (diff <= 0) { setCountdown('LIVE'); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      let parts = [];
      if (d > 0) parts.push(d + 'd');
      parts.push(String(h).padStart(2, '0') + 'h');
      parts.push(String(m).padStart(2, '0') + 'm');
      parts.push(String(s).padStart(2, '0') + 's');
      setCountdown(parts.join(' '));
    };
    tick();
    countdownRef.current = setInterval(tick, 1000);
    return () => { if (countdownRef.current) clearInterval(countdownRef.current); };
  }, [nextActualMatch]);

  const nextDayMatches = useMemo(() => {
    const future = matches
      .filter((m) => m.stage === 'group' && m.actual?.homeScore == null && !isMatchDeadlinePassed(m.matchDate))
      .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));
    if (future.length === 0) return [];
    const nextDate = future[0].matchDate.split('T')[0];
    return future.filter((m) => m.matchDate.startsWith(nextDate));
  }, [matches]);

  const recentResults = useMemo(() => {
    return matches
      .filter((m) => m.actual?.homeScore != null)
      .sort((a, b) => new Date(b.matchDate) - new Date(a.matchDate))
      .slice(0, 5);
  }, [matches]);

  const userLeagueIds = userDoc?.leagueIds || [];

  const streak = useMemo(() => {
    const groupResults = matches
      .filter((m) => m.stage === 'group' && m.actual?.homeScore != null)
      .sort((a, b) => new Date(b.matchDate) - new Date(a.matchDate));
    let count = 0;
    for (const m of groupResults) {
      const pred = m.predictions?.[user?.uid];
      if (!pred) break;
      const pts = m.points?.[user?.uid];
      if (pts > 0) { count++; } else { break; }
    }
    return count;
  }, [matches, user]);

  const miniLeaderboard = useMemo(() => {
    const idx = leaderboard.findIndex((e) => e.uid === user?.uid);
    if (idx < 0) return leaderboard.slice(0, 5);
    const start = Math.max(0, idx - 2);
    const end = Math.min(leaderboard.length, idx + 3);
    return leaderboard.slice(start, end);
  }, [leaderboard, user]);

  const todayStr = new Date().toISOString().split('T')[0];

  const todayMatches = useMemo(() => {
    return matches.filter((m) => {
      const md = m.matchDate?.split('T')[0];
      return md === todayStr;
    });
  }, [matches, todayStr]);

  const todayPts = useMemo(() => {
    return todayMatches.reduce((sum, m) => sum + Number(m.points?.[user?.uid] || 0), 0);
  }, [todayMatches, user]);

  const renderTodayBadge = (pts, isExact) => {
    if (isExact) return <span className="dash-today-badge dash-today-badge--exact">+{pts}</span>;
    if (pts > 0) return <span className="dash-today-badge dash-today-badge--outcome">+{pts}</span>;
    return <span className="dash-today-badge dash-today-badge--none">&mdash;</span>;
  };

  return (
    <section className="panel dash-panel">
      <h1 className="dash-title">{user?.displayName?.split(' ')[0] || 'Player'}'s Dashboard</h1>

      <div className="dash-metrics">
        <div className="dash-metric-card">
          <div className="dash-metric-label">Prediction Progress</div>
          <DonutChart predicted={predictedCount} outstanding={unpredicted} />
          {streak > 1 && (
            <div className="dash-streak-tile">
              <span className="dash-streak-fire">{'\uD83D\uDD25'}</span>
              <span className="dash-streak-count">{streak}</span>
              <span className="dash-streak-label">correct streak</span>
            </div>
          )}
        </div>

        <div className="dash-metric-card dash-metric-card--center">
          <div className="dash-metric-center-header">
            <span className="dash-metric-label">Next Match</span>
            <div className="dash-donut-mini-wrap" title={`${predictedCount} of ${totalGroup} predicted`}>
              <svg width="36" height="36" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(61,220,132,0.12)" strokeWidth="3" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#3ddc84" strokeWidth="3"
                  strokeDasharray={2 * Math.PI * 14} strokeDashoffset={2 * Math.PI * 14 * (1 - predictedCount / Math.max(totalGroup, 1))}
                  strokeLinecap="round" transform="rotate(-90 18 18)" style={{ transition: 'stroke-dashoffset 0.5s' }} />
                <text x="18" y="20" textAnchor="middle" fill="#f0f4ff" fontSize="9" fontWeight="800">{totalGroup > 0 ? Math.round(predictedCount / totalGroup * 100) : 0}%</text>
              </svg>
            </div>
          </div>
          {nextActualMatch ? (
            <>
              <div className="dash-metric-teams">
                <FlagImg team={nextActualMatch.homeTeam} size={32} />
                <span className="dash-metric-vs">vs</span>
                <FlagImg team={nextActualMatch.awayTeam} size={32} />
              </div>
              <div className="dash-metric-team-names">
                <span>{shortTeam(nextActualMatch.homeTeam)}</span>
                <span className="dash-metric-vs-text">vs</span>
                <span>{shortTeam(nextActualMatch.awayTeam)}</span>
              </div>
              <div className="dash-metric-date">
                {formatMatchKickoff(nextActualMatch.matchDate)}
              </div>
              <div className="dash-countdown">{countdown}</div>
              <button type="button" className="dash-next-btn" onClick={() => navigate('/matches')}>
                View Matches
              </button>
              {sameDayMatches.length > 0 && (
                <div className="dash-next-after">
                  <span className="dash-next-after-label">Also on this day:</span>
                  {sameDayMatches.map((m) => (
                    <span key={m.matchKey} className="dash-next-after-teams">
                      {shortTeam(m.homeTeam)} vs {shortTeam(m.awayTeam)}
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="dash-metric-empty">All matches complete!</div>
          )}
        </div>

        <div className="dash-metric-card">
          <div className="dash-metric-label">League Positions</div>
          <div className="dash-metric-league-select">
            <select
              className="dash-lb-select"
              value={selectedLeagueId || ''}
              onChange={(e) => setSelectedLeagueId(e.target.value)}
              style={{ width: '100%', maxWidth: '100%' }}
            >
              <option value={MASTER_LEAGUE_ID}>{MASTER_LEAGUE_NAME}</option>
              {leagues.filter((l) => l.id !== MASTER_LEAGUE_ID && userLeagueIds.includes(l.id)).sort((a, b) => a.name.localeCompare(b.name)).map((l) => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
            <span className="dash-metric-league-link" onClick={() => {
              const id = selectedLeagueId === MASTER_LEAGUE_ID ? '' : selectedLeagueId;
              navigate(id ? `/leagues/${id}` : '/leaderboard');
            }} title="View full leaderboard">{'\u2197'}</span>
          </div>
          <div className="dash-mini-lb">
            {miniLeaderboard.map((entry, i) => {
              const isMe = entry.uid === user?.uid;
              return (
                <div key={entry.uid} className={`dash-mini-lb-row${isMe ? ' dash-mini-lb-row--me' : ''}`}>
                  <span className="dash-mini-lb-pos">{leaderboard.indexOf(entry) + 1}</span>
                  <span className="dash-mini-lb-name" style={{ color: getUserColor(entry.uid) }}>{entry.name}</span>
                  <span className="dash-mini-lb-pts">{entry.points}</span>
                </div>
              );
            })}
          </div>
          <div className="dash-metric-league-title" onClick={() => {
            const id = selectedLeagueId === MASTER_LEAGUE_ID ? '' : selectedLeagueId;
            navigate(id ? `/leagues/${id}` : '/leaderboard');
          }} style={{ cursor: 'pointer' }}>
            {selectedLeagueId === MASTER_LEAGUE_ID ? MASTER_LEAGUE_NAME : (leagues.find((l) => l.id === selectedLeagueId)?.name || '')} {'\u2192'}
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

        <div className="dash-metric-card">
          <div className="dash-today-header">
            <span className="dash-metric-label">Today's Points</span>
            <span className="dash-today-total">{todayPts > 0 ? `+${todayPts}` : '\u2014'}</span>
          </div>
          <div className="dash-today-list">
            {todayMatches.length === 0 && (
              <div className="dash-today-empty">No matches today</div>
            )}
            {todayMatches.map((m) => {
              const pred = m.predictions?.[user?.uid];
              const hasActual = m.actual?.homeScore != null;
              const pts = hasActual ? Number(m.points?.[user?.uid] || 0) : null;
              const exact = hasActual && isExactScore(pred, m.actual);
              return (
                <div key={m.matchKey} className="dash-today-row" onClick={() => navigate('/matches')}>
                  <FlagImg team={m.homeTeam} size={14} />
                  <span className="dash-today-teams">
                    {shortTeam(m.homeTeam)}
                    {hasActual ? (
                      <span className="dash-today-score">{m.actual.homeScore}&ndash;{m.actual.awayScore}</span>
                    ) : (
                      <span className="dash-today-vs">vs</span>
                    )}
                    {shortTeam(m.awayTeam)}
                  </span>
                  <FlagImg team={m.awayTeam} size={14} />
                  <span className="dash-today-pts">
                    {pred ? (pts != null ? renderTodayBadge(pts, exact) : '\u2014') : '\u2014'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="dash-bottom-row">
        <div className="dash-section">
          <h3 className="dash-section-title">{'\uD83D\uDCC5'} Next Match Day</h3>
          <div className="dash-upcoming">
            {nextDayMatches.length === 0 && <p className="dash-empty">No upcoming matches</p>}
            {nextDayMatches.length > 0 && (
              <div className="dash-next-day-header">
                {new Date(nextDayMatches[0].matchDate).toLocaleDateString('en-US', {
                  weekday: 'long', month: 'long', day: 'numeric'
                })}
              </div>
            )}
            {nextDayMatches.map((m) => (
              <div key={m.matchKey} className="dash-upcoming-row" onClick={() => navigate('/matches')}>
                <FlagImg team={m.homeTeam} size={16} />
                <span className="dash-upcoming-name">{shortTeam(m.homeTeam)}</span>
                <span className="dash-upcoming-vs">vs</span>
                <FlagImg team={m.awayTeam} size={16} />
                <span className="dash-upcoming-name">{shortTeam(m.awayTeam)}</span>
                <span className="dash-upcoming-date">{new Date(m.matchDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-section">
          <h3 className="dash-section-title">{'\uD83D\uDCCA'} Recent Results</h3>
          <div className="dash-recent">
            {recentResults.length === 0 && <p className="dash-empty">No results yet. Check back after matches start!</p>}
            {recentResults.map((m) => (
              <div key={m.matchKey} className="dash-recent-row" onClick={() => navigate('/matches')}>
                <FlagImg team={m.homeTeam} size={16} />
                <span className="dash-recent-name">{shortTeam(m.homeTeam)}</span>
                <span className="dash-recent-score">{m.actual.homeScore} {'\u2013'} {m.actual.awayScore}</span>
                <FlagImg team={m.awayTeam} size={16} />
                <span className="dash-recent-name">{shortTeam(m.awayTeam)}</span>
                <span className="dash-recent-date">{new Date(m.matchDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
