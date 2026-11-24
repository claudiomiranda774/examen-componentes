import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDipssk90f0EzRgnxhc2jRgnHjStG1QMtY",
  authDomain: "examen-componentes-880d0.firebaseapp.com",
  projectId: "examen-componentes-880d0",
  storageBucket: "examen-componentes-880d0.firebasestorage.app",
  messagingSenderId: "752020199593",
  appId: "1:752020199593:web:bd510ce1a4d3519dacb1b8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);