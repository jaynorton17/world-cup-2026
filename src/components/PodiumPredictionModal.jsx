import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { firebaseAuth } from '../lib/firebase.js';
import { checkDisplayName } from '../utils/leaguesData.js';
import { TEAM_NAMES, getTeamData } from '../utils/teamData.js';
import { PODIUM_LOCK_DATE, GROUP_STAGE_END_DATE, PODIUM_POINTS, PODIUM_TRIPLE_MULTIPLIER, getFlagUrl } from '../utils/worldCupData.js';

function FlagImg({ team, size = 18 }) {
  const url = getFlagUrl(team);
  if (!url) return <span className="podium-flag-placeholder" />;
  return <img className="podium-flag" src={url} alt={team} width={size} height={size * 0.75} loading="lazy" />;
}

function TeamDropdown({ value, onChange, teams, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handle = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  return (
    <div className="podium-dropdown" ref={ref}>
      <button type="button" className="podium-dropdown-trigger" onClick={() => setOpen(!open)}>
        {value ? <FlagImg team={value} size={18} /> : <span className="podium-dropdown-placeholder-flag" />}
        <span className="podium-dropdown-label">{value || placeholder}</span>
        <span className="podium-dropdown-arrow">{open ? '\u25B2' : '\u25BC'}</span>
      </button>
      {open && (
        <div className="podium-dropdown-menu">
          {teams.map((t) => (
            <div key={t} className={`podium-dropdown-option${t === value ? ' is-selected' : ''}`} onClick={() => { onChange(t); setOpen(false); }}>
              <FlagImg team={t} size={16} />
              <span>{t}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const PODIUM_POSITIONS = [
  { key: 'first', label: 'Winner', icon: '\uD83E\uDD47', desc: '1st Place', pts: PODIUM_POINTS.first },
  { key: 'second', label: 'Runner-up', icon: '\uD83E\uDD48', desc: '2nd Place', pts: PODIUM_POINTS.second },
  { key: 'third', label: 'Third Place', icon: '\uD83E\uDD49', desc: '3rd Place', pts: PODIUM_POINTS.third },
];

export default function PodiumPredictionModal({ user, firestore, existingPrediction, groupStageOver, onSave, onDismiss, userDoc }) {
  const firstInitial = existingPrediction?.initial?.first || existingPrediction?.first || '';
  const secondInitial = existingPrediction?.initial?.second || existingPrediction?.second || '';
  const thirdInitial = existingPrediction?.initial?.third || existingPrediction?.third || '';
  const hasFinal = existingPrediction?.final || existingPrediction?.finalizedAt;

  const currentForDisplay = hasFinal ? existingPrediction.final : { first: firstInitial, second: secondInitial, third: thirdInitial };

  const [first, setFirst] = useState(currentForDisplay?.first || '');
  const [second, setSecond] = useState(currentForDisplay?.second || '');
  const [third, setThird] = useState(currentForDisplay?.third || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const deadlineTime = useRef(new Date(PODIUM_LOCK_DATE).getTime());
  const calcTimeLeft = () => {
    const diff = deadlineTime.current - Date.now();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [nameSaving, setNameSaving] = useState(false);
  const [nameError, setNameError] = useState('');
  const [nameSaved, setNameSaved] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (editingName && nameInputRef.current) nameInputRef.current.focus();
  }, [editingName]);

  const isReEntry = groupStageOver && existingPrediction;
  const unchanged = firstInitial && first === firstInitial && second === secondInitial && third === thirdInitial;

  const usedTeams = [first, second, third].filter(Boolean);

  const availableTeams = (position) => {
    return TEAM_NAMES.filter((t) => {
      if (t === first && position !== 'first') return false;
      if (t === second && position !== 'second') return false;
      if (t === third && position !== 'third') return false;
      return true;
    });
  };

  const handleSubmit = async () => {
    setError('');
    if (!first || !second || !third) {
      setError('Please select a team for all three podium positions.');
      return;
    }
    if (first === second || first === third || second === third) {
      setError('All three selections must be different teams.');
      return;
    }
    setSaving(true);
    try {
      const ref = doc(firestore, 'users', user.uid);

      const existingPP = (userDoc || existingPrediction) || {};
      const podiumPrediction = {
        ...existingPP,
        first,
        second,
        third,
        updatedAt: serverTimestamp(),
      };

      if (isReEntry) {
        podiumPrediction.initial = existingPP.initial || { first, second, third };
        podiumPrediction.final = { first, second, third };
        podiumPrediction.finalizedAt = serverTimestamp();
      } else {
        podiumPrediction.initial = existingPP.initial || { first, second, third };
        if (!existingPP.createdAt) {
          podiumPrediction.createdAt = serverTimestamp();
        }
      }

      await setDoc(ref, { podiumPrediction }, { merge: true });
      setSaved(true);
      setTimeout(() => {
        onSave({ first, second, third });
      }, 800);
    } catch (err) {
      setError('Failed to save. Please try again.');
      console.warn('Podium save error', err);
    } finally {
      setSaving(false);
    }
  };

  const totalPts = PODIUM_POINTS.first + PODIUM_POINTS.second + PODIUM_POINTS.third;
  const tripleTotal = totalPts * PODIUM_TRIPLE_MULTIPLIER;
  const canSave = first && second && third && !saving && !saved;

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
      const { collection, getDocs, query, where } = await import('firebase/firestore');
      const q = query(collection(firestore, 'users'), where('displayName', '==', trimmed));
      const snap = await getDocs(q);
      const taken = snap.docs.some((d) => d.id !== user.uid);
      if (taken) { setNameError('That name is already taken'); setNameSaving(false); return; }
      await setDoc(doc(firestore, 'users', user.uid), { displayName: trimmed }, { merge: true });
      if (firebaseAuth?.currentUser) {
        await updateProfile(firebaseAuth.currentUser, { displayName: trimmed });
      }
      setNameSaved(true);
      setEditingName(false);
      setTimeout(() => setNameSaved(false), 2000);
    } catch {
      setNameError('Failed to save. Try again.');
    } finally {
      setNameSaving(false);
    }
  };

  const handleNameCancel = () => {
    setEditingName(false);
    setNameError('');
  };

  return createPortal(
    <div className="podium-backdrop" role="presentation" onClick={saved ? onDismiss : undefined}>
      <div className="panel podium-modal" role="dialog" aria-modal="true" aria-label="Podium prediction" onClick={(e) => e.stopPropagation()}>
        {saved ? (
          <div className="podium-saved">
            <span className="podium-saved-icon">{isReEntry ? '\u2705' : '\uD83D\uDD12'}</span>
            <h2 className="podium-saved-title">{isReEntry ? 'Final Picks Saved!' : 'Picks Locked'}</h2>
            <p className="podium-saved-text">
              {isReEntry
                ? `Your final podium predictions are locked in.${unchanged ? ' Keeping the same three \u2014 triple points eligible!' : ''}`
                : 'Your first, second, and third place picks are now locked and cannot be changed until the group stage ends.'}
            </p>
            <div className="podium-saved-picks">
              {PODIUM_POSITIONS.map((pos) => {
                const val = pos.key === 'first' ? first : pos.key === 'second' ? second : third;
                return (
                  <div key={pos.key} className="podium-saved-row">
                    <span>{pos.icon}</span>
                    <FlagImg team={val} size={22} />
                    <span>{val}</span>
                    <span className="podium-saved-pts">+{pos.pts} pts</span>
                  </div>
                );
              })}
            </div>

            <div className="podium-saved-name">
              <div className="podium-name-editor">
                {editingName ? (
                  <div className="podium-name-edit-row">
                    <input
                      ref={nameInputRef}
                      className="podium-name-input"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleNameSave(); if (e.key === 'Escape') handleNameCancel(); }}
                      maxLength={20}
                      placeholder="Your display name"
                    />
                    <button type="button" className="podium-name-btn podium-name-btn--save" onClick={handleNameSave} disabled={nameSaving || !nameInput.trim()}>
                      {nameSaving ? '...' : '\u2713'}
                    </button>
                    <button type="button" className="podium-name-btn podium-name-btn--cancel" onClick={handleNameCancel}>
                      {'\u2715'}
                    </button>
                  </div>
                ) : (
                  <div className="podium-name-display-row">
                    <span className="podium-name-label">{'\uD83D\uDC64'} {nameInput || user?.displayName || 'Player'}</span>
                    <button type="button" className="podium-name-edit-btn" onClick={handleNameEdit} title="Edit display name">{'\u270F\uFE0F'}</button>
                    {nameSaved && <span className="podium-name-saved">{'\u2713'} Saved</span>}
                  </div>
                )}
                {nameError && <div className="podium-name-error">{nameError}</div>}
              </div>
            </div>

            <button type="button" className="podium-continue-btn" onClick={onDismiss}>
              Continue
            </button>
          </div>
        ) : (
          <>
            <div className="podium-modal-header">
              <h2 className="podium-modal-title">{'\uD83C\uDFC6'} Your Podium Prediction</h2>
              <button type="button" className="podium-modal-close" onClick={onDismiss}>{'\u2715'}</button>
            </div>

            <div className="podium-info">
              {isReEntry ? (
                <p className="podium-info-text">
                  The group stage is over! Lock in your <strong>final</strong> podium picks.
                  {unchanged
                    ? ' You kept the same three teams — if they match the actual results you get <strong>triple points</strong>!'
                    : ' If you keep the same picks you had before and they\'re correct, you get <strong>triple points</strong>.'}
                </p>
              ) : (
                <p className="podium-info-text">
                  Pick who will finish <strong>1st, 2nd, and 3rd</strong>. Points: winner <strong>+{PODIUM_POINTS.first}</strong>, runner-up <strong>+{PODIUM_POINTS.second}</strong>, third <strong>+{PODIUM_POINTS.third}</strong>.
                  Keep the same picks after the group stage and get <strong>×{PODIUM_TRIPLE_MULTIPLIER}</strong> (up to {tripleTotal} pts!).
                </p>
              )}
            </div>

            <div className="podium-name-section">
              <div className="podium-name-editor">
                {editingName ? (
                  <div className="podium-name-edit-row">
                    <input
                      ref={nameInputRef}
                      className="podium-name-input"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleNameSave(); if (e.key === 'Escape') handleNameCancel(); }}
                      maxLength={20}
                      placeholder="Your display name"
                    />
                    <button type="button" className="podium-name-btn podium-name-btn--save" onClick={handleNameSave} disabled={nameSaving || !nameInput.trim()}>
                      {nameSaving ? '...' : '\u2713'}
                    </button>
                    <button type="button" className="podium-name-btn podium-name-btn--cancel" onClick={handleNameCancel}>
                      {'\u2715'}
                    </button>
                  </div>
                ) : (
                  <div className="podium-name-display-row">
                    <span className="podium-name-label">{'\uD83D\uDC64'} {nameInput || user?.displayName || 'Player'}</span>
                    <button type="button" className="podium-name-edit-btn" onClick={handleNameEdit} title="Edit display name">{'\u270F\uFE0F'}</button>
                    {nameSaved && <span className="podium-name-saved">{'\u2713'} Saved</span>}
                  </div>
                )}
                {nameError && <div className="podium-name-error">{nameError}</div>}
              </div>
            </div>

            <div className="podium-picks">
              {PODIUM_POSITIONS.map((pos) => {
                const val = pos.key === 'first' ? first : pos.key === 'second' ? second : third;
                const setter = pos.key === 'first' ? setFirst : pos.key === 'second' ? setSecond : setThird;
                return (
                  <div key={pos.key} className="podium-pick-row">
                    <div className="podium-pick-label">
                      <span className="podium-pick-icon">{pos.icon}</span>
                      <div>
                        <span className="podium-pick-title">{pos.label}</span>
                        <span className="podium-pick-desc">{pos.desc} &mdash; {pos.pts} pts</span>
                      </div>
                    </div>
                    <TeamDropdown
                      value={val}
                      onChange={setter}
                      teams={availableTeams(pos.key).sort((a, b) => a.localeCompare(b))}
                      placeholder="-- Select team --"
                    />
                  </div>
                );
              })}
            </div>

            <div className="podium-points-summary">
              <span>Max if correct: <strong>+{totalPts} pts</strong></span>
              <span className="podium-points-triple">Triple if kept: <strong>+{tripleTotal} pts</strong></span>
            </div>

            <div className="podium-deadline">
              {timeLeft ? (
                <span>{'\u23F0'} Locks Jun 10, 11:59 PM BST \u00B7 Closes in {timeLeft.days > 0 ? timeLeft.days + 'd ' : ''}{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
              ) : (
                <span>{'\uD83D\uDD12'} Podium locked</span>
              )}
            </div>

            {error && <div className="podium-error">{error}</div>}

            <div className="podium-footer">
              <button type="button" className="podium-skip-btn" onClick={onDismiss}>
                {existingPrediction ? 'Cancel' : 'Skip for now'}
              </button>
              <button type="button" className="podium-save-btn" onClick={handleSubmit} disabled={!canSave}>
                {saving ? 'Saving...' : isReEntry ? 'Lock in Final Picks' : 'Save Prediction'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
