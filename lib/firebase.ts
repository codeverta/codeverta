import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDiGq8Ij4C7Hnobn7fehJH3IshoYxY2Pik",
  authDomain: "firstproject-ad87e.firebaseapp.com",
  databaseURL: "https://firstproject-ad87e-default-rtdb.firebaseio.com",
  projectId: "firstproject-ad87e",
  storageBucket: "firstproject-ad87e.appspot.com",
  messagingSenderId: "798568705597",
  appId: "1:798568705597:web:16e50d6ef0608a6161c454",
  measurementId: "G-T46G5CRJ0H"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);