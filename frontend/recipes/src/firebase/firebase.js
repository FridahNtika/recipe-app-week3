
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCw6ro2p-hIW6IWvVIE04xOOPPkCup1AmU",
  authDomain: "swe-team-4-week-3.firebaseapp.com",
  projectId: "swe-team-4-week-3",
  storageBucket: "swe-team-4-week-3.appspot.com",
  messagingSenderId: "483762072478",
  appId: "1:483762072478:web:6951fda7286101e937c48f",
  measurementId: "G-X8KH29RZPR"
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

