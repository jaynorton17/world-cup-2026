import { useState } from 'react';
import { createPortal } from 'react-dom';
import { doc, updateDoc } from 'firebase/firestore';

export default function StakesAcknowledgmentModal({ league, memberCount, user, firestore, onConfirm, onClose }) {
  const [checked, setChecked] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!league) return null;

  const leagueId = league.id || league.leagueId;
  const stake = league.stake || 0;
  const count = memberCount || 1;
  const totalEntries = stake * count;
  const hostFee = totalEntries * ((league.hostFeePercent || 0) / 100);
  const prizePool = totalEntries - hostFee;
  const activeSplits = (league.prizeSplits || []).filter((p) => p.percent > 0);

  const handleConfirm = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(firestore, 'users', user.uid), {
        [`stakesAcknowledged.${leagueId}`]: true,
      });
      onConfirm(leagueId);
    } catch {}
    setSaving(false);
  };

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="panel stakes-ack-modal" onClick={(e) => e.stopPropagation()}>
        <div className="podium-modal-header">
          <h2 className="podium-modal-title">{'\u2696\uFE0F'} Stakes & Prizes</h2>
          <button type="button" className="podium-modal-close" onClick={onClose}>{'\u2715'}</button>
        </div>

        <div className="stakes-ack-body">
          <p className="stakes-ack-notice">
            This league has an entry fee of <strong>\u00A3{stake.toFixed(2)}</strong> per person.
          </p>

          <div className="league-calculator stakes-ack-calculator">
            <div className="league-calculator-title">{'\uD83D\uDCB0'} Prize Fund</div>
            <div className="league-calculator-row">
              <span>Members</span>
              <span>{count}</span>
            </div>
            <div className="league-calculator-row">
              <span>Total entries ({count} \u00D7 \u00A3{stake.toFixed(2)})</span>
              <span>\u00A3{totalEntries.toFixed(2)}</span>
            </div>
            {hostFee > 0 && (
              <div className="league-calculator-row league-calculator-row--fee">
                <span>Host fee ({league.hostFeePercent}%)</span>
                <span>-\u00A3{hostFee.toFixed(2)}</span>
              </div>
            )}
            <div className="league-calculator-row league-calculator-row--pool">
              <span>Prize pool</span>
              <span>\u00A3{prizePool.toFixed(2)}</span>
            </div>
            {activeSplits.length > 0 && activeSplits.map((p) => {
              const amount = prizePool * (parseFloat(p.percent) / 100);
              return (
                <div key={p.position} className="league-calculator-row league-calculator-row--prize">
                  <span>{p.label} ({p.percent}%)</span>
                  <span>\u00A3{amount.toFixed(2)}</span>
                </div>
              );
            })}
            {count <= 1 && (
              <div className="league-calculator-note">
                * Prize fund shown at current member count — grows as more people join
              </div>
            )}
          </div>

          <label className="stakes-ack-checkbox">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <span>
              I understand this league has an entry fee of \u00A3{stake.toFixed(2)}. I will arrange payment directly with the league organiser. <strong>This app does not handle, collect, or process any payments</strong>. The app creators are not responsible for any financial arrangements between members. The league organiser is solely responsible for all prize payouts and fee collection.
            </span>
          </label>
        </div>

        <div className="stakes-ack-actions">
          <button type="button" className="stakes-ack-confirm-btn" onClick={handleConfirm} disabled={!checked || saving}>
            {saving ? 'Saving...' : '\u2713 I Understand, Enter League'}
          </button>
          <button type="button" className="stakes-ack-skip" onClick={onClose}>
            Remind me later
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
