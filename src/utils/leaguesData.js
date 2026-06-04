export const MASTER_LEAGUE_ID = '_master_';
export const MASTER_LEAGUE_NAME = 'World Cup 2026';

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateJoinCode() {
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

const PROFANITY_LIST = [
  'ass', 'asshole', 'bastard', 'bitch', 'crap', 'cunt', 'damn', 'dick',
  'fag', 'faggot', 'fuck', 'fucking', 'hoe', 'jackass', 'motherfucker',
  'nazi', 'nigga', 'nigger', 'piss', 'prick', 'prostitute', 'pussy',
  'rape', 'retard', 'shit', 'slut', 'twat', 'whore', 'wanker',
];

export function checkDisplayName(name) {
  if (!name || name.trim().length < 2) {
    return { valid: false, error: 'Display name must be at least 2 characters' };
  }
  if (name.trim().length > 20) {
    return { valid: false, error: 'Display name must be 20 characters or fewer' };
  }
  if (!/^[a-zA-Z0-9\s\-_'.\u00C0-\u024F]+$/.test(name.trim())) {
    return { valid: false, error: 'Only letters, numbers, spaces, hyphens, apostrophes, and underscores allowed' };
  }
  const lower = name.trim().toLowerCase();
  for (const word of PROFANITY_LIST) {
    if (lower.includes(word)) {
      return { valid: false, error: 'Please choose a different display name' };
    }
  }
  return { valid: true, error: null };
}
