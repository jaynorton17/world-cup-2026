import { useState, useEffect, useRef } from 'react';
import { updateProfile } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { firebaseAuth } from '../lib/firebase.js';
import { checkDisplayName } from '../utils/leaguesData.js';
import { PODIUM_POINTS, PODIUM_TRIPLE_MULTIPLIER } from '../utils/worldCupData.js';

export default function MyProfile({ user, firestore, userDoc, onOpenPodium }) {
  const email = user?.email || '';
  const uid = user?.uid || '';
  const userLabel = user?.displayName || user?.email || '';

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [nameSaving, setNameSaving] = useState(false);
  const [nameError, setNameError] = useState('');
  const [nameSaved, setNameSaved] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (editingName && nameInputRef.current) nameInputRef.current.focus();
  }, [editingName]);

  const handleNameEdit = () => {
    setNameInput(user?.displayName || '');
    setNameError('');
    setNameSaved(false);
    setEditingName(true);
  };

  const handleNameSave = async () => {
    setNameError('');
    setNameSaved(false);
    const trimmed = nameInput.trim();
    const check = checkDisplayName(trimmed);
    if (!check.valid) { setNameError(check.error); return; }
    setNameSaving(true);
    try {
      const q = query(collection(firestore, 'users'), where('displayName', '==', trimmed));
      const snap = await getDocs(q);
      const taken = snap.docs.some((d) => d.id !== user.uid);
      if (taken) { setNameError('That name is already taken'); setNameSaving(false); return; }
      await setDoc(doc(firestore, 'users', user.uid), { displayName: trimmed }, { merge: true });
      try {
        if (firebaseAuth?.currentUser) {
          await updateProfile(firebaseAuth.currentUser, { displayName: trimmed });
        }
      } catch (authErr) {
        console.warn('Auth profile update failed (non-critical):', authErr);
      }
      setNameSaved(true);
      setEditingName(false);
      setTimeout(() => setNameSaved(false), 2000);
    } catch (err) {
      console.error('Display name save error:', err);
      setNameError('Failed to save. Try again.');
    } finally {
      setNameSaving(false);
    }
  };

  const handleNameCancel = () => {
    setEditingName(false);
    setNameError('');
  };

  const pp = userDoc?.podiumPrediction;
  const picks = pp ? (pp.final || pp) : null;
  const isFinalized = !!pp?.final;
  const isTripleEligible = isFinalized && pp.initial && pp.final
    && pp.initial.first === pp.final.first
    && pp.initial.second === pp.final.second
    && pp.initial.third === pp.final.third;

  return (
    <div className="wc-panel" style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2 className="wc-panel-title">{'\uD83D\uDC64'} My Profile</h2>
      <div className="profile-info">
        <div className="profile-info-row">
          <span className="profile-info-label">Display Name</span>
          <div className="profile-info-value">
            {editingName ? (
              <div className="sidebar-name-edit" style={{ justifyContent: 'flex-start' }}>
                <input
                  ref={nameInputRef}
                  className="sidebar-name-input"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleNameSave(); if (e.key === 'Escape') handleNameCancel(); }}
                  maxLength={20}
                  placeholder="Display name"
                />
                <button type="button" className="sidebar-name-btn sidebar-name-btn--save" onClick={handleNameSave} disabled={nameSaving || !nameInput.trim()}>
                  {nameSaving ? '...' : '\u2713'}
                </button>
                <button type="button" className="sidebar-name-btn sidebar-name-btn--cancel" onClick={handleNameCancel}>
                  {'\u2715'}
                </button>
                {nameError && <span className="sidebar-name-error">{nameError}</span>}
              </div>
            ) : (
              <span className="profile-name-display" onClick={handleNameEdit}>
                {userLabel}{nameSaved ? ' \u2713' : ' \u270F\uFE0F'}
              </span>
            )}
          </div>
        </div>
        <div className="profile-info-row">
          <span className="profile-info-label">Email</span>
          <span className="profile-info-value">{email}</span>
        </div>
        <div className="profile-info-row">
          <span className="profile-info-label">User ID</span>
          <span className="profile-info-value" style={{ fontSize: '0.7rem', opacity: 0.6 }}>{uid}</span>
        </div>
      </div>

      <hr className="profile-divider" />

      <h3 className="wc-panel-title" style={{ fontSize: '1rem' }}>Podium Picks</h3>
      {picks ? (
        <div className="dash-podium-mini" style={{ marginTop: 8 }}>
          {[
            { key: 'first', icon: '\uD83E\uDD47', team: picks.first, pts: PODIUM_POINTS.first },
            { key: 'second', icon: '\uD83E\uDD48', team: picks.second, pts: PODIUM_POINTS.second },
            { key: 'third', icon: '\uD83E\uDD49', team: picks.third, pts: PODIUM_POINTS.third },
          ].map((p) => (
            <div key={p.key} className="dash-podium-mini-row">
              <span className="dash-podium-mini-medal">{p.icon}</span>
              <span className="dash-podium-mini-team">{p.team}</span>
              <span className="dash-podium-mini-pts">{isTripleEligible ? p.pts * PODIUM_TRIPLE_MULTIPLIER : p.pts}</span>
            </div>
          ))}
          <button type="button" className="wc-btn wc-btn--small" style={{ marginTop: 8 }} onClick={onOpenPodium}>
            Update Picks
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <p style={{ color: '#8aa0c0', marginBottom: 12 }}>No podium picks set yet.</p>
          <button type="button" className="wc-btn" onClick={onOpenPodium}>
            Set Podium Picks
          </button>
        </div>
      )}
    </div>
  );
}