
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

import { signInWithEmailAndPassword } from "firebase/auth";

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
  return auth.signOut();
};


// const { initializeApp } = require("firebase/app");
// const { getFirestore } = require("firebase/firestore");
// const { getAuth } = require("firebase/auth");


// const serviceAccount = require("./permissions.json");


// const app = initializeApp(serviceAccount);
// const db = getFirestore(app);
// const auth = getAuth(app);


// module.exports = db, auth, app ;

