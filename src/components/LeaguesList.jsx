import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDocs, onSnapshot, query, setDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove, where, serverTimestamp } from 'firebase/firestore';
import { MASTER_LEAGUE_ID, MASTER_LEAGUE_NAME, generateJoinCode } from '../utils/leaguesData.js';
import { WORLD_CUP_2026_MATCHES } from '../utils/worldCupData.js';
import StakesAcknowledgmentModal from './StakesAcknowledgmentModal.jsx';

export default function LeaguesList({ user, firestore }) {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [userDoc, setUserDoc] = useState(null);
  const [matchDocs, setMatchDocs] = useState([]);

  const [leagueType, setLeagueType] = useState(null);
  const [newLeagueName, setNewLeagueName] = useState('');
  const [leagueDescription, setLeagueDescription] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [hostFeePercent, setHostFeePercent] = useState('');
  const [hostFeeEmail, setHostFeeEmail] = useState('jaynorton17@gmail.com');
  const [shareable, setShareable] = useState(false);
  const [joinDeadline, setJoinDeadline] = useState('');
  const [prizeSplits, setPrizeSplits] = useState([
    { position: 1, label: '1st', percent: 70 },
    { position: 2, label: '2nd', percent: 20 },
    { position: 3, label: '3rd', percent: 10 },
  ]);

  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [createSuccess, setCreateSuccess] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState('');
  const [joinSuccess, setJoinSuccess] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [lastCreatedLeague, setLastCreatedLeague] = useState(null);
  const [pendingAckLeague, setPendingAckLeague] = useState(null);
  const [editingLeagueId, setEditingLeagueId] = useState(null);
  const [editingLeagueName, setEditingLeagueName] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deletingLeague, setDeletingLeague] = useState(false);

  useEffect(() => {
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore, 'leagues'), (snap) => {
      setLeagues(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [firestore]);

  useEffect(() => {
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore, 'users'), (snap) => {
      const map = {};
      snap.docs.forEach((d) => { map[d.id] = d.data(); });
      setUsersMap(map);
    });
    return unsub;
  }, [firestore]);

  useEffect(() => {
    if (!firestore || !user) return;
    const unsub = onSnapshot(doc(firestore, 'users', user.uid), (snap) => {
      setUserDoc(snap.data() || null);
    });
    return unsub;
  }, [firestore, user]);

  useEffect(() => {
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore, 'worldCupPredictions'), (snap) => {
      setMatchDocs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [firestore]);

  const userPoints = useMemo(() => {
    const pts = {};
    Object.keys(usersMap).forEach((uid) => { pts[uid] = 0; });
    matchDocs.forEach((m) => {
      Object.entries(m.points || {}).forEach(([uid, p]) => {
        if (pts[uid] !== undefined) pts[uid] += Number(p || 0);
      });
    });
    return pts;
  }, [matchDocs, usersMap]);

  const userLeagueIds = userDoc?.leagueIds || [];

  const myLeagues = useMemo(() => {
    return leagues.filter((l) => userLeagueIds.includes(l.id));
  }, [leagues, userLeagueIds]);

  const funLeagues = useMemo(() => myLeagues.filter((l) => l.type !== 'paid'), [myLeagues]);
  const paidLeagues = useMemo(() => myLeagues.filter((l) => l.type === 'paid'), [myLeagues]);

  const getMembers = (leagueId) => {
    return Object.entries(usersMap).filter(([, d]) => (d.leagueIds || []).includes(leagueId));
  };

  const getDisplayName = (uid) => usersMap[uid]?.displayName || usersMap[uid]?.email || (uid === user?.uid && user?.displayName) || uid.slice(0, 6);

  const handleCreateFun = async () => {
    setCreateError('');
    setCreateSuccess('');
    const name = newLeagueName.trim();
    if (!name || name.length < 2) { setCreateError('League name must be at least 2 characters'); return; }
    if (name.length > 30) { setCreateError('League name must be 30 characters or fewer'); return; }
    setCreating(true);
    try {
      let code = generateJoinCode();
      let attempts = 0;
      while (attempts < 10) {
        const check = await getDocs(query(collection(firestore, 'leagues'), where('joinCode', '==', code)));
        if (check.empty) break;
        code = generateJoinCode();
        attempts++;
      }
      const ref = doc(collection(firestore, 'leagues'));
      await setDoc(ref, {
        name,
        description: leagueDescription.trim() || '',
        admins: [user.uid],
        createdBy: user.uid,
        joinCode: code,
        type: 'fun',
        shareable: shareable,
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(firestore, 'users', user.uid), {
        leagueIds: arrayUnion(ref.id),
      });
      setLastCreatedLeague({ code, leagueId: ref.id });
      setCreateSuccess('"' + name + '" created! Code: ' + code);
      setNewLeagueName('');
      setLeagueDescription('');
      setLeagueType(null);
      setShareable(false);
    } catch {
      setCreateError('Failed to create league. Try again.');
    } finally {
      setCreating(false);
    }
  };

  const handleCreatePaid = async () => {
    setCreateError('');
    setCreateSuccess('');
    const name = newLeagueName.trim();
    if (!name || name.length < 2) { setCreateError('League name must be at least 2 characters'); return; }
    if (name.length > 30) { setCreateError('League name must be 30 characters or fewer'); return; }
    const stake = parseFloat(stakeAmount);
    if (!stake || stake <= 0) { setCreateError('Enter a valid entry fee'); return; }
    const enabledSplits = prizeSplits.filter((p) => p.percent > 0);
    if (enabledSplits.length === 0) { setCreateError('Set at least one prize split'); return; }
    const totalPct = enabledSplits.reduce((s, p) => s + (parseFloat(p.percent) || 0), 0);
    if (Math.abs(totalPct - 100) > 0.01) { setCreateError('Prize splits must total 100%'); return; }
    setCreating(true);
    try {
      let code = generateJoinCode();
      let attempts = 0;
      while (attempts < 10) {
        const check = await getDocs(query(collection(firestore, 'leagues'), where('joinCode', '==', code)));
        if (check.empty) break;
        code = generateJoinCode();
        attempts++;
      }
      const ref = doc(collection(firestore, 'leagues'));
      const hostPct = parseFloat(hostFeePercent) || 0;
      const deadlineVal = joinDeadline ? new Date(joinDeadline).toISOString() : '';
      await setDoc(ref, {
        name,
        description: leagueDescription.trim() || '',
        admins: [user.uid],
        createdBy: user.uid,
        joinCode: code,
        type: 'paid',
        stake: stake,
        hostFeePercent: hostPct,
        hostFeeEmail: hostFeeEmail.trim() || '',
        shareable: shareable,
        joinDeadline: deadlineVal,
        prizeSplits: enabledSplits.map((p) => ({
          position: p.position,
          label: p.label,
          percent: parseFloat(p.percent),
        })),
        payments: {},
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(firestore, 'users', user.uid), {
        leagueIds: arrayUnion(ref.id),
      });
      setLastCreatedLeague({ code, leagueId: ref.id });
      setCreateSuccess('"' + name + '" created! Code: ' + code);
      setPendingAckLeague({
        id: ref.id,
        name,
        stake,
        hostFeePercent: hostPct,
        hostFeeEmail: hostFeeEmail.trim() || '',
        prizeSplits: enabledSplits.map((p) => ({
          position: p.position,
          label: p.label,
          percent: parseFloat(p.percent),
        })),
      });
      setNewLeagueName('');
      setLeagueDescription('');
      setStakeAmount('');
      setHostFeePercent('');
      setShareable(false);
      setJoinDeadline('');
      setPrizeSplits([
        { position: 1, label: '1st', percent: 70 },
        { position: 2, label: '2nd', percent: 20 },
        { position: 3, label: '3rd', percent: 10 },
      ]);
      setLeagueType(null);
    } catch {
      setCreateError('Failed to create league. Try again.');
    } finally {
      setCreating(false);
    }
  };

  const updatePrizeSplit = (index, value) => {
    const updated = [...prizeSplits];
    updated[index] = { ...updated[index], percent: value };
    setPrizeSplits(updated);
  };

  const addPrizeSplit = () => {
    const pos = prizeSplits.length + 1;
    setPrizeSplits([...prizeSplits, { position: pos, label: pos + 'th', percent: '' }]);
  };

  const removePrizeSplit = (index) => {
    setPrizeSplits(prizeSplits.filter((_, i) => i !== index));
  };

  const resetCreate = () => {
    setLeagueType(null);
    setNewLeagueName('');
    setLeagueDescription('');
    setStakeAmount('');
    setHostFeePercent('');
    setShareable(false);
    setJoinDeadline('');
    setPrizeSplits([
      { position: 1, label: '1st', percent: 70 },
      { position: 2, label: '2nd', percent: 20 },
      { position: 3, label: '3rd', percent: 10 },
    ]);
    setCreateError('');
    setCreateSuccess('');
    setLastCreatedLeague(null);
  };

  const handleJoin = async () => {
    setJoinError('');
    setJoinSuccess('');
    const code = joinCode.trim().toUpperCase();
    if (!code || code.length < 4) { setJoinError('Enter a valid join code'); return; }
    setJoining(true);
    try {
      const q = query(collection(firestore, 'leagues'), where('joinCode', '==', code));
      const snap = await getDocs(q);
      if (snap.empty) { setJoinError('No league found with that code'); setJoining(false); return; }
      const leagueId = snap.docs[0].id;
      const leagueData = snap.docs[0].data();
      const leagueName = leagueData.name;
      if (userLeagueIds.includes(leagueId)) { setJoinError('You are already in this league'); setJoining(false); return; }
      if (leagueData.joinDeadline && new Date(leagueData.joinDeadline).getTime() < Date.now()) {
        setJoinError('This league\'s entry period has closed'); setJoining(false); return;
      }
      await updateDoc(doc(firestore, 'users', user.uid), {
        leagueIds: arrayUnion(leagueId),
      });
      setJoinSuccess(`Joined "${leagueName}"!`);
      setJoinCode('');
      if (leagueData.type === 'paid' && !userDoc?.stakesAcknowledged?.[leagueId]) {
        setPendingAckLeague({
          id: leagueId,
          name: leagueData.name,
          stake: leagueData.stake,
          hostFeePercent: leagueData.hostFeePercent || 0,
          prizeSplits: leagueData.prizeSplits || [],
        });
      }
    } catch {
      setJoinError('Failed to join. Try again.');
    } finally {
      setJoining(false);
    }
  };

  const handleCopyLink = (code, leagueId) => {
    const link = `${window.location.origin}/?join=${code}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(leagueId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <section className="panel league-panel">
      <h2 className="league-title">{'\uD83C\uDFCA'} Leagues</h2>

      {myLeagues.length === 0 && (
        <div className="league-section">
          <h3 className="league-section-title">{'\uD83D\uDCCB'} My Leagues</h3>
          <p className="league-empty">You haven't joined any leagues yet.</p>
        </div>
      )}

      {funLeagues.length > 0 && (
        <div className="league-section league-section--free">
          <h3 className="league-section-title">{'\uD83C\uDFB2'} Free Leagues</h3>
          <div className="league-cards">
            {funLeagues.map((l) => {
              const members = getMembers(l.id);
              const isMaster = l.id === MASTER_LEAGUE_ID;
              const isAdmin = (l.admins || []).includes(user.uid) || l.ownerId === user.uid;
              const myEntry = members.find(([uid]) => uid === user.uid);
              const myRank = myEntry
                ? [...members].map(([uid]) => ({ uid, points: userPoints[uid] || 0 })).sort((a, b) => b.points - a.points).findIndex((m) => m.uid === user.uid) + 1
                : '-';
              return (
                <div key={l.id} className={'league-card league-card--free' + (l.id !== MASTER_LEAGUE_ID ? ' league-card--clickable' : '')} onClick={() => { if (l.id !== MASTER_LEAGUE_ID) navigate('/leagues/' + l.id); }}>
                  <div className="league-card-header">
                    <span className="league-card-name">{isMaster ? MASTER_LEAGUE_NAME : l.name}</span>
                    <div className="league-card-badges">
                      {isMaster && <span className="league-card-badge">{'\uD83C\uDFC6'} Official</span>}
                      {isAdmin && <span className="league-card-badge league-card-badge--admin">{'\uD83D\uDC51'} Admin</span>}
                      {isAdmin && !isMaster && (
                        <div className="league-card-admin-actions" onClick={(e) => e.stopPropagation()}>
                          <button type="button" className="league-card-admin-btn" onClick={() => { setEditingLeagueId(l.id); setEditingLeagueName(l.name); }} title="Edit name">{'\u270F\uFE0F'}</button>
                          <button type="button" className="league-card-admin-btn league-card-admin-btn--delete" onClick={() => setDeleteConfirmId(l.id)} title="Delete league">{'\uD83D\uDDD1\uFE0F'}</button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="league-card-meta">
                    <span className="league-card-meta-members">{'\uD83D\uDC65'} {members.length} member{members.length === 1 ? '' : 's'}</span>
                    {myEntry ? <span className="league-card-meta-rank">{'\uD83C\uDFC6'} #{myRank} &middot; {userPoints[user.uid] || 0} pts</span> : <span className="league-card-meta-rank">{'\u274C'} Not ranked</span>}
                  </div>

                  {l.description && (
                    <div className="league-card-desc">{l.description}</div>
                  )}

                  {!isMaster && l.joinCode && (isAdmin || l.shareable) && (
                    <div className="league-card-share" onClick={(e) => e.stopPropagation()}>
                      <a
                        className="league-share-btn league-share-btn--whatsapp"
                        href={'https://wa.me/?text=' + encodeURIComponent('Join my World Cup 2026 predictor league! Use code: ' + l.joinCode + ' or open: ' + window.location.origin + '/?join=' + l.joinCode)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {'\uD83D\uDCAC'} WhatsApp
                      </a>
                      <button
                        type="button"
                        className="league-share-btn league-share-btn--link"
                        onClick={(e) => { e.stopPropagation(); handleCopyLink(l.joinCode, l.id); }}
                      >
                        {copiedId === l.id ? '\u2713 Copied!' : '\uD83D\uDD17 Copy Link'}
                      </button>
                    </div>
                  )}

                  {deleteConfirmId === l.id && (
                    <div className="league-card-delete-confirm" onClick={(e) => e.stopPropagation()}>
                      <p className="league-card-delete-text">Delete "{l.name}"?</p>
                      <div className="league-card-delete-actions">
                        <button type="button" className="league-btn league-btn--delete-confirm" disabled={deletingLeague} onClick={async () => {
                          setDeletingLeague(true);
                          try {
                            const memberUids = members.map(([uid]) => uid);
                            await Promise.all(memberUids.map((uid) => updateDoc(doc(firestore, 'users', uid), { leagueIds: arrayRemove(l.id) })));
                            await deleteDoc(doc(firestore, 'leagues', l.id));
                          } catch {}
                          setDeletingLeague(false);
                          setDeleteConfirmId(null);
                        }}>
                          {deletingLeague ? '...' : 'Delete'}
                        </button>
                        <button type="button" className="league-btn league-btn--cancel" onClick={() => setDeleteConfirmId(null)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {paidLeagues.length > 0 && (
        <div className="league-section league-section--paid">
          <h3 className="league-section-title">{'\uD83D\uDCB0'} Paid Leagues</h3>
          <div className="league-cards">
            {paidLeagues.map((l) => {
              const members = getMembers(l.id);
              const isAdmin = (l.admins || []).includes(user.uid) || l.ownerId === user.uid;
              const myEntry = members.find(([uid]) => uid === user.uid);
              const myRank = myEntry
                ? [...members].map(([uid]) => ({ uid, points: userPoints[uid] || 0 })).sort((a, b) => b.points - a.points).findIndex((m) => m.uid === user.uid) + 1
                : '-';
              const pot = ((l.stake || 0) * members.length * (1 - (l.hostFeePercent || 0) / 100));
              return (
                <div key={l.id} className={'league-card league-card--paid' + ' league-card--clickable'} onClick={() => navigate('/leagues/' + l.id)}>
                  <div className="league-card-header">
                    <span className="league-card-name">{l.name}</span>
                    <div className="league-card-badges">
                      <span className="league-card-badge league-card-badge--paid">{'\uD83D\uDCB0'} Paid</span>
                      {isAdmin && <span className="league-card-badge league-card-badge--admin">{'\uD83D\uDC51'} Admin</span>}
                      {isAdmin && (
                        <div className="league-card-admin-actions" onClick={(e) => e.stopPropagation()}>
                          <button type="button" className="league-card-admin-btn" onClick={() => { setEditingLeagueId(l.id); setEditingLeagueName(l.name); }} title="Edit name">{'\u270F\uFE0F'}</button>
                          <button type="button" className="league-card-admin-btn league-card-admin-btn--delete" onClick={() => setDeleteConfirmId(l.id)} title="Delete league">{'\uD83D\uDDD1\uFE0F'}</button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="league-card-stake-info">
                    <span className="league-card-stake-fee">{'\u00A3'}{Number(l.stake || 0).toFixed(2)} entry</span>
                    <span className="league-card-stake-pot">{'\u00A3'}{pot.toFixed(2)} pot</span>
                    {l.joinDeadline && (
                      <DeadlineBadge deadline={l.joinDeadline} />
                    )}
                  </div>

                  <div className="league-card-meta">
                    <span className="league-card-meta-members">{'\uD83D\uDC65'} {members.length} member{members.length === 1 ? '' : 's'}</span>
                    {myEntry ? <span className="league-card-meta-rank">{'\uD83C\uDFC6'} #{myRank} &middot; {userPoints[user.uid] || 0} pts</span> : <span className="league-card-meta-rank">{'\u274C'} Not ranked</span>}
                  </div>

                  {l.description && (
                    <div className="league-card-desc">{l.description}</div>
                  )}

                  {l.joinCode && (isAdmin || l.shareable) && (
                    <div className="league-card-share" onClick={(e) => e.stopPropagation()}>
                      <a
                        className="league-share-btn league-share-btn--whatsapp"
                        href={'https://wa.me/?text=' + encodeURIComponent('Join my World Cup 2026 predictor league! Use code: ' + l.joinCode + ' or open: ' + window.location.origin + '/?join=' + l.joinCode)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {'\uD83D\uDCAC'} WhatsApp
                      </a>
                      <button
                        type="button"
                        className="league-share-btn league-share-btn--link"
                        onClick={(e) => { e.stopPropagation(); handleCopyLink(l.joinCode, l.id); }}
                      >
                        {copiedId === l.id ? '\u2713 Copied!' : '\uD83D\uDD17 Copy Link'}
                      </button>
                    </div>
                  )}

                  {deleteConfirmId === l.id && (
                    <div className="league-card-delete-confirm" onClick={(e) => e.stopPropagation()}>
                      <p className="league-card-delete-text">Delete "{l.name}"?</p>
                      <div className="league-card-delete-actions">
                        <button type="button" className="league-btn league-btn--delete-confirm" disabled={deletingLeague} onClick={async () => {
                          setDeletingLeague(true);
                          try {
                            const memberUids = members.map(([uid]) => uid);
                            await Promise.all(memberUids.map((uid) => updateDoc(doc(firestore, 'users', uid), { leagueIds: arrayRemove(l.id) })));
                            await deleteDoc(doc(firestore, 'leagues', l.id));
                          } catch {}
                          setDeletingLeague(false);
                          setDeleteConfirmId(null);
                        }}>
                          {deletingLeague ? '...' : 'Delete'}
                        </button>
                        <button type="button" className="league-btn league-btn--cancel" onClick={() => setDeleteConfirmId(null)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="league-section">
        <h3 className="league-section-title">{'\u2795'} Create a League</h3>

        {leagueType === null ? (
          <div className="league-create-options">
            <button type="button" className="league-btn--fun" onClick={() => { resetCreate(); setLeagueType('fun'); }}>
              {'\uD83C\uDFB2'} Just for Fun
            </button>
            <button type="button" className="league-btn--stakes" onClick={() => { resetCreate(); setLeagueType('paid'); }}>
              {'\uD83D\uDCB0'} League with Stakes
            </button>
          </div>
        ) : (
          <div className="league-create-form">
            <div className="league-form-row">
              <input
                className="league-input"
                type="text"
                value={newLeagueName}
                onChange={(e) => setNewLeagueName(e.target.value)}
                placeholder="League name"
                maxLength={30}
                onKeyDown={(e) => { if (e.key === 'Enter' && leagueType === 'fun') handleCreateFun(); }}
              />
            </div>

            <div className="league-form-row">
              <textarea
                className="league-input league-input--textarea"
                value={leagueDescription}
                onChange={(e) => setLeagueDescription(e.target.value)}
                placeholder="League description / rules (optional)"
                rows={3}
              />
            </div>

            {leagueType === 'paid' && (
              <div className="league-stake-section">
                <div className="league-form-row">
                  <input
                    className="league-input league-input--stake"
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="Entry fee per person (£)"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="league-form-row">
                  <input
                    className="league-input league-input--stake"
                    type="number"
                    value={hostFeePercent}
                    onChange={(e) => setHostFeePercent(e.target.value)}
                    placeholder="Your hosting fee (%) — 0 = no fee"
                    min="0"
                    max="100"
                    step="0.5"
                  />
                </div>

                <div className="league-form-row">
                  <input
                    className="league-input"
                    type="email"
                    value={hostFeeEmail}
                    onChange={(e) => setHostFeeEmail(e.target.value)}
                    placeholder="Payment email for receiving entry fees"
                  />
                </div>

                <div className="league-form-row">
                  <input
                    className="league-input"
                    type="datetime-local"
                    value={joinDeadline}
                    onChange={(e) => setJoinDeadline(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                  <span className="league-field-hint">Join deadline (optional)</span>
                </div>

                <div className="league-prizes-section">
                  <label className="league-prizes-label">Prize Splits (%)</label>
                  {prizeSplits.map((p, i) => (
                    <div key={i} className="league-prize-row">
                      <span className="league-prize-label">{p.label}</span>
                      <input
                        type="number"
                        className="league-input league-input--prize"
                        value={p.percent}
                        onChange={(e) => updatePrizeSplit(i, e.target.value)}
                        placeholder="%"
                        min="0"
                        max="100"
                        step="1"
                      />
                      <span className="league-prize-pct-sign">%</span>
                      {prizeSplits.length > 1 && (
                        <button type="button" className="league-prize-remove" onClick={() => removePrizeSplit(i)} title="Remove">
                          {'\u2715'}
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="league-btn--add-prize" onClick={addPrizeSplit}>
                    + Add position
                  </button>
                </div>

                {stakeAmount && (
                  <CalculatorPreview
                    entryFee={parseFloat(stakeAmount) || 0}
                    prizeSplits={prizeSplits}
                    memberCount={1}
                  />
                )}

                <button type="button" className="league-btn league-btn--primary" onClick={handleCreatePaid} disabled={creating || !newLeagueName.trim()}>
                  {creating ? 'Creating...' : 'Create Paid League'}
                </button>
              </div>
            )}

            <div className="league-form-row league-form-row--checkbox">
              <label className="league-checkbox-label">
                <input
                  type="checkbox"
                  checked={shareable}
                  onChange={(e) => setShareable(e.target.checked)}
                />
                <span>Allow members to share this league invite</span>
              </label>
            </div>

            {leagueType === 'fun' && (
              <button type="button" className="league-btn league-btn--primary" onClick={handleCreateFun} disabled={creating || !newLeagueName.trim()}>
                {creating ? 'Creating...' : 'Create Fun League'}
              </button>
            )}

            <button type="button" className="league-btn--cancel" onClick={resetCreate}>
              Cancel
            </button>

            {createError && <div className="league-msg league-msg--error">{createError}</div>}
            {createSuccess && (
              <div className="league-msg league-msg--success">
                <div>{createSuccess}</div>
                {lastCreatedLeague && (
                  <div className="league-share-row">
                    <a
                      className="league-share-btn league-share-btn--whatsapp"
                      href={'https://wa.me/?text=' + encodeURIComponent('Join my World Cup 2026 predictor league! Use code: ' + lastCreatedLeague.code + ' or open: ' + window.location.origin + '/?join=' + lastCreatedLeague.code)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {'\uD83D\uDCAC'} WhatsApp
                    </a>
                    <button
                      type="button"
                      className="league-share-btn league-share-btn--link"
                      onClick={() => {
                        const link = window.location.origin + '/?join=' + lastCreatedLeague.code;
                        if (navigator.share) {
                          navigator.share({ title: 'Join my World Cup 26 league', text: 'Join my predictor league! Code: ' + lastCreatedLeague.code, url: link });
                        } else {
                          navigator.clipboard.writeText(link).then(() => {
                            setCopiedId(lastCreatedLeague.leagueId);
                            setTimeout(() => setCopiedId(null), 2000);
                          });
                        }
                      }}
                    >
                      {copiedId === lastCreatedLeague.leagueId ? '\u2713 Copied!' : '\uD83D\uDD17 Share Invite Link'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="league-section">
        <h3 className="league-section-title">{'\uD83D\uDD11'} Join a League</h3>
        <div className="league-form-row">
          <input
            className="league-input league-input--code"
            type="text"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            placeholder="Enter join code"
            maxLength={6}
            onKeyDown={(e) => { if (e.key === 'Enter') handleJoin(); }}
          />
          <button type="button" className="league-btn league-btn--primary" onClick={handleJoin} disabled={joining || !joinCode.trim()}>
            {joining ? 'Joining...' : 'Join'}
          </button>
        </div>
        {joinError && <div className="league-msg league-msg--error">{joinError}</div>}
        {joinSuccess && <div className="league-msg league-msg--success">{joinSuccess}</div>}
      </div>

      {pendingAckLeague && (
        <StakesAcknowledgmentModal
          league={pendingAckLeague}
          memberCount={1}
          user={user}
          firestore={firestore}
          onConfirm={() => setPendingAckLeague(null)}
          onClose={() => setPendingAckLeague(null)}
        />
      )}
    </section>
  );
}

function CalculatorPreview({ entryFee, prizeSplits, memberCount }) {
  const totalEntries = entryFee * memberCount;
  const active = prizeSplits.filter((p) => p.percent > 0);
  const totalPct = active.reduce((s, p) => s + (parseFloat(p.percent) || 0), 0);

  return (
    <div className="league-calculator">
      <div className="league-calculator-title">{'\uD83D\uDCB0'} Prize Calculator</div>
      <div className="league-calculator-row">
        <span>Entry fee</span>
        <span>\u00A3{entryFee.toFixed(2)}</span>
      </div>
      <div className="league-calculator-row">
        <span>Total entries ({memberCount} \u00D7 \u00A3{entryFee.toFixed(2)})</span>
        <span>\u00A3{totalEntries.toFixed(2)}</span>
      </div>
      <div className="league-calculator-row league-calculator-row--pool">
        <span>Prize pool</span>
        <span>\u00A3{totalEntries.toFixed(2)}</span>
      </div>
      {totalPct > 0 && Math.abs(totalPct - 100) < 0.01 && active.map((p) => {
        const amount = totalEntries * (parseFloat(p.percent) / 100);
        return (
          <div key={p.position} className="league-calculator-row league-calculator-row--prize">
            <span>{p.label} ({p.percent}%)</span>
            <span>\u00A3{amount.toFixed(2)}</span>
          </div>
        );
      })}
      {totalPct > 0 && Math.abs(totalPct - 100) >= 0.01 && (
        <div className="league-calculator-note">Splits total {totalPct}% \u2014 adjust to 100%</div>
      )}
      <div className="league-calculator-note">
        * Based on {memberCount} member{memberCount === 1 ? '' : 's'} (live count updates as people join)
      </div>
    </div>
  );
}

function DeadlineBadge({ deadline }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);
  const deadlineMs = new Date(deadline).getTime();
  const diff = deadlineMs - now;
  if (diff <= 0) {
    return <span className="league-deadline league-deadline--closed">{'\uD83D\uDD12'} Join closed</span>;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  if (days > 0) {
    return <span className="league-deadline">{'\u23F3'} {days}d {hours}h left</span>;
  }
  return <span className="league-deadline league-deadline--urgent">{'\u26A0\uFE0F'} {hours}h left</span>;
}
