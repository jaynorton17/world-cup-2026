import { useState, useEffect, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import {
  isMatchPast,
  isMatchDeadlinePassed,
  getFlagUrl,
  parseVenue,
  getStadiumImageUrl,
  formatKickoff,
  calculateMatchPoints,
  isExactScore,
  getCurrentRound,
  getDaysInRound,
  GROUP_ROUND_DATES,
  WILD_CARD_MULTIPLIER,
  POINTS_CORRECT_OUTCOME,
} from '../utils/worldCupData.js';
import { getTeamData, getFormGuide } from '../utils/teamData.js';

function shortImmersiveTeam(name) {
  if (name === 'Bosnia and Herzegovina') return 'Bosnia & Herz.';
  if (name === "C\u00F4te d'Ivoire") return "C\u00F4te d'Ivoire";
  if (name === 'Korea Republic') return 'South Korea';
  if (name === 'IR Iran') return 'Iran';
  if (name === 'Cabo Verde') return 'Cape Verde';
  if (name === 'Congo DR') return 'DR Congo';
  if (name === 'Saudi Arabia') return 'Saudi Arabia';
  if (name.length > 14) return name.slice(0, 13) + '\u2026';
  return name;
}

export default function MatchDetailModal({ match, user, userDoc, firestore, isAdmin, matches, sortedUserUids, getDisplayName, getUserColor, onSubmitPrediction, onSubmitActual, onUpdateTeams, onClose }) {
  const [homePred, setHomePred] = useState('0');
  const [awayPred, setAwayPred] = useState('0');
  const [actualHome, setActualHome] = useState('');
  const [actualAway, setActualAway] = useState('');
  const [saving, setSaving] = useState(false);
  const [editHomeTeam, setEditHomeTeam] = useState(match.homeTeam);
  const [editAwayTeam, setEditAwayTeam] = useState(match.awayTeam);
  const [showTeamEditor, setShowTeamEditor] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [homeFlagErr, setHomeFlagErr] = useState(false);
  const [awayFlagErr, setAwayFlagErr] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [saveError, setSaveError] = useState('');

  const saveTimerRef = useRef(null);
  const statusTimerRef = useRef(null);

  const homeData = getTeamData(match.homeTeam) || { fifaRank: '\u2014' };
  const awayData = getTeamData(match.awayTeam) || { fifaRank: '\u2014' };
  const homeForm = getFormGuide(matches, match.homeTeam) || [];
  const awayForm = getFormGuide(matches, match.awayTeam) || [];

  const isPast = isMatchPast(match.matchDate);
  const deadlinePassed = isMatchDeadlinePassed(match.matchDate);
  const canPredict = !deadlinePassed && match.actual?.homeScore == null;
  const existingPred = match.predictions?.[user?.uid];
  const homeActual = match.actual?.homeScore;
  const awayActual = match.actual?.awayScore;

  const { stadium, city, country } = parseVenue(match.venue);
  const imgUrl = getStadiumImageUrl(match.venue);
  const homeFlagUrl = getFlagUrl(match.homeTeam);
  const awayFlagUrl = getFlagUrl(match.awayTeam);

  useEffect(() => {
    if (existingPred?.homeScore != null) setHomePred(String(existingPred.homeScore));
    else setHomePred('0');
    if (existingPred?.awayScore != null) setAwayPred(String(existingPred.awayScore));
    else setAwayPred('0');
    if (match.actual?.homeScore != null) setActualHome(String(match.actual.homeScore));
    if (match.actual?.awayScore != null) setActualAway(String(match.actual.awayScore));
    setEditHomeTeam(match.homeTeam);
    setEditAwayTeam(match.awayTeam);
  }, [match.matchKey, match.actual?.homeScore, match.actual?.awayScore, existingPred?.homeScore, existingPred?.awayScore, user?.uid]);

  useEffect(() => {
    if (statusTimerRef.current) window.clearTimeout(statusTimerRef.current);
    if (autoSaveStatus === 'saved') {
      statusTimerRef.current = window.setTimeout(() => setAutoSaveStatus(null), 2000);
    }
    return () => { if (statusTimerRef.current) window.clearTimeout(statusTimerRef.current); };
  }, [autoSaveStatus]);

  const blockInvalidChars = (e) => {
    if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
  };

  const toInt = (val) => Math.floor(Number(val || 0));

  const clampScore = (val) => Math.max(0, Math.min(20, toInt(val)));
  const homeScoreNum = toInt(homePred);
  const awayScoreNum = toInt(awayPred);
  const scoresValid = homePred !== '' && awayPred !== ''
    && !isNaN(homeScoreNum) && !isNaN(awayScoreNum)
    && homeScoreNum >= 0 && homeScoreNum <= 20
    && awayScoreNum >= 0 && awayScoreNum <= 20
    && String(homeScoreNum) === String(homePred).trim()
    && String(awayScoreNum) === String(awayPred).trim();

  const handleSavePrediction = async () => {
    if (!canPredict || !user || !scoresValid) return;
    setSaveError('');
    setSaving(true);
    try {
      const safeHome = String(clampScore(homePred === '' ? '0' : homePred));
      const safeAway = String(clampScore(awayPred === '' ? '0' : awayPred));
      await onSubmitPrediction(match.matchKey, safeHome, safeAway);
      setSaving(false);
      onClose();
    } catch (err) {
      console.error('Save prediction error:', err);
      setSaveError('Failed to save prediction. Please try again.');
      setSaving(false);
    }
  };

  const handleSaveActual = async () => {
    if (!isAdmin) return;
    setSaving(true);
    await onSubmitActual(match.matchKey, actualHome, actualAway);
    setSaving(false);
  };

  const handleSaveTeams = async () => {
    if (!isAdmin) return;
    setSaving(true);
    await onUpdateTeams(match.matchKey, editHomeTeam, editAwayTeam);
    setShowTeamEditor(false);
    setSaving(false);
  };

  const showActual = homeActual != null && awayActual != null;

  let scoreHome, scoreAway;
  if (showActual) {
    scoreHome = homeActual;
    scoreAway = awayActual;
  } else if (canPredict && existingPred?.homeScore == null) {
    scoreHome = null;
    scoreAway = null;
  } else if (existingPred?.homeScore != null) {
    scoreHome = existingPred.homeScore;
    scoreAway = existingPred.awayScore;
  } else {
    scoreHome = null;
    scoreAway = null;
  }

  let footerLabel;
  if (showActual) {
    footerLabel = 'FINAL';
  } else if (!user) {
    footerLabel = 'SIGN IN TO PREDICT';
  } else if (canPredict) {
    footerLabel = 'OPEN';
  } else if (existingPred?.homeScore != null) {
    footerLabel = 'LOCKED';
  } else {
    footerLabel = 'DEADLINE PASSED';
  }

  const fmtScore = (val) => {
    if (val == null || val === '') return ['\u2013', '\u2013'];
    const s = String(val);
    if (s.length >= 2) return [s[0], s[1]];
    return ['\u2003', s];
  };

  const homeDigits = fmtScore(scoreHome);
  const awayDigits = fmtScore(scoreAway);

  const matchStarted = isMatchPast(match?.matchDate);
  const others = !matchStarted ? [] : sortedUserUids.filter((uid) => uid !== user?.uid && match.predictions?.[uid]?.homeScore != null);

  return (
    <div className="wc-modal-immersive">
      {!imgError && (
        <div
          className="wc-modal-immersive-bg"
          style={{ backgroundImage: `url(${imgUrl})` }}
        />
      )}
      <div className="wc-modal-immersive-overlay" />

      <button type="button" className="wc-immersive-close" onClick={onClose}>{'\u2715'}</button>

      {isAdmin && (
        <button type="button" className="wc-immersive-admin-toggle" onClick={() => setShowAdmin(!showAdmin)} title="Admin tools">
          {'\u2699\uFE0F'}
        </button>
      )}

      <div className="wc-modal-immersive-content">
        <div className="wc-immersive-teams">
          <div className="wc-immersive-team">
            {homeFlagUrl && !homeFlagErr ? (
              <div className="wc-flag-circle-wrap">
                <img className="wc-flag-circle" src={homeFlagUrl} alt={match.homeTeam} onError={() => setHomeFlagErr(true)} />
              </div>
            ) : (
              <div className="wc-flag-circle-placeholder">?</div>
            )}
            <div className="wc-immersive-team-name">
              {shortImmersiveTeam(match.homeTeam)}
            </div>
            <div className="wc-immersive-team-rank">
              {'\uD83C\uDFC6'} FIFA Ranking: {homeData.fifaRank}
            </div>
            {homeForm.length > 0 && (
              <div className="wc-immersive-team-form">
                {homeForm.map((f, i) => (
                  <span key={i} className={`wc-team-info-form-badge wc-form-badge--${f.outcome.toLowerCase()}`}>{f.outcome}</span>
                ))}
              </div>
            )}
          </div>

          <div className="wc-immersive-vs">VS</div>

          <div className="wc-immersive-team">
            {awayFlagUrl && !awayFlagErr ? (
              <div className="wc-flag-circle-wrap">
                <img className="wc-flag-circle" src={awayFlagUrl} alt={match.awayTeam} onError={() => setAwayFlagErr(true)} />
              </div>
            ) : (
              <div className="wc-flag-circle-placeholder">?</div>
            )}
            <div className="wc-immersive-team-name">
              {shortImmersiveTeam(match.awayTeam)}
            </div>
            <div className="wc-immersive-team-rank">
              {'\uD83C\uDFC6'} FIFA #{awayData.fifaRank}
            </div>
            {awayForm.length > 0 && (
              <div className="wc-immersive-team-form">
                {awayForm.map((f, i) => (
                  <span key={i} className={`wc-team-info-form-badge wc-form-badge--${f.outcome.toLowerCase()}`}>{f.outcome}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="wc-immersive-scoreboard">
          {canPredict && user ? (
            <>
              <div className="wc-score-spinner">
                <input type="number" min="0" max="20" className="wc-flip-input" value={homePred}
                  onChange={(e) => setHomePred(e.target.value)}
                  onFocus={() => { if (homePred === '0') setHomePred(''); }}
                  onBlur={() => { if (homePred === '') setHomePred('0'); }}
                  onKeyDown={blockInvalidChars}
                  disabled={saving}
                />
                <div className="wc-score-arrows">
                  <button type="button" className="wc-score-arrow" onClick={() => setHomePred(String(Math.min(20, toInt(homePred) + 1)))} tabIndex={-1} disabled={saving}>{'\u25B2'}</button>
                  <button type="button" className="wc-score-arrow" onClick={() => setHomePred(String(Math.max(0, toInt(homePred) - 1)))} tabIndex={-1} disabled={saving}>{'\u25BC'}</button>
                </div>
              </div>
              <span className="wc-flip-colon">:</span>
              <div className="wc-score-spinner">
                <input type="number" min="0" max="20" className="wc-flip-input" value={awayPred}
                  onChange={(e) => setAwayPred(e.target.value)}
                  onFocus={() => { if (awayPred === '0') setAwayPred(''); }}
                  onBlur={() => { if (awayPred === '') setAwayPred('0'); }}
                  onKeyDown={blockInvalidChars}
                  disabled={saving}
                />
                <div className="wc-score-arrows">
                  <button type="button" className="wc-score-arrow" onClick={() => setAwayPred(String(Math.min(20, toInt(awayPred) + 1)))} tabIndex={-1} disabled={saving}>{'\u25B2'}</button>
                  <button type="button" className="wc-score-arrow" onClick={() => setAwayPred(String(Math.max(0, toInt(awayPred) - 1)))} tabIndex={-1} disabled={saving}>{'\u25BC'}</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="wc-flip-digits">
                <span className="wc-flip-digit">{homeDigits[0]}</span>
                <span className="wc-flip-digit">{homeDigits[1]}</span>
              </div>
              <span className="wc-flip-colon">:</span>
              <div className="wc-flip-digits">
                <span className="wc-flip-digit">{awayDigits[0]}</span>
                <span className="wc-flip-digit">{awayDigits[1]}</span>
              </div>
            </>
          )}
        </div>

        <div className="wc-immersive-kickoff">
          {'\u23F0'} {formatKickoff(match.matchDate)}
        </div>

        <div className="wc-immersive-location">
          <span>{'\uD83D\uDCCD'}</span>
          <span>{city}, {country}</span>
          <span className="wc-location-divider">{'\u2022'}</span>
          <span>{stadium}</span>
        </div>

        {(() => {
          const currentRound = getCurrentRound();
          if (!currentRound || !user) return null;
          const wildCardKey = 'round' + currentRound.round;
          const wildCards = userDoc?.wildCards || {};
          const activated = wildCards[wildCardKey];
          const roundIdx = GROUP_ROUND_DATES.findIndex((r) => r.round === currentRound.round);
          const days = getDaysInRound(roundIdx).filter((d) => new Date(d + 'T23:59:59Z').getTime() > Date.now());
          return (
            <div className="wc-immersive-wildcard">
              {activated ? (
                <div className="wc-wildcard-activated">
                  {'\u26A1'} Wild Card activated for <strong>{activated.day}</strong> &mdash; \u00D7{WILD_CARD_MULTIPLIER} points!
                </div>
              ) : days.length > 0 ? (
                <>
                  <div className="wc-wildcard-prompt">{'\u26A1'} Activate Wild Card &mdash; pick a day for \u00D7{WILD_CARD_MULTIPLIER} points:</div>
                  <div className="wc-wildcard-days">
                    {days.map((d) => (
                      <button key={d} type="button" className="wc-wildcard-day" onClick={async () => {
                        if (!firestore) return;
                        try {
                          await updateDoc(doc(firestore, 'users', user.uid), {
                            ['wildCards.' + wildCardKey]: { day: d, activatedAt: new Date().toISOString() },
                          });
                        } catch {}
                      }}>
                        {d.replace('2026-', '')}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="wc-wildcard-prompt">{'\u26A1'} Wild Card &mdash; no days remaining in Round {currentRound.round}</div>
              )}
            </div>
          );
        })()}

        <div className="wc-immersive-footer">
          {canPredict && user ? (
            <>
              <button type="button" className="wc-save-pred-btn" onClick={handleSavePrediction} disabled={saving || !scoresValid}>
                {saving ? 'Saving\u2026' : 'Save Prediction'}
              </button>
              {saveError && <div className="wc-save-error">{saveError}</div>}
            </>
          ) : (
            `YOUR PREDICTION (${footerLabel})`
          )}
        </div>
      </div>

      {isAdmin && showAdmin && (
        <div className="wc-immersive-admin">
          {!showActual && isPast && (
            <>
              <h4>{'\uD83D\uDC51'} Enter Actual Score</h4>
              <div className="wc-immersive-admin-row">
                <input type="number" min="0" max="30" className="wc-score-input" value={actualHome} onChange={(e) => setActualHome(e.target.value)} placeholder="H" />
                <span className="wc-score-colon">:</span>
                <input type="number" min="0" max="30" className="wc-score-input" value={actualAway} onChange={(e) => setActualAway(e.target.value)} placeholder="A" />
                <button type="button" className="wc-save-btn" onClick={handleSaveActual} disabled={saving || !actualHome || !actualAway}>
                  {saving ? 'Saving...' : 'Set Result'}
                </button>
              </div>
            </>
          )}
          {match.knockoutPlaceholder && (
            <>
              <h4>{'\u270F\uFE0F'} Edit Teams</h4>
              {showTeamEditor ? (
                <div className="wc-immersive-admin-row">
                  <input value={editHomeTeam} onChange={(e) => setEditHomeTeam(e.target.value)} className="wc-score-input" style={{ width: 120 }} />
                  <span className="wc-score-colon">vs</span>
                  <input value={editAwayTeam} onChange={(e) => setEditAwayTeam(e.target.value)} className="wc-score-input" style={{ width: 120 }} />
                  <button type="button" className="wc-save-btn" onClick={handleSaveTeams} disabled={saving}>Save</button>
                  <button type="button" className="wc-save-btn" onClick={() => setShowTeamEditor(false)} style={{ borderColor: 'rgba(255,255,255,0.12)', color: '#b0c4e0' }}>Cancel</button>
                </div>
              ) : (
                <button type="button" className="wc-edit-teams-btn" onClick={() => { setShowTeamEditor(true); setEditHomeTeam(match.homeTeam); setEditAwayTeam(match.awayTeam); }}>
                  {'\u270F\uFE0F'} Edit Teams
                </button>
              )}
            </>
          )}
        </div>
      )}

      {others.length > 0 && (
        <div className="wc-immersive-others">
          <div className="wc-immersive-others-title">
            {showActual ? 'Results &amp; Points' : 'League Predictions'}
          </div>
          {others.map((uid) => {
            const pred = match.predictions[uid];
            const pts = showActual ? calculateMatchPoints(pred, { homeScore: homeActual, awayScore: awayActual }) : null;
            const isExact = showActual && isExactScore(pred, { homeScore: homeActual, awayScore: awayActual });
            const isOutcome = pts === POINTS_CORRECT_OUTCOME;
            return (
              <div key={uid} className="wc-immersive-others-row">
                <span className="wc-immersive-others-name" style={{ color: getUserColor(uid) }}>
                  {getDisplayName(uid)}
                </span>
                <span className="wc-immersive-others-score">
                  {pred.homeScore}-{pred.awayScore}
                </span>
                {pts != null && (
                  <span className={`wc-immersive-others-pts ${isExact ? 'wc-immersive-others-pts--exact' : isOutcome ? 'wc-immersive-others-pts--outcome' : 'wc-immersive-others-pts--wrong'}`}>
                    {isExact ? '+5' : isOutcome ? '+2' : '0'} pts
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
