const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'utils', 'worldCupData.js');
let content = fs.readFileSync(filePath, 'utf8');

const venueOffset = {
  'Estadio Banorte, Mexico City': -5,
  'Estadio Guadalajara': -5,
  'Estadio BBVA, Guadalupe': -5,
  'Estadio Monterrey': -5,
  'BC Place, Vancouver': -7,
  'BMO Field, Toronto': -4,
  'Lumen Field, Seattle': -7,
  "Levi's Stadium, Santa Clara": -7,
  'SoFi Stadium, Los Angeles': -7,
  'AT&T Stadium, Dallas': -5,
  'NRG Stadium, Houston': -5,
  'Mercedes-Benz Stadium, Atlanta': -4,
  'Hard Rock Stadium, Miami': -4,
  'Gillette Stadium, Foxborough': -4,
  'MetLife Stadium, East Rutherford': -4,
  'Lincoln Financial Field, Philadelphia': -4,
  'GEHA Field at Arrowhead Stadium, Kansas City': -5,
  'Atlanta Stadium': -4,
};

const slots = ['13:00', '16:00', '19:00', '22:00'];

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split('T')[0];
}

const dayMatches = {};
const regex = /^\s*\{ matchKey: '([^']+)',\s*matchNumber: (\d+),\s*stage: '([^']+)',\s*groupName: '([^']*)',\s*matchday: (\d+),\s*homeTeam: '([^']+)',\s*awayTeam: '([^']+)',\s*matchDate: '([^']+)',\s*venue: '([^']+)'/gm;

let match;
let updated = 0;
let matches = [];

while ((match = regex.exec(content)) !== null) {
  const [full, matchKey, matchNumber, stage, groupName, matchday, homeTeam, awayTeam, matchDate, venue] = match;
  const day = matchDate.split('T')[0];
  if (!dayMatches[day]) dayMatches[day] = [];
  match = { full, matchKey, matchNumber: parseInt(matchNumber), stage, groupName, matchday: parseInt(matchday), homeTeam, awayTeam, matchDate, venue, day };
  dayMatches[day].push(match);
  matches.push(match);
}

matches.forEach(m => {
  const offset = venueOffset[m.venue];
  if (offset === undefined) {
    console.log('UNKNOWN VENUE:', m.venue, m.matchKey);
    return;
  }
  const idxInDay = dayMatches[m.day].indexOf(m);
  const localSlot = slots[idxInDay % slots.length];
  const [h, min] = localSlot.split(':').map(Number);
  const utcH = h - offset;
  let newDay = m.day;
  let newH = utcH;
  if (utcH < 0) {
    newDay = addDays(m.day, -1);
    newH = utcH + 24;
  }
  const newDate = newDay + 'T' + String(newH).padStart(2,'0') + ':' + String(min).padStart(2,'0') + ':00Z';
  content = content.replace("matchDate: '" + m.matchDate + "'", "matchDate: '" + newDate + "'");
  updated++;
});

fs.writeFileSync(filePath, content);
console.log('Updated ' + updated + ' match dates');
