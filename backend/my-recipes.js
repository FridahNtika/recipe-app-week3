const express = require("express");
const router = express.Router();
const db = require('./firebase');
const cors = require("cors");
const { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } = require("firebase/firestore");

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

router.post('/recipes/:id/heart', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const recipeRef = doc(db, 'Recipes', id);
        await updateDoc(recipeRef, {
            savedUserIds: arrayUnion(userId)
        });
        res.status(200).send({ message: 'Recipe hearted successfully' });
    } catch (error) {
        console.error('Error hearting recipe:', error);
        res.status(500).send({ error: 'Error hearting recipe' });
    }
});

router.delete('/recipes/:id/unheart', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const recipeRef = doc(db, 'Recipes', id);
        await updateDoc(recipeRef, {
            savedUserIds: arrayRemove(userId)
        });
        res.status(200).send({ message: 'Recipe unhearted successfully' });
    } catch (error) {
        console.error('Error unhearting recipe:', error);
        res.status(500).send({ error: 'Error unhearting recipe' });
    }
});

module.exports = router;
