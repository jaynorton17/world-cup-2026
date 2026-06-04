import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { getTeamData, getFormGuide, getHeadToHead, TEAM_NAMES } from '../utils/teamData.js';
import { getFlagUrl, WORLD_CUP_2026_MATCHES } from '../utils/worldCupData.js';

function FlagImg({ team, size = 24 }) {
  const url = getFlagUrl(team);
  if (!url) return <span className="td-flag-placeholder" />;
  return <img className="td-flag" src={url} alt={team} width={size} height={size * 0.75} loading="lazy" />;
}

export default function TeamDetail({ firestore }) {
  const { teamName } = useParams();
  const navigate = useNavigate();
  const name = decodeURIComponent(teamName);
  const data = getTeamData(name);
  const [matchDocs, setMatchDocs] = useState([]);

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
      return { ...m, ...doc, predictions: doc.predictions || {}, actual: doc.actual || { homeScore: null, awayScore: null } };
    });
  }, [matchDocs]);

  const formGuide = useMemo(() => getFormGuide(matches, name), [matches, name]);

  const [h2hOpponent, setH2hOpponent] = useState('');
  const otherTeams = useMemo(() => TEAM_NAMES.filter((t) => t !== name), [name]);

  const h2hResults = useMemo(() => {
    if (!h2hOpponent) return [];
    return getHeadToHead(matches, name, h2hOpponent);
  }, [matches, name, h2hOpponent]);

  const h2hSummary = useMemo(() => {
    let aWins = 0, bWins = 0, draws = 0;
    h2hResults.forEach((r) => {
      if (r.outcome === 'A') aWins++;
      else if (r.outcome === 'B') bWins++;
      else draws++;
    });
    return { aWins, bWins, draws };
  }, [h2hResults]);

  if (!data.group) {
    return (
      <section className="panel td-panel">
        <p className="td-error">Team not found: {name}</p>
        <button type="button" className="td-back-btn" onClick={() => navigate('/teams')}>{'\u2190'} Back to Teams</button>
      </section>
    );
  }

  return (
    <section className="panel td-panel">
      <button type="button" className="td-back-btn" onClick={() => navigate('/teams')}>{'\u2190'} All Teams</button>

      <div className="td-hero">
        <FlagImg team={name} size={64} />
        <div className="td-hero-info">
          <h2 className="td-hero-name">{name}</h2>
          <div className="td-hero-meta">
            <span className="td-badge td-badge--group">Group {data.group}</span>
            <span className="td-badge td-badge--rank">FIFA Rank: #{data.fifaRank}</span>
          </div>
        </div>
      </div>

      <div className="td-section">
        <h3 className="td-section-title">{'\uD83D\uDCC8'} Form Guide</h3>
        {formGuide.length === 0 ? (
          <p className="td-empty">No results yet for {name}</p>
        ) : (
          <div className="td-form">
            {formGuide.map((f, i) => (
              <div key={i} className="td-form-item">
                <span className={`td-form-badge td-form-badge--${f.outcome.toLowerCase()}`}>{f.outcome}</span>
                <FlagImg team={f.opponent} size={14} />
                <span className="td-form-opp">{f.opponent}</span>
                <span className="td-form-score">{f.teamScore} - {f.oppScore}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="td-section">
        <h3 className="td-section-title">{'\u2694\uFE0F'} Head-to-Head</h3>
        <div className="td-h2h-select">
          <label>Select opponent:</label>
          <select value={h2hOpponent} onChange={(e) => setH2hOpponent(e.target.value)}>
            <option value="">-- Choose a team --</option>
            {otherTeams.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        {h2hResults.length > 0 && (
          <>
            <div className="td-h2h-summary">
              <div className="td-h2h-stat"><strong>{name}</strong> <span className="td-h2h-count">{h2hSummary.aWins}</span></div>
              <div className="td-h2h-stat"><strong>Draws</strong> <span className="td-h2h-count">{h2hSummary.draws}</span></div>
              <div className="td-h2h-stat"><strong>{h2hOpponent}</strong> <span className="td-h2h-count">{h2hSummary.bWins}</span></div>
            </div>
            <div className="td-h2h-list">
              {h2hResults.map((r, i) => (
                <div key={i} className="td-h2h-row">
                  <span className="td-h2h-date">{new Date(r.matchDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span className="td-h2h-score">{r.teamAScore} - {r.teamBScore}</span>
                  <span className="td-h2h-outcome">
                    {r.outcome === 'A' ? `${name} win` : r.outcome === 'B' ? `${h2hOpponent} win` : 'Draw'}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
        {h2hResults.length === 0 && h2hOpponent && (
          <p className="td-empty">No head-to-head results between {name} and {h2hOpponent} yet.</p>
        )}
      </div>

      <div className="td-section">
        <h3 className="td-section-title">{'\uD83C\uDFC6'} Group {data.group} Standings</h3>
        <p className="td-hint">View the full group table on the Matches page.</p>
        <button type="button" className="td-action-btn" onClick={() => navigate('/matches')}>
          View Matches {'\u2192'}
        </button>
      </div>
    </section>
  );
}
