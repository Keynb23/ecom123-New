import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { getAuth, type Auth } from 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyCzS52mrMMyWf7SkbQZe1xfdt9Xkda5e6A",
  authDomain: "ecom123-f7afc.firebaseapp.com",
  projectId: "ecom123-f7afc",
  storageBucket: "ecom123-f7afc.firebasestorage.app",
  messagingSenderId: "314607814031",
  appId: "1:314607814031:web:db3253c666ffc6eac0f7fa",
  measurementId: "G-T4484NQ4C7"
};

const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const db = getDatabase(app);
const auth = getAuth(app);
export { app, analytics, db, auth }; 
export type { Auth };