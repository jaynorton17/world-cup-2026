import { useState, useEffect, useMemo, useCallback, Component } from 'react';
import { createPortal } from 'react-dom';
import { onSnapshot, collection, doc, limit, query, updateDoc, serverTimestamp } from 'firebase/firestore';
import {
  WORLD_CUP_2026_MATCHES,
  STAGE_LABELS,
  getFlagUrl,
  getCurrentRound,
  isMatchDeadlinePassed,
  getMatchDeadline,
  formatMatchKickoff,
  getLocalDateStr,
  isDateInRound,
  formatDateShort,
  formatDateMonthDay,
  parseVenue,
} from '../utils/worldCupData.js';
import { PODIUM_POINTS, GROUP_STAGE_END_DATE, WILD_CARD_MULTIPLIER } from '../utils/worldCupData.js';
import MatchDetailModal from './MatchDetailModal.jsx';
import useTickingInterval from '../hooks/useTickingInterval.js';

const USERS_QUERY_LIMIT = 500;

function shortTeam(name) {
  if (name === 'Bosnia and Herzegovina') return 'Bosnia';
  if (name === 'Ivory Coast' || name === "C\u00F4te d'Ivoire") return 'Ivory Coast';
  if (name === 'South Korea' || name === 'Korea Republic') return 'S. Korea';
  if (name === 'Iran' || name === 'IR Iran') return 'Iran';
  if (name === 'Cape Verde' || name === 'Cabo Verde') return 'C. Verde';
  if (name === 'DR Congo' || name === 'Congo DR') return 'DR Congo';
  if (name === 'Saudi Arabia') return 'Saudi Ar.';
  if (name === 'United States' || name === 'USA') return 'USA';
  return name;
}

const matchStatusIcon = (m) => {
  if (m.actual?.homeScore != null) return '\uD83D\uDCCA';
  if (isMatchDeadlinePassed(m.matchDate)) return '\uD83D\uDD12';
  return '\u23F3';
};

function FlagImg({ team, size = 20 }) {
  const url = getFlagUrl(team);
  if (!url) return <span style={{ width: size, height: size, display: 'inline-block', background: 'rgba(255,255,255,0.06)', borderRadius: 3, verticalAlign: 'middle' }} />;
  return <img src={url} alt={team} style={{ width: size, height: size * 0.75, borderRadius: 3, verticalAlign: 'middle' }} onError={(e) => { e.target.style.display = 'none' }} />;
}

function DonutChart({ predicted, outstanding }) {
  const total = predicted + outstanding;
  const pct = total > 0 ? Math.round((predicted / total) * 100) : 0;
  const r = 32;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="my-pred-donut-wrap">
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(61,220,132,0.12)" strokeWidth="8" />
        <circle cx="45" cy="45" r={r} fill="none" stroke="#3ddc84" strokeWidth="8"
          strokeDasharray={c} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 45 45)" style={{ transition: 'stroke-dashoffset 0.5s' }} />
        <text x="45" y="40" textAnchor="middle" fill="#f0f4ff" fontSize="20" fontWeight="800">{pct}%</text>
        <text x="45" y="55" textAnchor="middle" fill="#8aa0c0" fontSize="8">done</text>
      </svg>
      <div className="my-pred-donut-legend">
        <span className="my-pred-donut-row"><span className="my-pred-donut-dot" style={{ background: '#3ddc84' }} /> Predicted: {predicted}</span>
        <span className="my-pred-donut-row"><span className="my-pred-donut-dot" style={{ background: 'rgba(61,220,132,0.25)' }} /> Outstanding: {outstanding}</span>
      </div>
    </div>
  );
}

class MyPredictionsErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('MyPredictions crashed:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="my-predictions" style={{ padding: 32, textAlign: 'center' }}>
          <p style={{ color: '#ff6b6b', fontSize: '1.1rem' }}>Something went wrong loading your predictions.</p>
          <p style={{ color: '#8aa0c0', fontSize: '0.85rem' }}>Please try refreshing the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function MyPredictionsWrapper(props) {
  return (
    <MyPredictionsErrorBoundary>
      <MyPredictionsInner {...props} />
    </MyPredictionsErrorBoundary>
  );
}

function MyPredictionsInner({ user, firestore, userDoc, onOpenWildCard }) {
  const [matchDocs, setMatchDocs] = useState([]);
  const [dbReady, setDbReady] = useState(false);
  const [podiumUserDoc, setPodiumUserDoc] = useState(null);
  const [heroScores, setHeroScores] = useState({});
  const [savingHero, setSavingHero] = useState(null);
  const [heroSaveError, setHeroSaveError] = useState('');
  const [heroCountdowns, setHeroCountdowns] = useState({});
  const [modalMatchKey, setModalMatchKey] = useState(null);
  const [showWcInfo, setShowWcInfo] = useState(false);
  const [showWcFixtures, setShowWcFixtures] = useState(false);
  const [usersMap, setUsersMap] = useState({});

  useEffect(() => {
    if (!firestore || !user) return;
    const unsub = onSnapshot(doc(firestore, 'users', user.uid), (snap) => {
      setPodiumUserDoc(snap.data() || {});
    }, (err) => console.warn('UserDoc snapshot error', err));
    return unsub;
  }, [firestore, user]);

  useEffect(() => {
    if (!firestore) return;
    const unsub = onSnapshot(query(collection(firestore, 'users'), limit(USERS_QUERY_LIMIT)), (snap) => {
      const map = {};
      snap.docs.forEach((d) => { map[d.id] = d.data(); });
      setUsersMap(map);
    }, (err) => console.warn('UsersMap snapshot error', err));
    return unsub;
  }, [firestore]);

  useEffect(() => {
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore, 'worldCupPredictions'), (snap) => {
      setMatchDocs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setDbReady(true);
    }, (err) => { console.warn('MyPredictions snapshot error', err); setDbReady(true); });
    return unsub;
  }, [firestore]);

  const matches = useMemo(() => {
    const map = {};
    matchDocs.forEach((d) => { map[d.matchKey] = d; });
    return WORLD_CUP_2026_MATCHES.map((m) => {
      const doc = map[m.matchKey] || {};
      return { ...m, id: doc.id || m.matchKey, predictions: doc.predictions || {}, actual: doc.actual || { homeScore: null, awayScore: null }, points: doc.points || {} };
    });
  }, [matchDocs]);

  const predicted = useMemo(() => {
    if (!user) return [];
    return matches
      .filter((m) => m.predictions?.[user.uid]?.homeScore != null)
      .sort((a, b) => {
        const stages = ['group', 'roundOf32', 'roundOf16', 'quarterFinal', 'semiFinal', 'thirdPlace', 'final'];
        const ia = stages.indexOf(a.stage);
        const ib = stages.indexOf(b.stage);
        if (ia !== ib) return ia - ib;
        return (a.matchNumber || 0) - (b.matchNumber || 0);
      });
  }, [matches, user]);

  const [predFilter, setPredFilter] = useState(() => {
    const r = getCurrentRound();
    return r ? `round${r.round}` : 'all';
  });
  const [mobileView, setMobileView] = useState('outstanding');

  const groupPredicted = useMemo(() => predicted.filter((m) => m.stage === 'group'), [predicted]);
  const knockoutPredicted = useMemo(() => predicted.filter((m) => m.stage !== 'group'), [predicted]);

  const wildCardData = useMemo(() => podiumUserDoc ?? userDoc, [podiumUserDoc, userDoc]);

  const currentRound = getCurrentRound();

  const wildCardBanner = useMemo(() => {
    if (!currentRound || !wildCardData) return null;
    const wildCardKey = 'round' + currentRound.round;
    if (wildCardData.wildCards?.[wildCardKey]) return null;
    return { round: currentRound.round, label: currentRound.label };
  }, [wildCardData, currentRound]);

  const wildCardActivated = useMemo(() => {
    if (!currentRound || !wildCardData) return null;
    const wcKey = 'round' + currentRound.round;
    const wcData = wildCardData.wildCards?.[wcKey];
    if (!wcData) return null;
    return { round: currentRound.round, label: currentRound.label, day: wcData.day };
  }, [wildCardData, currentRound]);

  const hasWCRound = !!currentRound;

  const [podiumCountdown, setPodiumCountdown] = useState('');

  useTickingInterval(() => {
    const diff = new Date(GROUP_STAGE_END_DATE).getTime() - Date.now();
    if (diff <= 0) { setPodiumCountdown(''); return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    setPodiumCountdown(`${d}d ${h}h ${m}m ${s}s`);
  }, 1000);

  const otherPodiumData = useMemo(() => {
    const otherUsers = Object.entries(usersMap).filter(([uid]) => uid !== user?.uid && usersMap[uid]?.podiumPrediction);
    const counts = { first: {}, second: {}, third: {} };
    otherUsers.forEach(([, d]) => {
      const picks = d.podiumPrediction.final || d.podiumPrediction;
      if (picks.first) counts.first[picks.first] = (counts.first[picks.first] || 0) + 1;
      if (picks.second) counts.second[picks.second] = (counts.second[picks.second] || 0) + 1;
      if (picks.third) counts.third[picks.third] = (counts.third[picks.third] || 0) + 1;
    });
    const top = (obj, n = 3) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n);
    return {
      totalOthers: otherUsers.length,
      topFirst: top(counts.first),
      topSecond: top(counts.second),
      topThird: top(counts.third),
    };
  }, [usersMap, user]);

  const podiumPicks = podiumUserDoc?.podiumPrediction || null;

  const nextActualMatch = useMemo(() => {
    return matches
      .filter((m) => !m.knockoutPlaceholder && !isMatchDeadlinePassed(m.matchDate) && m.actual?.homeScore == null)
      .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))[0] || null;
  }, [matches]);

  const unpredictedTotal = useMemo(() => {
    return matches.reduce(
      (n, m) =>
        !m.knockoutPlaceholder &&
        !isMatchDeadlinePassed(m.matchDate) &&
        m.actual?.homeScore == null &&
        m.predictions?.[user?.uid]?.homeScore == null
          ? n + 1
          : n,
      0,
    );
  }, [matches, user]);

  const unpredictedMatches = useMemo(() => {
    return matches
      .filter((m) =>
        !m.knockoutPlaceholder &&
        !isMatchDeadlinePassed(m.matchDate) &&
        m.actual?.homeScore == null &&
        m.predictions?.[user?.uid]?.homeScore == null
      )
      .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))
      .slice(0, 9);
  }, [matches, user]);

  const selectedMatch = useMemo(
    () => matches.find((m) => m.matchKey === modalMatchKey) || null,
    [matches, modalMatchKey],
  );

  const submitPrediction = useCallback(async (matchKey, homeScore, awayScore) => {
    if (!firestore || !user) return;
    const ref = doc(firestore, 'worldCupPredictions', matchKey);
    await updateDoc(ref, {
      [`predictions.${user.uid}`]: { homeScore: Number(homeScore), awayScore: Number(awayScore) },
      updatedAt: serverTimestamp(),
    }).catch((err) => console.warn('Prediction save failed', err));
  }, [firestore, user]);

  const saveHeroPrediction = useCallback(async (matchKey, homeScore, awayScore) => {
    setSavingHero(matchKey);
    setHeroSaveError('');
    await submitPrediction(matchKey, homeScore, awayScore);
    setSavingHero(null);
    setHeroScores((prev) => {
      const next = { ...prev };
      delete next[matchKey];
      return next;
    });
  }, [submitPrediction]);

  useTickingInterval(() => {
    if (unpredictedMatches.length === 0) {
      setHeroCountdowns((prev) => (Object.keys(prev).length ? {} : prev));
      return;
    }
    const now = Date.now();
    const next = {};
    unpredictedMatches.forEach((m) => {
      const deadline = getMatchDeadline(m.matchDate);
      const remaining = deadline.getTime() - now;
      if (remaining <= 0) {
        next[m.matchKey] = 'Deadline passed';
      } else {
        const d = Math.floor(remaining / 86400000);
        const h = Math.floor((remaining % 86400000) / 3600000);
        const min = Math.floor((remaining % 3600000) / 60000);
        const s = Math.floor((remaining % 60000) / 1000);
        if (d > 0) next[m.matchKey] = `${d}d ${h}h ${min}m ${s}s`;
        else if (h > 0) next[m.matchKey] = `${h}h ${min}m ${s}s`;
        else next[m.matchKey] = `${min}m ${s}s`;
      }
    });
    setHeroCountdowns(next);
  }, 1000, unpredictedMatches.length > 0);

  if (!dbReady) {
    return <div className="my-predictions"><div className="my-predictions-empty">Loading...</div></div>;
  }

  const heroVenueInfo = nextActualMatch ? parseVenue(nextActualMatch.venue) : null;

  return (
    <>
    <div className="my-predictions">
      <div className="my-pred-mobile-tiles" role="tablist" aria-label="Mobile predictions tabs">
        <button
          type="button"
          role="tab"
          aria-selected={mobileView === 'outstanding'}
          className={`my-pred-mobile-tile ${mobileView === 'outstanding' ? 'is-active' : ''}`}
          onClick={() => setMobileView('outstanding')}
        >
          <span className="my-pred-mobile-tile-icon">{'\u26BD'}</span>
          <span className="my-pred-mobile-tile-count">{unpredictedTotal}</span>
          <span className="my-pred-mobile-tile-label">Outstanding</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileView === 'done'}
          className={`my-pred-mobile-tile ${mobileView === 'done' ? 'is-active' : ''}`}
          onClick={() => setMobileView('done')}
        >
          <span className="my-pred-mobile-tile-icon">{'\u2705'}</span>
          <span className="my-pred-mobile-tile-count">{predicted.length}</span>
          <span className="my-pred-mobile-tile-label">My Picks</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileView === 'wildcard'}
          className={`my-pred-mobile-tile ${mobileView === 'wildcard' ? 'is-active' : ''}`}
          onClick={() => setMobileView('wildcard')}
        >
          <span className="my-pred-mobile-tile-icon">{'\u26A1'}</span>
          <span className="my-pred-mobile-tile-count my-pred-mobile-tile-count--text">
            {hasWCRound ? (wildCardActivated ? 'USED' : 'AVAILABLE') : '\u2014'}
          </span>
          <span className="my-pred-mobile-tile-label">Wildcard</span>
        </button>
      </div>

      <div className="my-pred-mobile-list">
        {mobileView === 'outstanding' && (
          <div className="my-pred-mobile-outstanding">
            {unpredictedMatches.length === 0 ? (
              <div className="my-pred-mobile-empty">All caught up {'\u2014'} every group-stage match predicted. {'\uD83C\uDF89'}</div>
            ) : (
              unpredictedMatches.slice(0, 3).map((m) => (
                <MobilePredictRow key={m.matchKey} m={m} user={user} setModalMatchKey={setModalMatchKey} />
              ))
            )}
          </div>
        )}

        {mobileView === 'done' && (
          <div className="my-pred-mobile-done">
            {predicted.length === 0 ? (
              <div className="my-pred-mobile-empty">No predictions yet. Tap {'\u201C'}Predict Outstanding{'\u201D'} to start.</div>
            ) : (
              predicted.map((m) => (
                <MobilePredictRow key={m.matchKey} m={m} user={user} setModalMatchKey={setModalMatchKey} done />
              ))
            )}
          </div>
        )}

        {mobileView === 'wildcard' && (
          <div className="my-pred-mobile-wc">
            {!hasWCRound ? (
              <div className="my-pred-mobile-wc-status">Wild Card is only available during the current group-stage round.</div>
            ) : wildCardActivated ? (
              <>
                <div className="my-pred-mobile-wc-status">{'\u26A1'} Wild Card redeemed for {formatDateShort(wildCardActivated.day + 'T00:00:00Z')}. All predictions on that day get {'\u00D7'}{WILD_CARD_MULTIPLIER} points.</div>
                <button type="button" className="my-pred-wc-activate-btn" onClick={() => setShowWcFixtures(true)}>
                  {'\u26A1'} View redeemed fixtures
                </button>
              </>
            ) : (
              <>
                <div className="my-pred-mobile-wc-status">Pick a day. Every prediction on that day earns {'\u00D7'}{WILD_CARD_MULTIPLIER} the normal points.</div>
                <button type="button" className="my-pred-wc-info-btn" onClick={() => setShowWcInfo(true)}>
                  How scoring works
                </button>
                <button type="button" className="my-pred-wc-activate-btn" onClick={onOpenWildCard}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle', marginRight: 4 }}>
                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="#3ddc84" />
                  </svg> Activate Wild Card
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {unpredictedMatches.length > 0 && (
        <div className="my-pred-hero">
          <div className="my-pred-hero-title">{'\u26BD'} Quick Predict</div>
          <div className="my-pred-hero-grid">
            {unpredictedMatches.map((m) => {
              const scores = heroScores[m.matchKey] || { home: '0', away: '0' };
              const isSaving = savingHero === m.matchKey;
              const venueInfo = parseVenue(m.venue);
              return (
                <div key={m.matchKey} className="my-pred-hero-game">
                  <div className="my-pred-hero-game-row">
                    <div className="my-pred-hero-game-team">
                      <FlagImg team={m.homeTeam} size={24} />
                      <span className="my-pred-hero-game-name">{shortTeam(m.homeTeam)}</span>
                    </div>
                    <div className="my-pred-hero-game-score-wrap">
                      <input
                        type="number" min="0" max="20"
                        className="my-pred-hero-game-input"
                        value={scores.home}
                        onChange={(e) => setHeroScores((p) => ({ ...p, [m.matchKey]: { ...p[m.matchKey], home: e.target.value, away: p[m.matchKey]?.away ?? '0' } }))}
                        disabled={isSaving}
                      />
                      <span className="my-pred-hero-game-colon">:</span>
                      <input
                        type="number" min="0" max="20"
                        className="my-pred-hero-game-input"
                        value={scores.away}
                        onChange={(e) => setHeroScores((p) => ({ ...p, [m.matchKey]: { ...p[m.matchKey], home: p[m.matchKey]?.home ?? '0', away: e.target.value } }))}
                        disabled={isSaving}
                      />
                    </div>
                    <div className="my-pred-hero-game-team my-pred-hero-game-team--right">
                      <FlagImg team={m.awayTeam} size={24} />
                      <span className="my-pred-hero-game-name">{shortTeam(m.awayTeam)}</span>
                    </div>
                  </div>
                  <div className="my-pred-hero-game-footer">
                    <span className="my-pred-hero-game-venue">{'\uD83C\uDFDF\uFE0F'} {venueInfo?.stadium}, {venueInfo?.city}</span>
                    <span className="my-pred-hero-game-kickoff">{'\u26BD'} {formatMatchKickoff(m.matchDate)}</span>
                    <span className="my-pred-hero-game-deadline">{'\u23F0'} {heroCountdowns[m.matchKey] || '...'}</span>
                  </div>
                  <button type="button" className="my-pred-hero-game-confirm"
                    onClick={() => saveHeroPrediction(m.matchKey, scores.home, scores.away)}
                    disabled={isSaving}
                  >
                    {isSaving ? '\u23F3' : '\u2714'} Confirm
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="my-pred-top-row">
        <div className="my-pred-col">
          {hasWCRound && wildCardBanner ? (
            <div className="my-pred-wc-tile">
              <button type="button" className="my-pred-wc-info-btn" onClick={() => setShowWcInfo(true)}>
                What's this?
              </button>
              <button type="button" className="my-pred-wc-activate-btn" onClick={onOpenWildCard}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle', marginRight: 4 }}>
                  <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="#3ddc84" />
                </svg> Activate Now
              </button>
            </div>
          ) : hasWCRound && wildCardActivated ? (
            <div className="my-pred-wc-tile my-pred-wc-tile--activated">
              <button type="button" className="my-pred-wc-activate-btn" onClick={() => setShowWcFixtures(true)}>
                {'\u26A1'} Redeemed
              </button>
            </div>
          ) : (
            <div className="my-pred-wc-tile my-pred-wc-tile--hidden" />
          )}
        </div>

        <div className="my-pred-col">
          {nextActualMatch ? (
            <button type="button" className="my-pred-next-card" onClick={() => setModalMatchKey(nextActualMatch.matchKey)}>
              <div className="my-pred-next-badge">{'\u26BD'} NEXT MATCH</div>
              <div className="my-pred-next-teams">
                <FlagImg team={nextActualMatch.homeTeam} size={28} />
                <div className="my-pred-next-team">
                  <span className="my-pred-next-name">{nextActualMatch.homeTeam}</span>
                </div>
                <span className="my-pred-next-vs">vs</span>
                <div className="my-pred-next-team my-pred-next-team--away">
                  <span className="my-pred-next-name">{nextActualMatch.awayTeam}</span>
                </div>
                <FlagImg team={nextActualMatch.awayTeam} size={28} />
              </div>
              <div className="my-pred-next-venue">{'\uD83C\uDFDF\uFE0F'} {heroVenueInfo?.stadium}, {heroVenueInfo?.city}</div>
              <div className="my-pred-next-kickoff">{'\u26BD'} {formatMatchKickoff(nextActualMatch.matchDate)}</div>
              <div className="my-pred-next-countdown">{'\u23F0'} {heroCountdowns[nextActualMatch.matchKey] || '\u2014'}</div>
              <div className="my-pred-next-prediction">
                <span className="my-pred-next-pred-label">YOUR PREDICTION</span>
                {nextActualMatch.predictions?.[user.uid] ? (
                  <div className="my-pred-next-pred-score-row">
                    <FlagImg team={nextActualMatch.homeTeam} size={16} />
                    <span className="my-pred-next-pred-score">{nextActualMatch.predictions[user.uid].homeScore}</span>
                    <span className="my-pred-next-pred-colon">:</span>
                    <span className="my-pred-next-pred-score">{nextActualMatch.predictions[user.uid].awayScore}</span>
                    <FlagImg team={nextActualMatch.awayTeam} size={16} />
                  </div>
                ) : (
                  <span className="my-pred-next-pred-btn my-pred-next-pred-btn--primary">{'\u26A1'} Predict this match</span>
                )}
              </div>
            </button>
          ) : (
            <div className="my-pred-next-card my-pred-next-card--empty">
              <div className="my-pred-next-empty">{'\u2705'} All matches complete!</div>
            </div>
          )}
        </div>

        <div className="my-pred-col">
          {podiumPicks ? (
            <div className="my-pred-podium-card my-pred-podium-card--extended">
              <div className="my-pred-podium-header">
                <span className="my-pred-podium-title">{'\uD83C\uDFC6'} My Podium Picks</span>
                {podiumCountdown && <span className="my-pred-podium-lock">{'\uD83D\uDD12'} Locks {podiumCountdown}</span>}
              </div>
              <div className="my-pred-podium-rows">
                {[
                  { key: 'first', icon: '\uD83E\uDD47', team: podiumPicks.first, pts: PODIUM_POINTS.first },
                  { key: 'second', icon: '\uD83E\uDD48', team: podiumPicks.second, pts: PODIUM_POINTS.second },
                  { key: 'third', icon: '\uD83E\uDD49', team: podiumPicks.third, pts: PODIUM_POINTS.third },
                ].map((p) => (
                  <div key={p.key} className="my-pred-podium-row">
                    <span className="my-pred-podium-icon">{p.icon}</span>
                    <span className="my-pred-podium-team">{p.team || '\u2014'}</span>
                    <span className="my-pred-podium-pts">+{p.pts} pts</span>
                  </div>
                ))}
              </div>
              <div className="my-pred-podium-note">Picks are locked and cannot be changed.</div>
              {otherPodiumData.totalOthers > 0 && (
                <div className="my-pred-others-section">
                  <div className="my-pred-others-count">{'\uD83D\uDC65'} {otherPodiumData.totalOthers} other player{otherPodiumData.totalOthers === 1 ? '' : 's'} submitted picks</div>
                  <div className="my-pred-others-table">
                    <div className="my-pred-others-row my-pred-others-row--header">
                      <span className="my-pred-others-pos">{'\uD83E\uDD47'}</span>
                      <span className="my-pred-others-team">Most picked</span>
                      <span className="my-pred-others-count-col">Picks</span>
                    </div>
                    {otherPodiumData.topFirst.map(([team, count]) => (
                      <div key={team} className="my-pred-others-row">
                        <span className="my-pred-others-pos">1st</span>
                        <span className="my-pred-others-team">{team}</span>
                        <span className="my-pred-others-count-col">{count}</span>
                      </div>
                    ))}
                    {otherPodiumData.topSecond.slice(0, 1).map(([team, count]) => (
                      <div key={team} className="my-pred-others-row">
                        <span className="my-pred-others-pos">2nd</span>
                        <span className="my-pred-others-team">{team}</span>
                        <span className="my-pred-others-count-col">{count}</span>
                      </div>
                    ))}
                    {otherPodiumData.topThird.slice(0, 1).map(([team, count]) => (
                      <div key={team} className="my-pred-others-row">
                        <span className="my-pred-others-pos">3rd</span>
                        <span className="my-pred-others-team">{team}</span>
                        <span className="my-pred-others-count-col">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="my-pred-podium-card my-pred-podium-card--empty">
              <div className="my-pred-podium-empty">{'\uD83C\uDFC6'} Set your podium picks from the Dashboard</div>
            </div>
          )}
        </div>
      </div>

      {predicted.length === 0 ? (
        <div className="my-predictions-empty">You haven't made any predictions yet.</div>
      ) : (
        <>
          <h2 className="my-predictions-heading">My Predictions</h2>

          <div className="wc-filter-row" style={{ marginBottom: 12 }}>
            <div className="wc-filter-pills">
              {[
                { value: 'round1', label: 'Round 1' },
                { value: 'round2', label: 'Round 2' },
                { value: 'round3', label: 'Round 3' },
                { value: 'all', label: 'All Fixtures' },
              ].map((f) => (
                <button key={f.value} type="button" className={`wc-filter-btn ${predFilter === f.value ? 'is-active' : ''}`} onClick={() => setPredFilter(f.value)}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {[0, 1, 2].map((roundIdx) => {
            if (predFilter !== 'all' && predFilter !== `round${roundIdx + 1}`) return null;
            const dayMatches = groupPredicted.filter((m) => isDateInRound(getLocalDateStr(m.matchDate), roundIdx));
            if (dayMatches.length === 0) return null;

            const byDate = {};
            dayMatches.forEach((m) => {
              const d = getLocalDateStr(m.matchDate);
              if (!byDate[d]) byDate[d] = [];
              byDate[d].push(m);
            });
            const sortedDates = Object.keys(byDate).sort();

            return (
              <div key={roundIdx} className="wc-round-section">
                <div className="wc-round-title">Round {roundIdx + 1}</div>
                <div className="my-pred-date-grid">
                  {sortedDates.map((dateKey) => (
                    <div key={dateKey} className={`my-pred-date-col${wildCardActivated?.day === dateKey ? ' my-pred-date-col--wc' : ''}`}>
                      <div className="my-pred-date-col-header">
                        {formatDateMonthDay(dateKey + 'T00:00:00Z')}
                      </div>
                      {byDate[dateKey].map((m) => {
                        const pred = m.predictions?.[user.uid];
                        const venueInfo = parseVenue(m.venue);
                        return (
                          <div key={m.matchKey} className="my-pred-tiny-tile" role="button" tabIndex={0} onClick={() => setModalMatchKey(m.matchKey)} onKeyDown={(e) => e.key === 'Enter' && setModalMatchKey(m.matchKey)}>
                            <div className="my-pred-tiny-row">
                              <FlagImg team={m.homeTeam} size={14} />
                              <span className="my-pred-tiny-name">{shortTeam(m.homeTeam)}</span>
                              <span className="my-pred-tiny-score">{pred ? pred.homeScore : '-'}</span>
                              <span className="my-pred-tiny-vs">VS</span>
                              <span className="my-pred-tiny-score">{pred ? pred.awayScore : '-'}</span>
                              <span className="my-pred-tiny-name">{shortTeam(m.awayTeam)}</span>
                              <FlagImg team={m.awayTeam} size={14} />
                            </div>
                            <div className="my-pred-tiny-meta">
                              <span className="my-pred-tiny-venue">{'\uD83D\uDCCD'} {venueInfo?.stadium}, {venueInfo?.city}</span>
                              <span className="my-pred-tiny-kickoff">{'\u23F0'} {formatMatchKickoff(m.matchDate)}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {predFilter === 'all' && knockoutPredicted.length > 0 && (
            <div className="wc-knockout-section">
              <h3 className="wc-section-title">{'\uD83C\uDFC6'} Knockout Stage</h3>
              {['roundOf32', 'roundOf16', 'quarterFinal', 'semiFinal', 'thirdPlace', 'final'].map((stage) => {
                const stageMatches = knockoutPredicted.filter((m) => m.stage === stage);
                if (stageMatches.length === 0) return null;
                return (
                  <div key={stage} className="wc-stage-group">
                    <h4 className="wc-stage-title">{STAGE_LABELS[stage]}</h4>
                    <div className="wc-stage-matches">
                      {stageMatches.map((m) => {
                        const actual = m.actual;
                        return (
                          <div key={m.matchKey} className="wc-match-row" role="button" tabIndex={0} onClick={() => setModalMatchKey(m.matchKey)} onKeyDown={(e) => e.key === 'Enter' && setModalMatchKey(m.matchKey)}>
                                <span className="wc-match-status">{matchStatusIcon(m)}</span>
                                <span className="wc-match-teams">
                                  <span className="wc-match-teams-home">
                                    <FlagImg team={m.homeTeam} />
                                    <span className="wc-team-name">{shortTeam(m.homeTeam)}</span>
                                  </span>
                                  {actual?.homeScore != null && (
                                    <span className="wc-inline-score wc-inline-score--actual">
                                      {actual.homeScore} {'\u2013'} {actual.awayScore}
                                    </span>
                                  )}
                                  <span className="wc-match-teams-away">
                                    <span className="wc-team-name">{shortTeam(m.awayTeam)}</span>
                                    <FlagImg team={m.awayTeam} />
                                  </span>
                                </span>
                                <span className="wc-match-points">
                                  {actual?.homeScore != null && m.points?.[user.uid] != null && (
                                    <span className="my-pred-pts">+{m.points[user.uid]}</span>
                                  )}
                                </span>
                                <span className="wc-match-date">{formatMatchKickoff(m.matchDate)}</span>
                                </div>
                          );
                        })}
                      </div>
                    </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {selectedMatch && createPortal(
        <div className="modal-backdrop" role="presentation" onClick={() => setModalMatchKey(null)}>
          <div className="panel modal-panel wc-modal" role="dialog" aria-modal="true" aria-label="Match details" onClick={(e) => e.stopPropagation()}>
            <MatchDetailModal
              match={selectedMatch}
              user={user}
              userDoc={userDoc}
              firestore={firestore}
              isAdmin={false}
              matches={matches}
              sortedUserUids={[]}
              getDisplayName={() => ''}
              getUserColor={() => ''}
              onSubmitPrediction={submitPrediction}
              onSubmitActual={() => {}}
              onUpdateTeams={() => {}}
              onClose={() => setModalMatchKey(null)}
            />
          </div>
        </div>,
        document.body
      )}

      {showWcFixtures && wildCardActivated && createPortal(
        <div className="modal-backdrop" role="presentation" onClick={() => setShowWcFixtures(false)}>
          <div className="panel modal-panel wc-info-panel" role="dialog" aria-modal="true" aria-label="Wild Card fixtures" onClick={(e) => e.stopPropagation()}>
            <div className="podium-modal-header">
              <h2 className="podium-modal-title">{'\u26A1'} Wild Card &mdash; {formatDateShort(wildCardActivated.day + 'T00:00:00Z')}</h2>
              <button type="button" className="podium-modal-close" onClick={() => setShowWcFixtures(false)}>{'\u2715'}</button>
            </div>
            <div className="wc-fixtures-body">
              {WORLD_CUP_2026_MATCHES.filter((m) => m.matchDate.startsWith(wildCardActivated.day)).map((m) => (
                <div key={m.matchKey} className="wc-match-row wc-match-row--wc-highlight" role="button" tabIndex={0} onClick={() => { setShowWcFixtures(false); setModalMatchKey(m.matchKey); }} onKeyDown={(e) => { if (e.key === 'Enter') { setShowWcFixtures(false); setModalMatchKey(m.matchKey); } }}>
                  <span className="wc-match-status">{'\u26A1'}</span>
                  <span className="wc-match-teams">
                    <span className="wc-match-teams-home">
                      <FlagImg team={m.homeTeam} />
                      <span className="wc-team-name">{shortTeam(m.homeTeam)}</span>
                    </span>
                    <span className="wc-match-teams-away">
                      <span className="wc-team-name">{shortTeam(m.awayTeam)}</span>
                      <FlagImg team={m.awayTeam} />
                    </span>
                  </span>
                  <span className="wc-match-date">{formatMatchKickoff(m.matchDate)}</span>
                  </div>
                ))}
              </div>
              <div className="podium-footer">
                <button type="button" className="podium-skip-btn" onClick={() => setShowWcFixtures(false)}>Close</button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {showWcInfo && createPortal(
        <div className="modal-backdrop" role="presentation" onClick={() => setShowWcInfo(false)}>
          <div className="panel modal-panel wc-info-panel" role="dialog" aria-modal="true" aria-label="Wild Card info" onClick={(e) => e.stopPropagation()}>
            <div className="podium-modal-header">
              <h2 className="podium-modal-title">{'\u26A1'} Wild Card &mdash; &times;{WILD_CARD_MULTIPLIER} Points</h2>
              <button type="button" className="podium-modal-close" onClick={() => setShowWcInfo(false)}>{'\u2715'}</button>
            </div>
            <div className="wc-info-body">
              <p className="wc-info-p">
                Choose <strong>one day</strong> in the current round. Every match you predict on that day earns <strong>&times;{WILD_CARD_MULTIPLIER}</strong> the normal points!
              </p>
              <p className="wc-info-p">
                <strong>Normal scoring (before multiplier):</strong>
              </p>
              <ul className="wc-info-list">
                <li>Exact score &rarr; <strong>5 pts</strong> + <strong>1 pt</strong> per goal scored in the match</li>
                <li>0-0 draw &rarr; <strong>6 pts</strong> (5 + 1 for nil-nil)</li>
                <li>Correct outcome (not exact) &rarr; <strong>2 pts</strong></li>
                <li>Wrong &rarr; <strong>0 pts</strong></li>
              </ul>
              <p className="wc-info-p">
                On your Wild Card day, <strong>all</strong> of these are multiplied by <strong>&times;{WILD_CARD_MULTIPLIER}</strong>.
                Pick the day with the fixtures you're most confident about!
              </p>
            </div>
            <div className="podium-footer">
              <button type="button" className="podium-skip-btn" onClick={() => setShowWcInfo(false)}>Got it</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
    </>
  );
}

function MobilePredictRow({ m, user, setModalMatchKey, done }) {
  const pred = m.predictions?.[user?.uid];
  const venue = parseVenue(m.venue);
  return (
    <div
      className="my-pred-mobile-row"
      role="button"
      tabIndex={0}
      onClick={() => setModalMatchKey(m.matchKey)}
      onKeyDown={(e) => e.key === 'Enter' && setModalMatchKey(m.matchKey)}
    >
      <div className="my-pred-mobile-row-flags">
        <FlagImg team={m.homeTeam} size={20} />
        <span className="my-pred-mobile-row-vs">vs</span>
        <FlagImg team={m.awayTeam} size={20} />
      </div>
      <div className="my-pred-mobile-row-teams">
        <span>{shortTeam(m.homeTeam)}</span>
        <span className="my-pred-mobile-row-score">
          {done && pred ? `${pred.homeScore} \u2013 ${pred.awayScore}` : '\u2014 : \u2014'}
        </span>
        <span>{shortTeam(m.awayTeam)}</span>
      </div>
      <div className="my-pred-mobile-row-meta">
        <span>{'\u23F0'} {formatMatchKickoff(m.matchDate)}</span>
        {venue?.stadium && <span>{'\uD83D\uDCCD'} {venue.stadium}</span>}
      </div>
    </div>
  );
}
