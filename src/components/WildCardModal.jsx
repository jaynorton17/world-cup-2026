import { useState } from 'react';
import { createPortal } from 'react-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { getCurrentRound, getDaysInRound, WILD_CARD_MULTIPLIER, GROUP_ROUND_DATES, WORLD_CUP_2026_MATCHES, getFlagUrl } from '../utils/worldCupData';

export default function WildCardModal({ user, firestore, onClose, onActivate }) {
  const round = getCurrentRound();
  const roundIdx = round ? GROUP_ROUND_DATES.findIndex((r) => r.round === round.round) : -1;
  const days = roundIdx >= 0 ? getDaysInRound(roundIdx).filter((d) => new Date(d + 'T23:59:59Z').getTime() > Date.now()) : [];
  const [activating, setActivating] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [confirmDay, setConfirmDay] = useState(null);
  const [activateError, setActivateError] = useState('');

  const matchList = WORLD_CUP_2026_MATCHES.filter((m) => m.stage === 'group');

  if (!round || days.length === 0) return null;

  const handleConfirm = async () => {
    if (!confirmDay) return;
    setActivateError('');
    setActivating(true);
    try {
      await updateDoc(doc(firestore, 'users', user.uid), {
        ['wildCards.round' + round.round]: { day: confirmDay, activatedAt: new Date().toISOString() },
      });
      if (onActivate) onActivate(round.round, confirmDay);
    } catch (err) {
      console.error('WildCard activation error:', err);
      setActivateError('Failed to activate Wild Card. Please try again.');
      setActivating(false);
    }
  };

  const selectedMatches = confirmDay ? matchList.filter((m) => m.matchDate.startsWith(confirmDay)) : [];

  return createPortal(
    <div className="wc-modal-backdrop" onClick={onClose}>
      <div className="panel wc-modal wc-modal-wildcard" onClick={(e) => e.stopPropagation()}>
        <div className="wc-wildcard-card">
          <div className={`wc-wildcard-card-inner${flipped ? ' wc-wildcard-card-flipped' : ''}`}>
            <div className="wc-wildcard-card-front" style={{ backgroundImage: 'url(/assets/wildcard.jpg)' }}>
              <div className="wc-wildcard-card-front-overlay" />
              <div className="wc-wildcard-card-front-content">
                <div className="wc-wildcard-stamp">{'\u26A1'}</div>
                <h2 className="wc-wildcard-title">WILD CARD</h2>
                <div className="wc-wildcard-subtitle">Round {round.round}</div>
                <div className="wc-wildcard-multiplier">x{WILD_CARD_MULTIPLIER} POINTS</div>
                <button type="button" className="wc-wildcard-flip-btn" onClick={() => setFlipped(true)}>
                  {'\uD83D\uDD04'} Reveal
                </button>
                <button type="button" className="wc-wildcard-skip-btn" onClick={onClose}>
                  Skip for now
                </button>
              </div>
            </div>
            <div className="wc-wildcard-card-back">
              {confirmDay ? (
                <>
                  <div className="podium-modal-header">
                    <h2 className="podium-modal-title">{'\u26A1'} Confirm Wild Card</h2>
                    <button type="button" className="podium-modal-close" onClick={onClose}>{'\u2715'}</button>
                  </div>
                  <div className="wc-wildcard-confirm-body">
                    <div className="wc-wildcard-confirm-date">
                      {new Date(confirmDay + 'T00:00:00Z').toLocaleDateString('en-US', {
                        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
                      })}
                    </div>
                    <div className="wc-wildcard-confirm-games">
                      {selectedMatches.map((m) => (
                        <div key={m.matchKey} className="wc-wildcard-day-game">
                          {getFlagUrl(m.homeTeam) && <img src={getFlagUrl(m.homeTeam)} alt="" className="wc-wildcard-day-flag" />}
                          <span className="wc-wildcard-day-team">{m.homeTeam}</span>
                          <span className="wc-wildcard-day-vs">vs</span>
                          <span className="wc-wildcard-day-team">{m.awayTeam}</span>
                          {getFlagUrl(m.awayTeam) && <img src={getFlagUrl(m.awayTeam)} alt="" className="wc-wildcard-day-flag" />}
                        </div>
                      ))}
                    </div>
                    <div className="wc-wildcard-confirm-note">
                      All points from your predictions on this day will be multiplied by <strong>&times;{WILD_CARD_MULTIPLIER}</strong>!
                    </div>
                    {activateError && <div className="wc-save-error">{activateError}</div>}
                    <div className="wc-wildcard-confirm-actions">
                      <button type="button" className="wc-wildcard-confirm-btn" onClick={handleConfirm} disabled={activating}>
                        {activating ? 'Activating...' : '\u2705 Confirm'}
                      </button>
                      <button type="button" className="podium-skip-btn" onClick={onClose}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="podium-modal-header">
                    <h2 className="podium-modal-title">{'\u26A1'} Pick Your Day</h2>
                    <button type="button" className="podium-modal-close" onClick={onClose}>{'\u2715'}</button>
                  </div>
                  <div className="wc-wildcard-pick-body">
                    <p style={{ color: '#b0c8e0', fontSize: '0.8rem', margin: '0 0 12px', lineHeight: 1.5 }}>
                      Choose one day in <strong>Round {round.round} ({round.label})</strong> to get <strong>&times;{WILD_CARD_MULTIPLIER}</strong> points
                      on every match prediction you make that day.
                    </p>
                    <div className="wc-wildcard-days-list">
                      {days.map((d) => {
                        const dayMatches = matchList.filter((m) => m.matchDate.startsWith(d));
                        return (
                          <div key={d} className="wc-wildcard-day-block">
                            <div className="wc-wildcard-day-header">
                              {new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </div>
                            {dayMatches.length > 0 ? (
                              <div className="wc-wildcard-day-games">
                                {dayMatches.map((m) => (
                                  <div key={m.matchKey} className="wc-wildcard-day-game">
                                    {getFlagUrl(m.homeTeam) && <img src={getFlagUrl(m.homeTeam)} alt="" className="wc-wildcard-day-flag" />}
                                    <span className="wc-wildcard-day-team">{m.homeTeam}</span>
                                    <span className="wc-wildcard-day-vs">vs</span>
                                    <span className="wc-wildcard-day-team">{m.awayTeam}</span>
                                    {getFlagUrl(m.awayTeam) && <img src={getFlagUrl(m.awayTeam)} alt="" className="wc-wildcard-day-flag" />}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="wc-wildcard-day-no-games">No group matches</div>
                            )}
                            <button type="button" className="wc-wildcard-select-btn" onClick={() => setConfirmDay(d)}>
                              {'\u26A1'} Select this date
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="podium-footer">
                    <button type="button" className="podium-skip-btn" onClick={onClose}>Skip</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
