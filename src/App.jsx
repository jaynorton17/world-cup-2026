import { useState, useEffect, useCallback, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, doc, getDoc, onSnapshot, query, where, getDocs, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { firebaseAuth, firestore, firebaseIsConfigured } from './lib/firebase.js';
import AuthPage from './components/AuthPage.jsx';
import Navigation from './components/Navigation.jsx';
import Dashboard from './components/Dashboard.jsx';
import WorldCupPanel from './components/WorldCupPanel.jsx';
import TeamsHub from './components/TeamsHub.jsx';
import TeamDetail from './components/TeamDetail.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import GroupStandings from './components/GroupStandings.jsx';
import LeaguesList from './components/LeaguesList.jsx';
import LeagueDetail from './components/LeagueDetail.jsx';
import Rules from './components/Rules.jsx';
import MyPredictions from './components/MyPredictions.jsx';
import MyProfile from './components/MyProfile.jsx';
import PodiumPredictionModal from './components/PodiumPredictionModal.jsx';
import WildCardModal from './components/WildCardModal.jsx';
import StakesAcknowledgmentModal from './components/StakesAcknowledgmentModal.jsx';
import { PODIUM_LOCK_DATE, GROUP_STAGE_END_DATE, getCurrentRound } from './utils/worldCupData.js';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState(null);
  const [userDocReady, setUserDocReady] = useState(false);
  const [showPodiumModal, setShowPodiumModal] = useState(false);
  const [showWildCardModal, setShowWildCardModal] = useState(false);
  const [pendingJoinCode, setPendingJoinCode] = useState(null);
  const [joinNotification, setJoinNotification] = useState('');
  const [pendingStakesAckLeague, setPendingStakesAckLeague] = useState(null);
  const podiumHandled = useRef(false);
  const podiumDismissedAt = useRef(0);
  const wildCardDismissed = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const join = params.get('join');
    if (join) setPendingJoinCode(join);
  }, []);

  useEffect(() => {
    if (!firebaseAuth) { setLoading(false); return; }
    const unsub = onAuthStateChanged(firebaseAuth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!pendingJoinCode || !user || !firestore) return;
    const processJoin = async () => {
      const q = query(collection(firestore, 'leagues'), where('joinCode', '==', pendingJoinCode));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const leagueId = snap.docs[0].id;
        const leagueData = snap.docs[0].data();
        const leagueName = leagueData.name;
        if (leagueData.joinDeadline && new Date(leagueData.joinDeadline).getTime() < Date.now()) {
          setJoinNotification('This league\'s entry period has closed');
          setPendingJoinCode(null);
          window.history.replaceState({}, '', window.location.pathname);
          setTimeout(() => setJoinNotification(''), 5000);
          return;
        }
        await updateDoc(doc(firestore, 'users', user.uid), {
          leagueIds: arrayUnion(leagueId),
        });
        setJoinNotification(`Joined league: ${leagueName}`);
        if (leagueData.type === 'paid') {
          const userSnap = await getDoc(doc(firestore, 'users', user.uid));
          const userData = userSnap.data();
          if (!userData?.stakesAcknowledged?.[leagueId]) {
            setPendingStakesAckLeague({
              id: leagueId,
              name: leagueData.name,
              stake: leagueData.stake || 0,
              hostFeePercent: leagueData.hostFeePercent || 0,
              prizeSplits: leagueData.prizeSplits || [],
            });
          }
        }
      } else {
        setJoinNotification('Invalid or expired join code');
      }
      setPendingJoinCode(null);
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => setJoinNotification(''), 5000);
    };
    processJoin();
  }, [pendingJoinCode, user, firestore]);

  useEffect(() => {
    if (!firestore || !user) {
      setUserDoc(null);
      setUserDocReady(false);
      setShowPodiumModal(false);
      setShowWildCardModal(false);
      return;
    }
    const unsub = onSnapshot(doc(firestore, 'users', user.uid), (snap) => {
      const data = snap.data() || {};
      setUserDoc(data);
      setUserDocReady(true);
      const prediction = data.podiumPrediction;
      const podiumLocked = Date.now() >= new Date(PODIUM_LOCK_DATE).getTime();
      const groupStageOver = Date.now() >= new Date(GROUP_STAGE_END_DATE).getTime();
      if (!prediction?.initial && !podiumLocked && !prediction?.dismissedAt) {
        if (Date.now() - podiumDismissedAt.current > 3000) setShowPodiumModal(true);
      } else if (groupStageOver && !prediction?.final) {
        if (Date.now() - podiumDismissedAt.current > 3000) setShowPodiumModal(true);
      }
      const round = getCurrentRound();
      const wildCardKey = round ? 'round' + round.round : null;
      const activated = wildCardKey && data.wildCards?.[wildCardKey];
      const wcDismissed = wildCardDismissed.current || sessionStorage.getItem('wc_dismissed') === wildCardKey;
      if (round && !activated && !wcDismissed) {
        setShowWildCardModal(true);
      }
    });
    return unsub;
  }, [firestore, user]);

  const handleAuth = (u) => setUser(u);

  const handleLogout = async () => {
    if (!firebaseAuth) return;
    await signOut(firebaseAuth);
    setUser(null);
  };

  const handlePodiumSave = useCallback(() => {
    podiumHandled.current = true;
    podiumDismissedAt.current = Date.now();
    setShowPodiumModal(false);
  }, []);

  const handlePodiumDismiss = useCallback(() => {
    podiumHandled.current = true;
    podiumDismissedAt.current = Date.now();
    setShowPodiumModal(false);
    if (firestore && user && userDoc?.podiumPrediction?.dismissedAt == null) {
      updateDoc(doc(firestore, 'users', user.uid), {
        'podiumPrediction.dismissedAt': serverTimestamp(),
      }).catch(() => {});
    }
  }, [firestore, user, userDoc]);

  if (loading) {
    return (
      <div className="auth-screen">
        <div className="panel auth-card">
          <p style={{ textAlign: 'center', color: '#8aa0c0' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!firebaseIsConfigured) {
    return (
      <div className="auth-screen">
        <div className="panel auth-card">
          <h1>FWC26 Predictor</h1>
          <p style={{ marginTop: 12, color: '#ff6060', textAlign: 'center' }}>
            Firebase is not configured.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage firebaseAuth={firebaseAuth} firestore={firestore} onAuth={handleAuth} />;
  }

  if (!userDocReady) {
    return (
      <div className="auth-screen">
        <div className="panel auth-card">
          <p style={{ textAlign: 'center', color: '#8aa0c0' }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  const groupStageOver = Date.now() >= new Date(GROUP_STAGE_END_DATE).getTime();
  const existingPrediction = userDoc?.podiumPrediction || null;

  return (
    <div className="app app--with-sidebar">
      <Navigation onLogout={handleLogout} user={user} />
      {joinNotification && <div className="join-notification">{joinNotification}</div>}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard user={user} firestore={firestore} onOpenPodium={() => setShowPodiumModal(true)} />} />
          <Route path="/matches" element={<WorldCupPanel user={user} firestore={firestore} userDoc={userDoc} />} />
          <Route path="/my-predictions" element={<MyPredictions user={user} firestore={firestore} userDoc={userDoc} onOpenWildCard={() => { sessionStorage.removeItem('wc_dismissed'); setShowWildCardModal(true); }} />} />
          <Route path="/teams" element={<TeamsHub />} />
          <Route path="/teams/:teamName" element={<TeamDetail firestore={firestore} />} />
          <Route path="/leaderboard" element={<Leaderboard user={user} firestore={firestore} />} />
          <Route path="/groups" element={<GroupStandings firestore={firestore} />} />
          <Route path="/leagues" element={<LeaguesList user={user} firestore={firestore} />} />
          <Route path="/leagues/:leagueId" element={<LeagueDetail user={user} firestore={firestore} />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/profile" element={<MyProfile user={user} firestore={firestore} userDoc={userDoc} onOpenPodium={() => setShowPodiumModal(true)} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {showPodiumModal && (
        <PodiumPredictionModal
          user={user}
          firestore={firestore}
          userDoc={userDoc}
          existingPrediction={existingPrediction}
          groupStageOver={groupStageOver}
          onSave={handlePodiumSave}
          onDismiss={handlePodiumDismiss}
        />
      )}
      {showWildCardModal && (
        <WildCardModal
          user={user}
          firestore={firestore}
          onClose={() => { wildCardDismissed.current = true; sessionStorage.setItem('wc_dismissed', getCurrentRound() ? 'round' + getCurrentRound().round : 'done'); setShowWildCardModal(false); }}
          onActivate={(roundNum, day) => {
            wildCardDismissed.current = true;
            sessionStorage.setItem('wc_dismissed', 'round' + roundNum);
            setShowWildCardModal(false);
            setUserDoc(prev => ({
              ...(prev || {}),
              wildCards: { ...((prev?.wildCards) || {}), ['round' + roundNum]: { day, activatedAt: new Date().toISOString() } },
            }));
          }}
        />
      )}
      {pendingStakesAckLeague && (
        <StakesAcknowledgmentModal
          league={pendingStakesAckLeague}
          user={user}
          firestore={firestore}
          onConfirm={() => setPendingStakesAckLeague(null)}
          onClose={() => setPendingStakesAckLeague(null)}
        />
      )}
    </div>
  );
}

