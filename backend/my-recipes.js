const express = require("express");
const router = express.Router();
const db = require('./firebase');
const cors = require("cors");
const { collection, getDocs } = require("firebase/firestore");

router.use(cors());

router.get('/recipes', async (req, res) => {
    try {
        const snapshot = await getDocs(collection(db, 'Recipes'));
        const recipes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.status(200).send(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send({ error: 'Error fetching recipes' });
    }
});

module.exports = router;
