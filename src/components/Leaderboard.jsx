import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { MASTER_LEAGUE_ID, MASTER_LEAGUE_NAME } from '../utils/leaguesData.js';
import { WORLD_CUP_2026_MATCHES, calculateMatchPoints, isExactScore, POINTS_CORRECT_OUTCOME, POINTS_WRONG } from '../utils/worldCupData.js';

const USER_COLORS = ['#5bc0ff', '#ff7eb3', '#3ddc84', '#f0c040', '#c084fc', '#fb923c', '#f97316', '#22d3ee'];

export default function Leaderboard({ user, firestore }) {
  const [matchDocs, setMatchDocs] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [leagues, setLeagues] = useState([]);
  const [selectedLeagueId, setSelectedLeagueId] = useState(MASTER_LEAGUE_ID);

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
      setLeagues(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [firestore]);

  const selectedLeagueName = useMemo(() => {
    if (selectedLeagueId === MASTER_LEAGUE_ID) return MASTER_LEAGUE_NAME;
    const league = leagues.find((l) => l.id === selectedLeagueId);
    return league?.name || 'Unknown';
  }, [selectedLeagueId, leagues]);

  const sortedUserUids = useMemo(() => {
    return Object.keys(usersMap)
      .filter((uid) => {
        const role = usersMap[uid]?.role;
        if (role === 'admin' || role === 'juniorAdmin') return false;
        if (selectedLeagueId === MASTER_LEAGUE_ID) return true;
        return (usersMap[uid]?.leagueIds || []).includes(selectedLeagueId);
      })
      .sort((a, b) => {
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

  const playerStats = useMemo(() => {
    const stats = {};
    sortedUserUids.forEach((uid) => {
      stats[uid] = { points: 0, exact: 0, outcome: 0, wrong: 0, total: 0 };
    });
    matches.forEach((m) => {
      if (m.actual?.homeScore == null) return;
      Object.entries(m.points || {}).forEach(([uid, p]) => {
        if (stats[uid]) {
          stats[uid].points += Number(p || 0);
          stats[uid].total++;
          if (isExactScore(m.predictions?.[uid], m.actual)) stats[uid].exact++;
          else if (p === POINTS_CORRECT_OUTCOME) stats[uid].outcome++;
          else stats[uid].wrong++;
        }
      });
    });
    return stats;
  }, [matches, sortedUserUids]);

  const leaderboard = useMemo(() => {
    return sortedUserUids
      .map((uid) => ({
        uid,
        name: getDisplayName(uid),
        ...playerStats[uid],
        accuracy: playerStats[uid]?.total > 0 ? Math.round(((playerStats[uid].exact + playerStats[uid].outcome) / playerStats[uid].total) * 100) : 0,
      }))
      .sort((a, b) => b.points - a.points || b.accuracy - a.accuracy);
  }, [sortedUserUids, playerStats, getDisplayName]);

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

  return (
    <section className="panel lb-panel">
      <div className="lb-header-row">
        <h2 className="lb-title">{'\uD83C\uDFC6'} Leaderboard</h2>
        <div className="lb-league-filter">
          <select
            className="lb-league-select"
            value={selectedLeagueId}
            onChange={(e) => setSelectedLeagueId(e.target.value)}
          >
            <option value={MASTER_LEAGUE_ID}>{MASTER_LEAGUE_NAME}</option>
            {leagues.filter((l) => l.id !== MASTER_LEAGUE_ID).sort((a, b) => a.name.localeCompare(b.name)).map((l) => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>
      </div>

      {pointTrend.length >= 2 && sortedUserUids.length > 0 && (
        <div className="lb-trend">
          <svg viewBox="0 0 280 50" className="lb-trend-svg" preserveAspectRatio="none">
            {sortedUserUids.map((uid) => {
              const color = getUserColor(uid);
              const maxVal = Math.max(...pointTrend.map((p) => Math.max(...Object.values(p))), 1);
              const pts = pointTrend.map((p, i) => {
                const x = (i / (pointTrend.length - 1)) * 280;
                const y = 50 - ((p[uid] || 0) / maxVal) * 44 - 3;
                return `${x},${y}`;
              }).join(' ');
              return <polyline key={uid} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" points={pts} />;
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
          <div className="lb-trend-labels">
            {sortedUserUids.map((uid) => {
              const last = pointTrend.at(-1);
              return <span key={uid} style={{ color: getUserColor(uid) }}>{getDisplayName(uid)} ({last?.[uid] || 0})</span>;
            })}
          </div>
        </div>
      )}

      <div className="lb-table">
        <div className="lb-table-header">
          <span className="lb-col-rank">#</span>
          <span className="lb-col-name">Player</span>
          <span className="lb-col-pts">Pts</span>
          <span className="lb-col-stat">Exact</span>
          <span className="lb-col-stat">Outcome</span>
          <span className="lb-col-stat">Wrong</span>
          <span className="lb-col-acc">Accuracy</span>
        </div>
        {leaderboard.map((entry, i) => (
          <div key={entry.uid} className={`lb-row ${entry.uid === user?.uid ? 'lb-row--me' : ''}`}>
            <span className="lb-col-rank">
              {i === 0 ? '\uD83E\uDD47' : i === 1 ? '\uD83E\uDD48' : i === 2 ? '\uD83E\uDD49' : `#${i + 1}`}
            </span>
            <span className="lb-col-name" style={{ color: getUserColor(entry.uid) }}>{entry.name}</span>
            <span className="lb-col-pts">{entry.points}</span>
            <span className="lb-col-stat" style={{ color: '#3ddc84' }}>{entry.exact}</span>
            <span className="lb-col-stat" style={{ color: '#18c8ff' }}>{entry.outcome}</span>
            <span className="lb-col-stat" style={{ color: '#ff6060' }}>{entry.wrong}</span>
            <span className="lb-col-acc">{entry.accuracy}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}
