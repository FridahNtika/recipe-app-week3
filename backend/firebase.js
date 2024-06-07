const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');
const serviceAccount = require('./permissions.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'swe-team-4-week-3.appspot.com' // Replace with your actual storage bucket
});

const db = admin.firestore();
const storage = admin.storage();

module.exports = { db, storage, app: admin };
