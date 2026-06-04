import { doc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { calculateMatchPoints } from './worldCupData.js';

const API_BASE = 'https://worldcup26.ir';
const APP_EMAIL = 'wc2026-predictor@app';
const APP_PASSWORD = 'autofetch-wc2026';
const TOKEN_KEY = 'wcApiToken';
const TOKEN_EXPIRY_KEY = 'wcApiTokenExpiry';

function getStoredToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (token && expiry && Date.now() < Number(expiry)) return token;
  return null;
}

function storeToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + 84 * 24 * 60 * 60 * 1000));
}

async function getToken() {
  const stored = getStoredToken();
  if (stored) return stored;

  try {
    const regRes = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'WorldCup2026 App', email: APP_EMAIL, password: APP_PASSWORD }),
    });
    if (regRes.ok) {
      const data = await regRes.json();
      storeToken(data.token);
      return data.token;
    }
  } catch {}

  try {
    const authRes = await fetch(`${API_BASE}/auth/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: APP_EMAIL, password: APP_PASSWORD }),
    });
    if (authRes.ok) {
      const data = await authRes.json();
      storeToken(data.token);
      return data.token;
    }
  } catch {}

  return null;
}

async function fetchAllMatches(token) {
  const res = await fetch(`${API_BASE}/get/games`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : data?.games || data?.data || [];
}

export async function autoFetchResults(firestore, matchDocs) {
  const token = await getToken();
  if (!token) return { fetched: 0, written: 0, errors: 1 };

  let apiMatches;
  try {
    apiMatches = await fetchAllMatches(token);
  } catch {
    return { fetched: 0, written: 0, errors: 1 };
  }

  const docMap = {};
  matchDocs.forEach((d) => { docMap[d.matchKey] = d; });

  let written = 0;
  let errors = 0;

  const batch = writeBatch(firestore);
  const pending = [];

  for (const apiMatch of apiMatches) {
    if (String(apiMatch.finished).toUpperCase() !== 'TRUE') continue;
    if (apiMatch.home_score == null || apiMatch.away_score == null) continue;

    const matchKey = `match-${apiMatch.id}`;
    const docData = docMap[matchKey];
    if (!docData) continue;
    if (docData.actual?.homeScore != null) continue;

    const homeScore = Number(apiMatch.home_score);
    const awayScore = Number(apiMatch.away_score);

    const pts = {};
    Object.entries(docData.predictions || {}).forEach(([uid, pred]) => {
      pts[uid] = calculateMatchPoints(pred, { homeScore, awayScore });
    });

    const ref = doc(firestore, 'worldCupPredictions', matchKey);
    batch.update(ref, {
      actual: { homeScore, awayScore },
      actualSetAt: serverTimestamp(),
      points: pts,
      status: 'scored',
      updatedAt: serverTimestamp(),
    });
    written++;
    pending.push(matchKey);
  }

  if (written > 0) {
    try {
      await batch.commit();
    } catch {
      errors++;
    }
  }

  return { fetched: apiMatches.length, written, errors };
}
