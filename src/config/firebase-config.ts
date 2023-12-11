import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDFaMtqZlIZXV0J0w8_zKoOyryh_kcEvZA",
  authDomain: "rismd-7d494.firebaseapp.com",
  projectId: "rismd-7d494",
  storageBucket: "rismd-7d494.appspot.com",
  messagingSenderId: "391996160547",
  appId: "1:391996160547:web:63db4a2c6cb511dd85cf96",
  measurementId: "G-LLDHQHP9TJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);