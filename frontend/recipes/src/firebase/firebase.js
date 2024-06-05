const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const { getAuth } = require("firebase/auth");


const serviceAccount = require("./permissions.json");


const app = initializeApp(serviceAccount);
const db = getFirestore(app);
const auth = getAuth(app);


module.exports = { db, auth };
