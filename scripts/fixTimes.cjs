const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'utils', 'worldCupData.js');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/matchDate: '(\d{4}-\d{2}-\d{2})T(2[4-9]):00:00Z'/g, (m, date, h) => {
  const d = new Date(date + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + 1);
  const newH = parseInt(h) - 24;
  return "matchDate: '" + d.toISOString().split('T')[0] + 'T' + String(newH).padStart(2, '0') + ':00:00Z\'';
});

const venueOffset = {
  'Mexico City': -5, 'Guadalajara': -5, 'Guadalupe': -5, 'Monterrey': -5,
  'Vancouver': -7, 'Toronto': -4, 'Seattle': -7, 'Santa Clara': -7,
  'Los Angeles': -7, 'Dallas': -5, 'Houston': -5, 'Kansas City': -5,
  'Atlanta': -4, 'Miami': -4, 'Foxborough': -4, 'East Rutherford': -4,
  'Philadelphia': -4,
};
function venueToOffset(venue) {
  for (const [k, v] of Object.entries(venueOffset)) {
    if (venue.includes(k)) return v;
  }
  return -5;
}

const groupPat = /({ matchKey: '([^']+)',\s*matchNumber: (\d+),\s*stage: 'group',[^}]*matchDate: '(\d{4}-\d{2}-\d{2})T00:00:00Z',[^}]*venue: '([^']+)')(,\s*knockoutPlaceholder)/g;
content = content.replace(groupPat, (m, prefix, key, num, date, venue, suffix) => {
  const offset = venueToOffset(venue);
  const localSlot = '16:00';
  const [h, min] = localSlot.split(':').map(Number);
  let utcH = h - offset;
  let newDay = date;
  if (utcH < 0) {
    const d = new Date(date + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() - 1);
    newDay = d.toISOString().split('T')[0];
    utcH += 24;
  }
  if (utcH >= 24) {
    const d = new Date(date + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() + 1);
    newDay = d.toISOString().split('T')[0];
    utcH -= 24;
  }
  const newDate = newDay + 'T' + String(utcH).padStart(2, '0') + ':' + String(min).padStart(2, '0') + ':00Z';
  return prefix.replace("matchDate: '" + date + "T00:00:00Z'", "matchDate: '" + newDate + "'") + suffix;
});

fs.writeFileSync(filePath, content);
console.log('Done');
