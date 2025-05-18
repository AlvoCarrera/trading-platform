// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBVObMW9VNDBvE8Ue02EdNmO08wnZ94YOs',
  authDomain: 'trading-platform-1a4e0.firebaseapp.com',
  projectId: 'trading-platform-1a4e0',
  storageBucket: 'trading-platform-1a4e0.appspot.com',
  messagingSenderId: '472410097938',
  appId: '1:472410097938:web:d35aab7c8d22bab6190bcb',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();