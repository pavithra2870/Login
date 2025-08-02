import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
require('dotenv').config();
const firebaseConfig = {
  apiKey: process.env.google_api,
  authDomain: 'sample1-91800.firebaseapp.com',
  projectId: 'sample1-91800',
  storageBucket: 'sample1-91800.appspot.com',
  messagingSenderId: '705993908625',
  appId: '1:705993908625:web:9cf9698b3528653e147a30',
  measurementId: 'G-72JZT3K1DD'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

console.log('Firebase initialized:', { app: !!app, auth: !!auth, db: !!db, googleProvider: !!googleProvider });

export { app, auth, db, googleProvider };
