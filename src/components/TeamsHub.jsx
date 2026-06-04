import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEAM_NAMES, getTeamData } from '../utils/teamData.js';
import { getFlagUrl, GROUP_NAMES } from '../utils/worldCupData.js';

function FlagImg({ team, size = 24 }) {
  const url = getFlagUrl(team);
  if (!url) return <span className="thub-flag-placeholder" />;
  return <img className="thub-flag" src={url} alt={team} width={size} height={size * 0.75} loading="lazy" />;
}

export default function TeamsHub() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    if (searchQuery.trim().length < 2) return TEAM_NAMES;
    const q = searchQuery.trim().toLowerCase();
    return TEAM_NAMES.filter((name) => name.toLowerCase().includes(q));
  }, [searchQuery]);

  const grouped = useMemo(() => {
    const groups = {};
    GROUP_NAMES.forEach((g) => { groups[g] = []; });
    filtered.forEach((name) => {
      const data = getTeamData(name);
      if (data.group && groups[data.group]) groups[data.group].push(name);
    });
    Object.values(groups).forEach((arr) => arr.sort((a, b) => (getTeamData(a).fifaRank || 999) - (getTeamData(b).fifaRank || 999)));
    return groups;
  }, [filtered]);

  const rankingRange = (rank) => {
    if (rank <= 5) return 'thub-rank--elite';
    if (rank <= 15) return 'thub-rank--strong';
    if (rank <= 30) return 'thub-rank--good';
    return '';
  };

  return (
    <section className="panel thub-panel">
      <div className="thub-header">
        <h2 className="thub-title">{'\uD83C\uDFF4'} Teams</h2>
        <input
          type="text" className="thub-search" placeholder={'\uD83D\uDD0D Search team\u2026'}
          value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="thub-count">{filtered.length} teams</div>
      <div className="thub-groups">
        {GROUP_NAMES.map((g) => {
          const teams = grouped[g];
          if (!teams || teams.length === 0) return null;
          return (
            <div key={g} className="thub-group">
              <h3 className="thub-group-title">Group {g}</h3>
              <div className="thub-grid">
                {teams.map((name) => {
                  const data = getTeamData(name);
                  return (
                    <button key={name} type="button" className="thub-card" onClick={() => navigate(`/teams/${encodeURIComponent(name)}`)}>
                      <FlagImg team={name} size={36} />
                      <span className="thub-card-name">{name}</span>
                      <span className={`thub-rank ${rankingRange(data.fifaRank)}`}>
                        FIFA #{data.fifaRank}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
