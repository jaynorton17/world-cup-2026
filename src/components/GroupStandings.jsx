import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { WORLD_CUP_2026_MATCHES, GROUP_NAMES, getFlagUrl } from '../utils/worldCupData.js';

function FlagImg({ team, size = 16 }) {
  const url = getFlagUrl(team);
  if (!url) return <span className="gs-flag-placeholder" />;
  return <img className="gs-flag" src={url} alt={team} width={size} height={size * 0.75} loading="lazy" />;
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

export default function GroupStandings({ firestore }) {
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
      return { ...m, ...doc, actual: doc.actual || { homeScore: null, awayScore: null } };
    });
  }, [matchDocs]);

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

  return (
    <section className="panel gs-panel">
      <h2 className="gs-title">{'\uD83C\uDFC6'} Group Standings</h2>
      <p className="gs-subtitle">All 12 groups &mdash; real-time standings based on actual results</p>
      <div className="gs-grid">
        {GROUP_NAMES.map((g) => {
          const standings = groupStandings[g];
          return (
            <div key={g} className="gs-group-card">
              <h3 className="gs-group-title">Group {g}</h3>
              <div className="gs-standings">
                <div className="gs-standings-header">
                  <span className="gs-col-pos">#</span>
                  <span className="gs-col-team">Team</span>
                  <span className="gs-col-stat">Pld</span>
                  <span className="gs-col-stat">W</span>
                  <span className="gs-col-stat">D</span>
                  <span className="gs-col-stat">L</span>
                  <span className="gs-col-stat">GF</span>
                  <span className="gs-col-stat">GA</span>
                  <span className="gs-col-gd">GD</span>
                  <span className="gs-col-pts">Pts</span>
                </div>
                {standings.map((t, i) => (
                  <div key={t.team} className="gs-standings-row">
                    <span className="gs-col-pos">{i + 1}</span>
                    <span className="gs-col-team">
                      <FlagImg team={t.team} />
                      <span className="gs-team-name">{shortTeam(t.team)}</span>
                    </span>
                    <span className="gs-col-stat">{t.pld}</span>
                    <span className="gs-col-stat">{t.w}</span>
                    <span className="gs-col-stat">{t.d}</span>
                    <span className="gs-col-stat">{t.l}</span>
                    <span className="gs-col-stat">{t.gf}</span>
                    <span className="gs-col-stat">{t.ga}</span>
                    <span className="gs-col-gd">{t.gd > 0 ? `+${t.gd}` : t.gd}</span>
                    <span className="gs-col-pts">{t.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
