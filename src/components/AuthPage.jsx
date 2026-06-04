import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { collection, doc, getDoc, getDocs, limit, query, setDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { MASTER_LEAGUE_ID } from '../utils/leaguesData.js';

export default function AuthPage({ firebaseAuth, firestore, onAuth }) {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpDisplayName, setSignUpDisplayName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpLeagueCode, setSignUpLeagueCode] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const join = params.get('join');
    if (join) setSignUpLeagueCode(join.toUpperCase());
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (!firebaseAuth || !firestore) { setError('Firebase not configured.'); return; }
    setSubmitting(true);
    try {
      const cred = await signInWithEmailAndPassword(firebaseAuth, signInEmail, signInPassword);
      onAuth(cred.user);
    } catch (err) {
      setError(getFirebaseError(err));
      setSubmitting(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (!firebaseAuth || !firestore) { setError('Firebase not configured.'); return; }
    if (!signUpDisplayName.trim()) { setError('Display name is required'); return; }
    setSubmitting(true);
    try {
      const cred = await createUserWithEmailAndPassword(firebaseAuth, signUpEmail, signUpPassword);
      await updateProfile(cred.user, { displayName: signUpDisplayName.trim() });
      const existingUsers = await getDocs(query(collection(firestore, 'users'), limit(1)));
      const isFirstUser = existingUsers.empty;
      await setDoc(doc(firestore, 'users', cred.user.uid), {
        email: cred.user.email,
        displayName: signUpDisplayName.trim(),
        role: isFirstUser ? 'admin' : 'player',
        leagueIds: [MASTER_LEAGUE_ID],
        createdAt: serverTimestamp(),
      });
      setSuccessMsg(isFirstUser ? 'Account created! You are the admin.' : 'Account created!');
      await verifyUserDoc(firestore, cred.user.uid);
      onAuth(cred.user);
    } catch (err) {
      setError(getFirebaseError(err));
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setSuccessMsg('');
    if (!firebaseAuth || !firestore) { setError('Firebase not configured.'); return; }
    setSubmitting(true);
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(firebaseAuth, provider);
      const uid = cred.user.uid;
      const userRef = doc(firestore, 'users', uid);
      const existingUsers = await getDocs(query(collection(firestore, 'users'), limit(1)));
      const isFirstUser = existingUsers.empty;
      await setDoc(userRef, {
        email: cred.user.email,
        displayName: cred.user.displayName || 'Player',
        role: isFirstUser ? 'admin' : 'player',
        createdAt: serverTimestamp(),
      }, { merge: true });
      await updateDoc(userRef, {
        leagueIds: arrayUnion(MASTER_LEAGUE_ID),
      });
      setSuccessMsg(isFirstUser ? 'Signed in with Google! You are the admin.' : 'Signed in with Google!');
      await verifyUserDoc(firestore, uid);
      onAuth(cred.user);
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(getFirebaseError(err));
      }
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="panel auth-card">
        <h1>FWC26 Predictor</h1>
        <p>World Cup 2026 — Predict every match, compete with friends</p>

        {successMsg && <div className="auth-success">{successMsg}</div>}

        <div className="auth-split">
          <div className="auth-panel">
            <h3 className="auth-panel-title">{'\uD83D\uDD04'} Returning</h3>
            <p className="auth-panel-desc">Sign in to your account</p>
            <form className="auth-form" onSubmit={handleSignIn}>
              <div className="auth-field">
                <label>Email</label>
                <input type="email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <div className="auth-field">
                <label>Password</label>
                <input type="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} placeholder="Your password" required />
              </div>
              <button type="submit" className="auth-btn" disabled={submitting}>
                {submitting ? 'Please wait...' : 'Sign In'}
              </button>
            </form>
          </div>

          <div className="auth-panel">
            <h3 className="auth-panel-title">{'\u2728'} New users</h3>
            <p className="auth-panel-desc">Create your account</p>
            <form className="auth-form" onSubmit={handleSignUp}>
              <div className="auth-field">
                <label>Display Name</label>
                <input type="text" value={signUpDisplayName} onChange={(e) => setSignUpDisplayName(e.target.value)} placeholder="Your name" required />
              </div>
              <div className="auth-field">
                <label>Email</label>
                <input type="email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <div className="auth-field">
                <label>Password</label>
                <input type="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6} />
              </div>
              <div className="auth-field">
                <label>League Code (optional)</label>
                <input
                  className={'auth-league-code' + (signUpLeagueCode ? ' auth-league-code--filled' : '')}
                  type="text"
                  value={signUpLeagueCode}
                  onChange={(e) => setSignUpLeagueCode(e.target.value.toUpperCase())}
                  placeholder="Paste invite code"
                  maxLength={6}
                />
              </div>
              <button type="submit" className="auth-btn" disabled={submitting}>
                {submitting ? 'Please wait...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>

        <div className="auth-single-google">
          <div className="auth-divider"><span>or continue with</span></div>
          <button className="auth-btn google-btn" onClick={handleGoogle} disabled={submitting}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
            Sign in with Google
          </button>
        </div>

        {error && <div className="auth-error" style={{ margin: '0 12px 8px' }}>{error}</div>}
      </div>
    </div>
  );
}

async function verifyUserDoc(fs, uid) {
  if (!fs) return;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 500));
    const snap = await getDoc(doc(fs, 'users', uid));
    if (snap.exists()) return;
  }
}

function getFirebaseError(err) {
  const code = err?.code || '';
  if (code === 'auth/email-already-in-use') return 'This email is already registered. Sign in instead.';
  if (code === 'auth/invalid-email') return 'Invalid email address.';
  if (code === 'auth/user-not-found') return 'No account found with this email.';
  if (code === 'auth/wrong-password') return 'Incorrect password.';
  if (code === 'auth/weak-password') return 'Password must be at least 6 characters.';
  if (code === 'auth/too-many-requests') return 'Too many attempts. Please try again later.';
  if (code === 'auth/network-request-failed') return 'Network error. Check your connection.';
  return err?.message || 'An error occurred. Please try again.';
}
