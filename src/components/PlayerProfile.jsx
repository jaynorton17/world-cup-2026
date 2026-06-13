import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, onSnapshot, collection, query, limit } from 'firebase/firestore';
import { WORLD_CUP_2026_MATCHES, getFlagUrl, isMatchDeadlinePassed, formatMatchKickoff, formatDateShort } from '../utils/worldCupData.js';
import { MASTER_LEAGUE_ID } from '../utils/leaguesData.js';

function FlagImg({ team, size = 20 }) {
  const url = getFlagUrl(team);
  if (!url) return <span style={{ width: size, height: size, display: 'inline-block', background: 'rgba(255,255,255,0.06)', borderRadius: 3, verticalAlign: 'middle' }} />;
  return <img src={url} alt={team} style={{ width: size, height: size * 0.75, borderRadius: 3, verticalAlign: 'middle' }} onError={(e) => { e.target.style.display = 'none' }} />;
}

function shortTeam(name) {
  if (name === 'Bosnia and Herzegovina') return 'Bosnia';
  if (name === 'South Korea') return 'S. Korea';
  if (name === 'Ivory Coast') return 'Ivory Coast';
  if (name === 'Cape Verde') return 'C. Verde';
  if (name === 'DR Congo') return 'DR Congo';
  if (name === 'Saudi Arabia') return 'Saudi Ar.';
  if (name === 'United States') return 'USA';
  return name;
}

export default function PlayerProfile({ firestore }) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [playerDoc, setPlayerDoc] = useState(null);
  const [matchDocs, setMatchDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore || !userId) return;
    const unsub = onSnapshot(doc(firestore, 'users', userId), (snap) => {
      setPlayerDoc(snap.data() || {});
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, [firestore, userId]);

  useEffect(() => {
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore, 'worldCupPredictions'), (snap) => {
      setMatchDocs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [firestore]);

  const matches = useMemo(() => {
    const map = {};
    matchDocs.forEach((d) => { map[d.matchKey] = d; });
    return WORLD_CUP_2026_MATCHES.map((m) => {
      const doc = map[m.matchKey] || {};
      return {
        ...m,
        predictions: doc.predictions || {},
        actual: doc.actual || { homeScore: null, awayScore: null },
      };
    });
  }, [matchDocs]);

  const playerName = playerDoc?.displayName || userId?.slice(0, 6) || 'Unknown';

  const podiumPicks = useMemo(() => {
    return playerDoc?.podiumPrediction || null;
  }, [playerDoc]);

  const pastMatches = useMemo(() => {
    return matches
      .filter((m) => m.actual?.homeScore != null && m.predictions?.[userId]?.homeScore != null)
      .sort((a, b) => (a.matchNumber || 0) - (b.matchNumber || 0));
  }, [matches, userId]);

  const upcomingMatches = useMemo(() => {
    return matches
      .filter((m) => !isMatchDeadlinePassed(m.matchDate) && m.predictions?.[userId]?.homeScore != null)
      .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))
      .slice(0, 10);
  }, [matches, userId]);

  const totalPredicted = useMemo(() => {
    return matches.filter((m) => m.predictions?.[userId]?.homeScore != null).length;
  }, [matches, userId]);

  if (loading) {
    return (
      <div className="auth-screen">
        <div className="panel auth-card">
          <p style={{ textAlign: 'center', color: '#8aa0c0' }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!playerDoc || Object.keys(playerDoc).length === 0) {
    return (
      <div className="auth-screen">
        <div className="panel auth-card">
          <p style={{ textAlign: 'center', color: '#8aa0c0' }}>Player not found.</p>
          <button type="button" className="league-btn league-btn--edit" style={{ marginTop: 12, width: '100%' }} onClick={() => navigate(-1)}>
            {'\u2190'} Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 16px' }}>
      <button type="button" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#64b4ff', fontSize: '0.85rem', cursor: 'pointer', marginBottom: 12, padding: 0 }}>
        {'\u2190'} Back
      </button>

      <div className="panel" style={{ padding: 20, marginBottom: 16, textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: 4 }}>{'\uD83D\uDC64'}</div>
        <h2 style={{ color: '#f0f4ff', fontSize: '1.3rem', marginBottom: 4 }}>{playerName}</h2>
        <p style={{ color: '#8aa0c0', fontSize: '0.8rem' }}>{totalPredicted} prediction{totalPredicted === 1 ? '' : 's'} made</p>
      </div>

      {podiumPicks && (
        <div className="panel" style={{ padding: 20, marginBottom: 16 }}>
          <h3 style={{ color: '#f0f4ff', fontSize: '1rem', marginBottom: 12 }}>{'\uD83C\uDFC6'} Podium Picks</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Winner', key: 'first', emoji: '\uD83E\uDD47' },
              { label: 'Runner-up', key: 'second', emoji: '\uD83E\uDD48' },
              { label: 'Third', key: 'third', emoji: '\uD83E\uDD49' },
            ].map(({ label, key, emoji }) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                <span style={{ fontSize: '1.2rem' }}>{emoji}</span>
                <span style={{ color: '#8aa0c0', fontSize: '0.8rem', minWidth: 70 }}>{label}</span>
                <span style={{ color: '#f0f4ff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {podiumPicks[key] && <FlagImg team={podiumPicks[key]} size={18} />}
                  {podiumPicks[key] || '—'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {upcomingMatches.length > 0 && (
        <div className="panel" style={{ padding: 20, marginBottom: 16 }}>
          <h3 style={{ color: '#f0f4ff', fontSize: '1rem', marginBottom: 12 }}>{'\u23F3'} Upcoming Predictions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {upcomingMatches.map((m) => {
              const pred = m.predictions?.[userId] || {};
              return (
                <div key={m.matchKey} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, fontSize: '0.82rem' }}>
                  <span style={{ color: '#8aa0c0', minWidth: 50 }}>{formatDateShort(m.matchDate)}</span>
                  <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FlagImg team={m.homeTeam} size={16} />
                    <span style={{ color: '#b0c4e0' }}>{shortTeam(m.homeTeam)}</span>
                  </span>
                  <span style={{ color: '#f0f4ff', fontWeight: 700, minWidth: 40, textAlign: 'center' }}>
                    {pred.homeScore != null ? pred.homeScore : '—'} - {pred.awayScore != null ? pred.awayScore : '—'}
                  </span>
                  <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                    <span style={{ color: '#b0c4e0' }}>{shortTeam(m.awayTeam)}</span>
                    <FlagImg team={m.awayTeam} size={16} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {pastMatches.length > 0 && (
        <div className="panel" style={{ padding: 20, marginBottom: 16 }}>
          <h3 style={{ color: '#f0f4ff', fontSize: '1rem', marginBottom: 12 }}>{'\uD83D\uDCCA'} Past Results</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {pastMatches.map((m) => {
              const pred = m.predictions?.[userId] || {};
              const actualHome = m.actual?.homeScore;
              const actualAway = m.actual?.awayScore;
              const predCorrect = pred.homeScore === actualHome && pred.awayScore === actualAway;
              const outcomeCorrect = !predCorrect && (
                (pred.homeScore > pred.awayScore && actualHome > actualAway) ||
                (pred.homeScore < pred.awayScore && actualHome < actualAway) ||
                (pred.homeScore === pred.awayScore && actualHome === actualAway)
              );
              return (
                <div key={m.matchKey} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, fontSize: '0.82rem' }}>
                  <span style={{ color: '#8aa0c0', minWidth: 50 }}>{formatDateShort(m.matchDate)}</span>
                  <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FlagImg team={m.homeTeam} size={16} />
                    <span style={{ color: '#b0c4e0' }}>{shortTeam(m.homeTeam)}</span>
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, minWidth: 60 }}>
                    <span style={{ color: '#f0f4ff', fontWeight: 700 }}>
                      {pred.homeScore != null ? pred.homeScore : '?'} - {pred.awayScore != null ? pred.awayScore : '?'}
                    </span>
                    <span style={{ color: '#5a7090', fontSize: '0.7rem' }}>
                      {actualHome != null ? `Actual: ${actualHome} - ${actualAway}` : 'TBD'}
                    </span>
                  </div>
                  <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                    <span style={{ color: '#b0c4e0' }}>{shortTeam(m.awayTeam)}</span>
                    <FlagImg team={m.awayTeam} size={16} />
                  </span>
                  <span style={{ minWidth: 24, textAlign: 'right', fontSize: '0.75rem' }}>
                    {predCorrect ? '\u2B50' : outcomeCorrect ? '\u2714\uFE0F' : '\u2718'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {pastMatches.length === 0 && upcomingMatches.length === 0 && !podiumPicks && (
        <div className="panel" style={{ padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#8aa0c0' }}>This player hasn't made any predictions yet.</p>
        </div>
      )}
    </div>
  );
}
