import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

const WELCOME_TEXT = 'Let me show you around the app. This will only take a moment.';

const TOUR_STEPS = [
  {
    id: 'open-hamburger',
    body: 'Tap the menu icon in the top right to get started.',
    highlight: '.hamburger-btn',
    auto: 'hamburger',
    showFinger: true,
  },
  {
    id: 'tap-profile',
    body: 'Now tap your Profile.',
    highlight: '.hamburger-drawer .sidebar-link[data-nav="profile"]',
    auto: 'route',
    autoTarget: '/profile',
  },
  {
    id: 'display-name',
    body: 'Tap here to change your display name.',
    highlight: '.profile-name-display',
    nav: '/profile',
  },
  {
    id: 'podium-picks',
    body: 'Select your winner, second place, and third place, then hit Submit.',
    highlight: '.dash-podium-mini, .dash-podium-mini--empty',
    nav: '/profile',
    podium: true,
  },
  {
    id: 'dashboard-next',
    body: 'Now let\'s look at the dashboard. This is your next match and prediction.',
    highlight: '.dash-next-match',
    nav: '/',
  },
  {
    id: 'dashboard-leagues',
    body: 'Your leagues. Click a name or any player to see their stats.',
    highlight: '.dash-league-tile',
    nav: '/',
  },
  {
    id: 'dashboard-points',
    body: 'Track your score. Use the dropdown to see other players.',
    highlight: '.dash-points-tile',
    nav: '/',
  },
  {
    id: 'open-hamburger-predictions',
    body: 'Open the menu again.',
    highlight: '.hamburger-btn',
    auto: 'hamburger',
  },
  {
    id: 'tap-predictions',
    body: 'Now tap My Predictions.',
    highlight: '.hamburger-drawer .sidebar-link[data-nav="my-predictions"]',
    auto: 'route',
    autoTarget: '/my-predictions',
  },
  {
    id: 'my-predictions',
    body: 'Here you can see outstanding picks, games done, and your wild card.',
    highlight: '.my-pred-mobile-tiles, .my-pred-top-row',
    nav: '/my-predictions',
  },
  {
    id: 'predict-game',
    body: 'Tap on any game below to enter your score prediction and save it.',
    highlight: '.my-pred-mobile-row, .my-pred-hero-game',
    nav: '/my-predictions',
  },
  {
    id: 'open-hamburger-leaderboard',
    body: 'Open the menu.',
    highlight: '.hamburger-btn',
    auto: 'hamburger',
  },
  {
    id: 'tap-leaderboard',
    body: 'Tap the Leaderboard.',
    highlight: '.hamburger-drawer .sidebar-link[data-nav="leaderboard"]',
    auto: 'route',
    autoTarget: '/leaderboard',
  },
  {
    id: 'leaderboard',
    body: 'See the global leaderboard and the leagues you\'re a member of.',
    highlight: '.lb-tiles',
    nav: '/leaderboard',
  },
  {
    id: 'open-hamburger-leagues',
    body: 'Open the menu.',
    highlight: '.hamburger-btn',
    auto: 'hamburger',
  },
  {
    id: 'tap-leagues',
    body: 'Tap Leagues.',
    highlight: '.hamburger-drawer .sidebar-link[data-nav="leagues"]',
    auto: 'route',
    autoTarget: '/leagues',
  },
  {
    id: 'leagues',
    body: 'Your leagues appear here.',
    highlight: '.league-my-list, .league-tab-pills',
    nav: '/leagues',
  },
  {
    id: 'leagues-create-join',
    body: 'Tap Create or Join to see your options.',
    highlight: '.league-tab-pill:nth-child(2)',
  },
  {
    id: 'leagues-free',
    body: 'Create a Free League to play with friends for bragging rights.',
    highlight: '.league-mega-tile--free',
  },
  {
    id: 'leagues-paid',
    body: 'Or create a Contribution League with a reward pot.',
    highlight: '.league-mega-tile--paid',
  },
  {
    id: 'open-hamburger-rules',
    body: 'Open the menu.',
    highlight: '.hamburger-btn',
    auto: 'hamburger',
  },
  {
    id: 'tap-rules',
    body: 'Tap Rules to see how scoring works.',
    highlight: '.hamburger-drawer .sidebar-link[data-nav="rules"]',
    auto: 'route',
    autoTarget: '/rules',
  },
  {
    id: 'rules-match',
    body: 'Match Predictions: exact score earns the most, correct outcome earns less, wrong earns nothing.',
    highlight: '.rules-hero-card--match',
    nav: '/rules',
  },
  {
    id: 'rules-podium',
    body: 'Podium Prediction: pick the winner, runner-up, and third place before the group stage ends.',
    highlight: '.rules-hero-card--podium',
    nav: '/rules',
  },
  {
    id: 'rules-wildcard',
    body: 'Wild Card: pick one matchday per round and all points on that day are multiplied!',
    highlight: '.rules-hero-card--wildcard',
    nav: '/rules',
  },
  {
    id: 'open-hamburger-wc',
    body: 'Open the menu one last time.',
    highlight: '.hamburger-btn',
    auto: 'hamburger',
  },
  {
    id: 'tap-predictions-wc',
    body: 'Tap My Predictions.',
    highlight: '.hamburger-drawer .sidebar-link[data-nav="my-predictions"]',
    auto: 'route',
    autoTarget: '/my-predictions',
  },
  {
    id: 'wildcard-tile',
    body: 'This is your Wild Card. Tap it to see how it works!',
    highlight: '.my-pred-mobile-tiles button:nth-child(3)',
    nav: '/my-predictions',
  },
  {
    id: 'wildcard-info',
    body: 'Wild Card: pick one matchday per round and all points on that day are multiplied! That\'s it \u2014 you\'re ready to go!',
    highlight: '.my-pred-mobile-wc',
    nav: '/my-predictions',
  },
];

function findRect(selector) {
  if (!selector) return null;
  const parts = selector.split(',').map((s) => s.trim());
  let best = null;
  for (const part of parts) {
    const el = document.querySelector(part);
    if (el) {
      const r = el.getBoundingClientRect();
      if (!best || r.width > 0) best = r;
    }
  }
  return best;
}

export default function OnboardingTour({ user, firestore, userDoc, onComplete, onOpenPodium, podiumSavedTrigger }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('welcome');
  const [step, setStep] = useState(0);
  const [highlightRect, setHighlightRect] = useState(null);
  const [dontShow, setDontShow] = useState(false);
  const [waitingForPodium, setWaitingForPodium] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const typeRef = useRef(null);
  const advancingRef = useRef(false);

  const current = TOUR_STEPS[step];
  const isLast = step === TOUR_STEPS.length - 1;
  const hasPodiumPicks = !!(userDoc?.podiumPrediction?.first);

  const saveDoc = useCallback(async (data) => {
    if (firestore && user) {
      await setDoc(doc(firestore, 'users', user.uid), data, { merge: true }).catch(() => {});
    }
  }, [firestore, user]);

  const advance = useCallback((nextStep) => {
    if (advancingRef.current) return;
    advancingRef.current = true;
    setTimeout(() => { advancingRef.current = false; }, 600);
    setStep(nextStep);
    saveDoc({ tourStep: nextStep });
  }, [saveDoc]);

  useEffect(() => {
    if (phase !== 'welcome') return;
    setTypedText('');
    setTypingDone(false);
    let i = 0;
    typeRef.current = setInterval(() => {
      i++;
      setTypedText(WELCOME_TEXT.slice(0, i));
      if (i >= WELCOME_TEXT.length) {
        clearInterval(typeRef.current);
        setTypingDone(true);
      }
    }, 30);
    return () => clearInterval(typeRef.current);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'tour') return;
    let tries = 0;
    const poll = () => {
      const rect = findRect(current.highlight);
      setHighlightRect(rect);
      if (rect) {
        const pad = 100;
        const top = rect.top + window.scrollY;
        const bot = rect.bottom + window.scrollY;
        if (top < window.scrollY + pad) {
          window.scrollTo({ top: top - pad, behavior: 'smooth' });
        } else if (bot > window.scrollY + window.innerHeight - pad) {
          window.scrollTo({ top: bot - window.innerHeight + pad, behavior: 'smooth' });
        }
        const drawer = document.querySelector('.hamburger-drawer');
        if (drawer) {
          if (rect.top < 0) {
            drawer.scrollBy({ top: rect.top - 40, behavior: 'smooth' });
          } else if (rect.bottom > drawer.clientHeight) {
            drawer.scrollBy({ top: rect.bottom - drawer.clientHeight + 40, behavior: 'smooth' });
          }
        }
      } else if (tries < 15) {
        tries++;
        setTimeout(poll, 200);
      }
    };
    poll();
    window.addEventListener('resize', poll);
    return () => window.removeEventListener('resize', poll);
  }, [phase, step, current.highlight]);

  useEffect(() => {
    if (phase !== 'tour' || !current.highlight) return;
    let tries = 0;
    const iv = setInterval(() => {
      const parts = current.highlight.split(',').map((s) => s.trim());
      const els = parts.map((s) => document.querySelector(s)).filter(Boolean);
      if (els.length > 0 || tries > 10) {
        clearInterval(iv);
        els.forEach((el) => el.classList.add('tour-highlight-pulse'));
      }
      tries++;
    }, 200);
    return () => {
      clearInterval(iv);
      const parts = current.highlight.split(',').map((s) => s.trim());
      parts.forEach((s) => {
        const el = document.querySelector(s);
        if (el) el.classList.remove('tour-highlight-pulse');
      });
    };
  }, [phase, step, current.highlight]);

  useEffect(() => {
    if (phase !== 'tour' || current.nav == null) return;
    if (window.location.pathname !== current.nav) {
      navigate(current.nav);
    }
  }, [phase, step, current.nav, navigate]);

  useEffect(() => {
    if (phase !== 'tour' || current.id !== 'podium-picks' || hasPodiumPicks || waitingForPodium) return;
    setWaitingForPodium(true);
    setTimeout(() => onOpenPodium?.(), 300);
  }, [phase, current.id, hasPodiumPicks, waitingForPodium, onOpenPodium]);

  useEffect(() => {
    if (!waitingForPodium || podiumSavedTrigger <= 0) return;
    setWaitingForPodium(false);
    navigate('/');
    setTimeout(() => {
      setStep((s) => s + 1);
    }, 400);
  }, [podiumSavedTrigger, waitingForPodium, navigate]);

  useEffect(() => {
    if (phase !== 'tour' || !current.auto) return;
    if (current.auto === 'hamburger') {
      let finished = false;
      const observer = new MutationObserver(() => {
        if (finished) return;
        const drawer = document.querySelector('.hamburger-drawer');
        if (drawer) {
          finished = true;
          advance(step + 1);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      return () => {
        finished = true;
        observer.disconnect();
      };
    }
    if (current.auto === 'route') {
      let finished = false;
      const check = () => {
        if (finished) return;
        if (window.location.pathname === current.autoTarget) {
          finished = true;
          advance(step + 1);
        } else {
          setTimeout(check, 150);
        }
      };
      check();
      return () => { finished = true; };
    }
  }, [phase, step, current.auto, current.autoTarget, advance]);

  const startTour = useCallback(() => {
    navigate('/');
    setTimeout(() => {
      setPhase('tour');
      setStep(0);
      saveDoc({ tourStep: 0, tourDismissed: false });
    }, 500);
  }, [navigate, saveDoc]);

  const resumeTour = useCallback(() => {
    const s = userDoc?.tourStep || 0;
    setStep(s);
    navigate('/');
    setTimeout(() => {
      setPhase('tour');
      saveDoc({ tourStep: s, tourDismissed: false });
    }, 500);
  }, [userDoc, navigate, saveDoc]);

  const goNext = useCallback(async () => {
    if (isLast) {
      setPhase('complete');
      return;
    }
    if (current.podium && !hasPodiumPicks) {
      setWaitingForPodium(true);
      setTimeout(() => onOpenPodium?.(), 300);
      return;
    }
    const next = step + 1;
    const nextStep = TOUR_STEPS[next];
    if (nextStep.nav && window.location.pathname !== nextStep.nav) {
      navigate(nextStep.nav);
    }
    setTimeout(() => {
      advance(next);
    }, nextStep.nav ? 300 : 50);
  }, [isLast, dontShow, current, step, hasPodiumPicks, saveDoc, onComplete, onOpenPodium, navigate, advance]);

  const goBack = useCallback(() => {
    if (step <= 0) return;
    const prev = step - 1;
    const prevStep = TOUR_STEPS[prev];
    if (prevStep.nav && window.location.pathname !== prevStep.nav) {
      navigate(prevStep.nav);
    }
    setTimeout(() => {
      advance(prev);
    }, prevStep.nav ? 300 : 50);
  }, [step, navigate, advance]);

  const finishLater = useCallback(async () => {
    await saveDoc({ tourStep: step });
    onComplete();
  }, [step, saveDoc, onComplete]);

  const skipAll = useCallback(async () => {
    if (dontShow) await saveDoc({ tourDismissed: true, tourStep: null });
    else await saveDoc({ tourStep: null });
    onComplete();
  }, [dontShow, saveDoc, onComplete]);

  const savedStep = userDoc?.tourStep;
  const hasSavedProgress = savedStep != null && savedStep > 0;

  if (phase === 'welcome') {
    return createPortal(
      <div className="tour-backdrop tour-backdrop--modal">
        <div className="tour-welcome">
          <img className="tour-welcome-avatar" src="/JayAvatar.png" alt="Tour Guide" width={140} height={140} />
          <div className="tour-welcome-bubble">
            <h2 className="tour-welcome-title">Welcome to FWC26 Predictor!</h2>
            <p className="tour-welcome-body">
              {typedText}
              <span className={`tour-cursor ${typingDone ? 'tour-cursor--done' : ''}`}>|</span>
            </p>
            {typingDone && (
              <div className="tour-welcome-actions">
                {hasSavedProgress && (
                  <button type="button" className="tour-bar-btn tour-bar-btn--next" onClick={resumeTour}>
                    Resume Tour
                  </button>
                )}
                <button type="button" className="tour-bar-btn tour-bar-btn--next" onClick={startTour}>
                  Start Tour
                </button>
                <button type="button" className="tour-bar-skip" onClick={skipAll}>
                  Skip
                </button>
              </div>
            )}
          </div>
        </div>
      </div>,
      document.body
    );
  }

  if (phase === 'complete') {
    return createPortal(
      <div className="tour-backdrop tour-backdrop--modal">
        <div className="tour-welcome">
          <img className="tour-welcome-avatar" src="/JayAvatar.png" alt="Tour Guide" width={140} height={140} />
          <div className="tour-welcome-bubble">
            <h2 className="tour-welcome-title">You're All Set!</h2>
            <p className="tour-welcome-body">
              You know where everything is. Go make some predictions and have a great World Cup! I'm in the top left corner if you need me or want to go over this tour again.
            </p>
            <label className="tour-complete-dontshow">
              <input
                type="checkbox"
                checked={dontShow}
                onChange={(e) => setDontShow(e.target.checked)}
              />
              <span>Don't show again</span>
            </label>
            <div className="tour-welcome-actions">
              <button type="button" className="tour-bar-btn tour-bar-btn--next" onClick={async () => {
                if (dontShow) await saveDoc({ tourDismissed: true, tourStep: null });
                else await saveDoc({ tourStep: null });
                onComplete();
              }}>
                Done
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  const GAP = 12;
  const spotStyle = highlightRect
    ? { top: highlightRect.top - GAP, left: highlightRect.left - GAP, width: highlightRect.width + GAP * 2, height: highlightRect.height + GAP * 2 }
    : { display: 'none' };

  return createPortal(
    <div className="tour-backdrop">
      {highlightRect && !waitingForPodium && (
        <div className="tour-spotlight" style={spotStyle} />
      )}

      <div className="tour-bar">
        <div className="tour-bar-row">
          <img className="tour-bar-avatar" src="/JayAvatar.png" alt="Tour Guide" width={32} height={32} />
          <div className="tour-bar-actions">
            {step > 0 && !waitingForPodium && (
              <button type="button" className="tour-bar-btn tour-bar-btn--back" onClick={goBack}>
                Back
              </button>
            )}
            {!waitingForPodium && (
              <button type="button" className="tour-bar-btn tour-bar-btn--next" onClick={goNext}>
                {isLast ? 'Done' : 'Next'}
              </button>
            )}
            {!waitingForPodium && (
              <button type="button" className="tour-bar-btn tour-bar-btn--finish-later" onClick={finishLater}>
                Finish Later
              </button>
            )}
            <button type="button" className="tour-bar-skip" onClick={skipAll}>
              Skip
            </button>
          </div>
        </div>
        <span className="tour-bar-text">{waitingForPodium ? 'Make your picks and tap Submit, then I\'ll continue.' : current.body}</span>
      </div>

      {current.showFinger && (
        <div className="tour-finger" aria-hidden="true">
          <span className="tour-finger-icon">{'\uD83D\uDC46'}</span>
        </div>
      )}
    </div>,
    document.body
  );
}
