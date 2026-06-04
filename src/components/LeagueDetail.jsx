import { useEffect, useMemo, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, doc, onSnapshot, updateDoc, deleteDoc, arrayRemove, addDoc, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { MASTER_LEAGUE_ID, MASTER_LEAGUE_NAME, generateJoinCode } from '../utils/leaguesData.js';
import StakesAcknowledgmentModal from './StakesAcknowledgmentModal.jsx';

export default function LeagueDetail({ user, firestore }) {
  const { leagueId } = useParams();
  const navigate = useNavigate();

  const [league, setLeague] = useState(null);
  const [usersMap, setUsersMap] = useState({});
  const [matchDocs, setMatchDocs] = useState([]);

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStake, setEditStake] = useState('');
  const [editHostFee, setEditHostFee] = useState('');
  const [editPrizeSplits, setEditPrizeSplits] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const [editChatEnabled, setEditChatEnabled] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [sendingChat, setSendingChat] = useState(false);
  const chatEndRef = useRef(null);

  const [userDoc, setUserDoc] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showStakesAck, setShowStakesAck] = useState(false);
  const [showRemoveUnpaid, setShowRemoveUnpaid] = useState(false);
  const [removingUnpaid, setRemovingUnpaid] = useState(false);

  useEffect(() => {
    if (!firestore || !leagueId) return;
    const unsub = onSnapshot(doc(firestore, 'leagues', leagueId), (snap) => {
      if (!snap.exists()) { navigate('/leagues', { replace: true }); return; }
      setLeague({ id: snap.id, ...snap.data() });
    });
    return unsub;
  }, [firestore, leagueId, navigate]);

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
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore, 'worldCupPredictions'), (snap) => {
      setMatchDocs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
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
    if (!firestore || !leagueId) return;
    const messagesRef = collection(firestore, 'leagues', leagueId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'), limit(100));
    const unsub = onSnapshot(q, (snap) => {
      setChatMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }, (err) => { console.warn('Chat messages error', err); });
    return unsub;
  }, [firestore, leagueId]);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

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

  if (!league) return null;

  const isMaster = league.id === MASTER_LEAGUE_ID || leagueId === MASTER_LEAGUE_ID;
  const isAdmin = (league.admins || []).includes(user.uid);
  const isPaid = league.type === 'paid';
  const payments = league.payments || {};

  const members = Object.entries(usersMap)
    .filter(([, d]) => (d.leagueIds || []).includes(leagueId))
    .map(([uid]) => ({ uid, points: userPoints[uid] || 0, name: usersMap[uid]?.displayName || usersMap[uid]?.email || (uid === user?.uid && user?.displayName) || uid.slice(0, 6) }))
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));

  const getDisplayName = (uid) => usersMap[uid]?.displayName || usersMap[uid]?.email || (uid === user?.uid && user?.displayName) || uid.slice(0, 6);

  const togglePayment = async (memberUid) => {
    if (!firestore) return;
    const ref = doc(firestore, 'leagues', leagueId);
    await updateDoc(ref, { ['payments.' + memberUid]: !payments[memberUid] });
  };

  const startEdit = () => {
    setEditName(league.name || '');
    setEditDescription(league.description || '');
    setEditStake(league.stake ? String(league.stake) : '');
    setEditHostFee(league.hostFeePercent ? String(league.hostFeePercent) : '');
    setEditPrizeSplits((league.prizeSplits || []).map((p) => ({ ...p })));
    setEditChatEnabled(league.chatEnabled !== false);
    setEditing(true);
    setSaveError('');
  };

  const cancelEdit = () => {
    setEditing(false);
    setSaveError('');
  };

  const handleSaveEdit = async () => {
    setSaveError('');
    const name = editName.trim();
    if (!name || name.length < 2) { setSaveError('Name must be at least 2 characters'); return; }
    if (name.length > 30) { setSaveError('Name must be 30 characters or fewer'); return; }
    setSaving(true);
    try {
      const updateData = { name, description: editDescription.trim(), chatEnabled: editChatEnabled };
      if (isPaid) {
        const stake = parseFloat(editStake);
        if (stake && stake > 0) updateData.stake = stake;
        const isJuniorAdmin = userDoc?.role === 'juniorAdmin' || userDoc?.role === 'admin';
        const hostPct = isJuniorAdmin ? (parseFloat(editHostFee) || 0) : 0;
        updateData.hostFeePercent = hostPct;
        const validSplits = editPrizeSplits.filter((p) => p.percent > 0);
        updateData.prizeSplits = validSplits.map((p) => ({ position: p.position, label: p.label, percent: parseFloat(p.percent) }));
      }
      await updateDoc(doc(firestore, 'leagues', leagueId), updateData);
      setEditing(false);
    } catch {
      setSaveError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const memberUids = Object.entries(usersMap)
        .filter(([, d]) => (d.leagueIds || []).includes(leagueId))
        .map(([uid]) => uid);
      const promises = memberUids.map((uid) =>
        updateDoc(doc(firestore, 'users', uid), { leagueIds: arrayRemove(leagueId) })
      );
      await Promise.all(promises);
      await deleteDoc(doc(firestore, 'leagues', leagueId));
      navigate('/leagues', { replace: true });
    } catch {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleSendChat = async () => {
    const text = chatInput.trim();
    if (!text || !firestore || sendingChat) return;
    setSendingChat(true);
    try {
      await addDoc(collection(firestore, 'leagues', leagueId, 'messages'), {
        uid: user.uid,
        displayName: getDisplayName(user.uid),
        text,
        createdAt: serverTimestamp(),
      });
      setChatInput('');
    } catch (err) { console.warn('Chat send error', err); }
    setSendingChat(false);
  };

  const updatePrizeSplit = (index, value) => {
    const updated = [...editPrizeSplits];
    updated[index] = { ...updated[index], percent: value };
    setEditPrizeSplits(updated);
  };

  const deadlineMs = league.joinDeadline ? new Date(league.joinDeadline).getTime() : 0;
  const deadlinePassed = deadlineMs > 0 && Date.now() >= deadlineMs;

  const handleRemoveUnpaid = async () => {
    if (!firestore) return;
    setRemovingUnpaid(true);
    try {
      const unpaidUids = members.filter((m) => !payments[m.uid]).map((m) => m.uid);
      await Promise.all(unpaidUids.map((uid) =>
        updateDoc(doc(firestore, 'users', uid), { leagueIds: arrayRemove(leagueId) })
      ));
      setShowRemoveUnpaid(false);
    } catch {}
    setRemovingUnpaid(false);
  };

  return (
    <section className="panel league-detail-panel">
      <div className="league-detail-header">
        <button type="button" className="league-detail-back" onClick={() => navigate('/leagues')}>
          {'\u2190'} Back
        </button>
        <div className="league-detail-title-row">
          <h2 className="league-detail-title">{isMaster ? MASTER_LEAGUE_NAME : league.name}</h2>
          {isMaster && <span className="league-card-badge league-card-badge--official">{'\uD83C\uDFC6'} Official</span>}
          {isAdmin && <span className="league-card-badge league-card-badge--admin">{'\uD83D\uDC51'} Admin</span>}
          {isPaid && <span className="league-card-badge league-card-badge--paid">{'\uD83D\uDCB0'} Paid</span>}
        </div>
        {isAdmin && !isMaster && !editing && (
          <div className="league-detail-actions">
            <button type="button" className="league-btn league-btn--edit" onClick={startEdit}>
              {'\u270F\uFE0F'} Edit
            </button>
            <button type="button" className="league-btn league-btn--delete" onClick={() => setShowDeleteConfirm(true)}>
              {'\uD83D\uDDD1\uFE0F'} Delete
            </button>
          </div>
        )}
      </div>

      {league.joinCode && !editing && (isAdmin || league.shareable) && (
        <div className="league-detail-code-section">
          <div className="league-detail-code-row">
            <span className="league-detail-code-label">Invite Code</span>
            <span className="league-detail-code-value">{league.joinCode}</span>
            <button type="button" className="league-detail-code-copy" onClick={() => {
              const link = `${window.location.origin}/?join=${league.joinCode}`;
              navigator.clipboard.writeText(link).then(() => {
                setCopiedCode(true);
                setTimeout(() => setCopiedCode(false), 2000);
              });
            }}>
              {copiedCode ? '\u2713 Copied!' : '\uD83D\uDCCB Copy Invite Link'}
            </button>
          </div>
          <div className="league-detail-share">
            <a
              className="league-share-btn league-share-btn--whatsapp"
              href={'https://wa.me/?text=' + encodeURIComponent('Join my World Cup 2026 predictor league! Use code: ' + league.joinCode + ' or open: ' + window.location.origin + '/?join=' + league.joinCode)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {'\uD83D\uDCAC'} WhatsApp
            </a>
            <button
              type="button"
              className="league-share-btn league-share-btn--link"
              onClick={() => {
                const link = window.location.origin + '/?join=' + league.joinCode;
                navigator.clipboard.writeText(link).then(() => {
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                });
              }}
            >
              {copiedCode ? '\u2713 Copied!' : '\uD83D\uDD17 Share Invite Link'}
            </button>
          </div>
        </div>
      )}

      {isPaid && !editing && !userDoc?.stakesAcknowledged?.[leagueId] && (
        <div className="stakes-ack-banner">
          <span className="stakes-ack-banner-text">
            {'\u2696\uFE0F'} This league has an entry fee. Please review and acknowledge the stakes.
          </span>
          <button type="button" className="stakes-ack-banner-btn" onClick={() => setShowStakesAck(true)}>
            Review
          </button>
        </div>
      )}

      {isPaid && !editing && (
        <div className="league-detail-info">
          <div className="league-detail-info-row">
            <span className="league-detail-info-label">Entry fee</span>
            <span className="league-detail-info-value">\u00A3{Number(league.stake || 0).toFixed(2)}</span>
          </div>
          {league.hostFeePercent > 0 && (
            <div className="league-detail-info-row">
              <span className="league-detail-info-label">Host fee</span>
              <span className="league-detail-info-value">{league.hostFeePercent}%</span>
            </div>
          )}
          {league.hostFeePercent > 0 && (
            <div className="league-detail-info-row">
              <span className="league-detail-info-label">Pay to</span>
              <span className="league-detail-info-value">
                {league.hostFeeEmail ? (
                  <a
                    href={'https://www.paypal.com/paypalme/' + league.hostFeeEmail.replace('@gmail.com', '')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="league-detail-pay-link"
                  >
                    {league.hostFeeEmail}
                  </a>
                ) : (
                  'Contact host'
                )}
              </span>
            </div>
          )}
          {league.joinDeadline && (
            <div className="league-detail-info-row">
              <span className="league-detail-info-label">Join deadline</span>
              <span className="league-detail-info-value">
                <DeadlineDisplay deadline={league.joinDeadline} />
              </span>
            </div>
          )}
          {(league.prizeSplits || []).length > 0 && (
            <div className="league-detail-info-row">
              <span className="league-detail-info-label">Prize splits</span>
              <div className="league-detail-prizes">
                {(league.prizeSplits || []).map((p) => (
                  <span key={p.position} className="league-detail-prize-tag">
                    {p.label}: {p.percent}%
                  </span>
                ))}
              </div>
            </div>
          )}
          {(league.prizes || []).length > 0 && !league.prizeSplits && (
            <div className="league-detail-info-row">
              <span className="league-detail-info-label">Prizes</span>
              <div className="league-detail-prizes">
                {(league.prizes || []).map((p) => (
                  <span key={p.position} className="league-detail-prize-tag">
                    {p.label}: \u00A3{Number(p.amount).toFixed(2)}
                  </span>
                ))}
              </div>
            </div>
          )}
          {league.prizeSplits && league.stake > 0 && (
            <CalculatorDisplay
              entryFee={league.stake}
              hostFeePct={league.hostFeePercent || 0}
              prizeSplits={league.prizeSplits}
              memberCount={members.length}
            />
          )}
        </div>
      )}

      {isPaid && deadlinePassed && (
        <div className="league-prize-locked">
          <span className="league-prize-locked-icon">{'\uD83D\uDD12'}</span>
          <div className="league-prize-locked-text">
            <strong>Prize fund locked</strong> at {members.length} member{members.length === 1 ? '' : 's'}
          </div>
        </div>
      )}

      {isAdmin && isPaid && deadlinePassed && !showRemoveUnpaid && (
        <button type="button" className="league-btn league-btn--delete" onClick={() => setShowRemoveUnpaid(true)} style={{ marginBottom: 10 }}>
          {'\uD83D\uDEAB'} Remove unpaid members
        </button>
      )}

      {showRemoveUnpaid && (
        <div className="league-delete-confirm" style={{ marginBottom: 10 }}>
          <p className="league-delete-text">
            Remove all members who haven't marked as paid? This cannot be undone.
          </p>
          <div className="league-delete-buttons">
            <button type="button" className="league-btn league-btn--delete-confirm" onClick={handleRemoveUnpaid} disabled={removingUnpaid}>
              {removingUnpaid ? 'Removing...' : 'Yes, Remove Unpaid'}
            </button>
            <button type="button" className="league-btn league-btn--cancel" onClick={() => setShowRemoveUnpaid(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {league.description && !editing && (
        <div className="league-detail-desc">{league.description}</div>
      )}

      {editing && (
        <div className="league-detail-edit">
          <div className="league-form-row">
            <input
              className="league-input"
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="League name"
              maxLength={30}
            />
          </div>
          <div className="league-form-row">
            <textarea
              className="league-input league-input--textarea"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="League description / rules (optional)"
              rows={3}
            />
          </div>
          {isPaid && (
            <>
              <div className="league-form-row">
                <input
                  className="league-input league-input--stake"
                  type="number"
                  value={editStake}
                  onChange={(e) => setEditStake(e.target.value)}
                  placeholder="Entry fee"
                  min="0"
                  step="0.01"
                />
              </div>
              {userDoc?.role === 'juniorAdmin' && (
                <div className="league-form-row">
                  <input
                    className="league-input league-input--stake"
                    type="number"
                    value={editHostFee}
                    onChange={(e) => setEditHostFee(e.target.value)}
                    placeholder="Host fee (%)"
                    min="0"
                    max="100"
                    step="0.5"
                  />
                </div>
              )}
              <div className="league-prizes-section">
                <label className="league-prizes-label">Prize Splits (%)</label>
                {editPrizeSplits.map((p, i) => (
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
                  </div>
                ))}
              </div>
              {editStake && (
                <CalculatorDisplay
                  entryFee={parseFloat(editStake) || 0}
                  hostFeePct={parseFloat(editHostFee) || 0}
                  prizeSplits={editPrizeSplits}
                  memberCount={members.length}
                />
              )}
            </>
          )}
          <div className="league-form-row" style={{ marginTop: 4 }}>
            <label className="league-chat-toggle">
              <input
                type="checkbox"
                checked={editChatEnabled}
                onChange={(e) => setEditChatEnabled(e.target.checked)}
              />
              <span>Enable league chat</span>
            </label>
          </div>
          <div className="league-edit-buttons">
            <button type="button" className="league-btn league-btn--primary" onClick={handleSaveEdit} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button type="button" className="league-btn league-btn--cancel" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
          {saveError && <div className="league-msg league-msg--error">{saveError}</div>}
        </div>
      )}

      {showDeleteConfirm && (
        <div className="league-delete-confirm">
          <p className="league-delete-text">Are you sure you want to delete "{league.name}"? This will remove all members and cannot be undone.</p>
          <div className="league-delete-buttons">
            <button type="button" className="league-btn league-btn--delete-confirm" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Yes, Delete'}
            </button>
            <button type="button" className="league-btn league-btn--cancel" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="league-detail-leaderboard">
        <h3 className="league-detail-section-title">{'\uD83C\uDFC6'} Leaderboard</h3>
        {members.length === 0 && <p className="league-empty">No members yet.</p>}
        {members.map((m, i) => (
          <div key={m.uid} className={'league-detail-row' + (m.uid === user.uid ? ' league-detail-row--me' : '')}>
            <span className="league-detail-rank">#{i + 1}</span>
            <span className="league-detail-name">{m.name}</span>
            <span className="league-detail-pts">{m.points} pts</span>
            {isAdmin && isPaid && (
              <label className="league-detail-pay-label">
                <input
                  type="checkbox"
                  className="league-detail-pay-check"
                  checked={!!payments[m.uid]}
                  onChange={() => togglePayment(m.uid)}
                />
                Paid
              </label>
            )}
          </div>
        ))}
      </div>

      {showStakesAck && (
        <StakesAcknowledgmentModal
          league={{ ...league, id: leagueId }}
          memberCount={members.length}
          user={user}
          firestore={firestore}
          onConfirm={() => setShowStakesAck(false)}
          onClose={() => setShowStakesAck(false)}
        />
      )}

      {league.chatEnabled !== false && (
        <div className="league-chat-section">
          <h3 className="league-detail-section-title">{'\uD83D\uDCAC'} Chat</h3>
          <div className="league-chat-messages">
            {chatMessages.length === 0 && <p className="league-chat-empty">No messages yet.</p>}
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`league-chat-msg${msg.uid === user.uid ? ' league-chat-msg--me' : ''}`}>
                <span className="league-chat-msg-author" style={{ color: msg.uid === user.uid ? '#3ddc84' : '#b0c4e0' }}>
                  {msg.displayName || msg.uid.slice(0, 6)}
                </span>
                <span className="league-chat-msg-text">{msg.text}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="league-chat-input-row">
            <input
              className="league-chat-input"
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendChat(); } }}
              placeholder="Type a message..."
              maxLength={500}
            />
            <button type="button" className="league-chat-send" onClick={handleSendChat} disabled={sendingChat || !chatInput.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function CalculatorDisplay({ entryFee, hostFeePct, prizeSplits, memberCount }) {
  const totalEntries = entryFee * memberCount;
  const hostFee = totalEntries * (hostFeePct / 100);
  const prizePool = totalEntries - hostFee;
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
      {hostFeePct > 0 && (
        <div className="league-calculator-row league-calculator-row--fee">
          <span>Host fee ({hostFeePct}%)</span>
          <span>-\u00A3{hostFee.toFixed(2)}</span>
        </div>
      )}
      <div className="league-calculator-row league-calculator-row--pool">
        <span>Prize pool</span>
        <span>\u00A3{prizePool.toFixed(2)}</span>
      </div>
      {totalPct > 0 && Math.abs(totalPct - 100) < 0.01 && active.map((p) => {
        const amount = prizePool * (parseFloat(p.percent) / 100);
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

function DeadlineDisplay({ deadline }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);
  const deadlineMs = new Date(deadline).getTime();
  const diff = deadlineMs - now;
  if (diff <= 0) return <span className="league-deadline league-deadline--closed">{'\uD83D\uDD12'} Join closed</span>;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  if (days > 0) return <span className="league-deadline">{'\u23F3'} {days}d {hours}h remaining</span>;
  return <span className="league-deadline league-deadline--urgent">{'\u26A0\uFE0F'} {hours}h remaining</span>;
}
