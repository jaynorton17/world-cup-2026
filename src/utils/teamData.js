import { GROUP_NAMES, WORLD_CUP_2026_MATCHES, getFlagUrl } from './worldCupData.js';

export const TEAM_DATA = {
  'Mexico':        { fifaRank: 9,  group: 'A', color: '#128c5e' },
  'South Africa':  { fifaRank: 61, group: 'A', color: '#f5c842' },
  'Korea Republic':{ fifaRank: 22, group: 'A', color: '#e6002e' },
  'Czechia':       { fifaRank: 42, group: 'A', color: '#144d8c' },
  'Canada':        { fifaRank: 46, group: 'B', color: '#e00026' },
  'Bosnia and Herzegovina': { fifaRank: 74, group: 'B', color: '#fadf00' },
  'Qatar':         { fifaRank: 51, group: 'B', color: '#730e1a' },
  'Switzerland':   { fifaRank: 15, group: 'B', color: '#d52b1e' },
  'Haiti':         { fifaRank: 86, group: 'C', color: '#00209f' },
  'Scotland':      { fifaRank: 39, group: 'C', color: '#003876' },
  'Brazil':        { fifaRank: 5,  group: 'C', color: '#f7c82e' },
  'Morocco':       { fifaRank: 14, group: 'C', color: '#c1272d' },
  'USA':           { fifaRank: 16, group: 'D', color: '#3c3b6e' },
  'Paraguay':      { fifaRank: 52, group: 'D', color: '#d62b2e' },
  'Australia':     { fifaRank: 24, group: 'D', color: '#ffcb05' },
  'Türkiye':       { fifaRank: 28, group: 'D', color: '#e30a17' },
  "Côte d'Ivoire": { fifaRank: 40, group: 'E', color: '#f77f00' },
  'Ecuador':       { fifaRank: 27, group: 'E', color: '#fcd116' },
  'Germany':       { fifaRank: 10, group: 'E', color: '#000000' },
  'Curaçao':       { fifaRank: 88, group: 'E', color: '#003ca6' },
  'Netherlands':   { fifaRank: 7,  group: 'F', color: '#ff6600' },
  'Japan':         { fifaRank: 18, group: 'F', color: '#bc002d' },
  'Sweden':        { fifaRank: 26, group: 'F', color: '#fecd00' },
  'Tunisia':       { fifaRank: 32, group: 'F', color: '#e70013' },
  'IR Iran':       { fifaRank: 20, group: 'G', color: '#239f40' },
  'New Zealand':   { fifaRank: 104,group: 'G', color: '#000000' },
  'Belgium':       { fifaRank: 6,  group: 'G', color: '#e11b22' },
  'Egypt':         { fifaRank: 34, group: 'G', color: '#c8102e' },
  'Saudi Arabia':  { fifaRank: 53, group: 'H', color: '#006c35' },
  'Uruguay':       { fifaRank: 11, group: 'H', color: '#003da5' },
  'Spain':         { fifaRank: 3,  group: 'H', color: '#c60b1e' },
  'Cabo Verde':    { fifaRank: 70, group: 'H', color: '#003893' },
  'France':        { fifaRank: 2,  group: 'I', color: '#002395' },
  'Senegal':       { fifaRank: 19, group: 'I', color: '#00853f' },
  'Iraq':          { fifaRank: 59, group: 'I', color: '#007a3d' },
  'Norway':        { fifaRank: 45, group: 'I', color: '#d7282f' },
  'Argentina':     { fifaRank: 1,  group: 'J', color: '#74acdf' },
  'Algeria':       { fifaRank: 37, group: 'J', color: '#006233' },
  'Austria':       { fifaRank: 23, group: 'J', color: '#ed2939' },
  'Jordan':        { fifaRank: 71, group: 'J', color: '#c8102e' },
  'Portugal':      { fifaRank: 8,  group: 'K', color: '#006600' },
  'Congo DR':      { fifaRank: 60, group: 'K', color: '#007fff' },
  'Uzbekistan':    { fifaRank: 78, group: 'K', color: '#0099b5' },
  'Colombia':      { fifaRank: 13, group: 'K', color: '#fcd116' },
  'Ghana':         { fifaRank: 49, group: 'L', color: '#ce1126' },
  'Panama':        { fifaRank: 44, group: 'L', color: '#072b61' },
  'England':       { fifaRank: 4,  group: 'L', color: '#cf142b' },
  'Croatia':       { fifaRank: 12, group: 'L', color: '#ed1c24' },
};

export const TEAM_NAMES = Object.keys(TEAM_DATA);

export function getTeamData(name) {
  return TEAM_DATA[name] || { fifaRank: 999, group: null, color: '#666' };
}

export function getFormGuide(matches, teamName) {
  const results = matches
    .filter((m) => {
      if (m.actual?.homeScore == null) return false;
      return m.homeTeam === teamName || m.awayTeam === teamName;
    })
    .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))
    .slice(-5)
    .map((m) => {
      const isHome = m.homeTeam === teamName;
      const teamScore = isHome ? m.actual.homeScore : m.actual.awayScore;
      const oppScore = isHome ? m.actual.awayScore : m.actual.homeScore;
      let outcome;
      if (teamScore > oppScore) outcome = 'W';
      else if (teamScore < oppScore) outcome = 'L';
      else outcome = 'D';
      return {
        outcome,
        opponent: isHome ? m.awayTeam : m.homeTeam,
        teamScore,
        oppScore,
        matchDate: m.matchDate,
        matchKey: m.matchKey,
      };
    });
  return results;
}

export function getHeadToHead(matches, teamA, teamB) {
  const h2h = matches.filter((m) => {
    if (m.actual?.homeScore == null) return false;
    return (
      (m.homeTeam === teamA && m.awayTeam === teamB) ||
      (m.homeTeam === teamB && m.awayTeam === teamA)
    );
  }).map((m) => {
    const aIsHome = m.homeTeam === teamA;
    const aScore = aIsHome ? m.actual.homeScore : m.actual.awayScore;
    const bScore = aIsHome ? m.actual.awayScore : m.actual.homeScore;
    let outcome;
    if (aScore > bScore) outcome = 'A';
    else if (aScore < bScore) outcome = 'B';
    else outcome = 'D';
    return {
      outcome,
      teamAScore: aScore,
      teamBScore: bScore,
      matchDate: m.matchDate,
      stage: m.stage,
      matchKey: m.matchKey,
    };
  });
  return h2h;
}
