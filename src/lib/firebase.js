import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBYu5BSDs0c_5UIh8jmfBF6vlqzYwZ47Is',
  authDomain: 'worldcup2026-92e25.firebaseapp.com',
  projectId: 'worldcup2026-92e25',
  storageBucket: 'worldcup2026-92e25.firebasestorage.app',
  messagingSenderId: '87542366091',
  appId: '1:87542366091:web:5c35090c7e10e47072798e',
  measurementId: 'G-EG5B8FKX0C',
};

const isConfigured = Boolean(firebaseConfig.apiKey);
const firebaseApp = isConfigured ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null;
const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null;
const firestore = firebaseApp ? getFirestore(firebaseApp) : null;

export { firebaseApp, firebaseAuth, firestore, isConfigured as firebaseIsConfigured };
