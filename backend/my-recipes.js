const express = require("express");
const router = express.Router();
const { db } = require('./firebase');
const cors = require("cors");
const { FieldValue } = require("firebase-admin/firestore");

router.use(cors());

router.put('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const {
        name,
        prepTime,
        cookingTime,
        servings,
        ingredients,
        instructions
    } = req.body;

    try {
        const recipeRef = db.collection('Recipes').doc(id);
        await recipeRef.update({
            name,
            prepTime,
            cookingTime,
            servings,
            ingredients,
            instructions
        });
        res.status(200).send({ message: 'Recipe updated successfully' });
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).send({ error: 'Error updating recipe' });
    }
});

router.get('/recipes', async (req, res) => {
    try {
        const snapshot = await db.collection('Recipes').get();
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
        const recipeRef = db.collection('Recipes').doc(id);
        await recipeRef.update({
            savedUserIds: FieldValue.arrayUnion(userId)
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
        const recipeRef = db.collection('Recipes').doc(id);
        await recipeRef.update({
            savedUserIds: FieldValue.arrayRemove(userId)
        });
        res.status(200).send({ message: 'Recipe unhearted successfully' });
    } catch (error) {
        console.error('Error unhearting recipe:', error);
        res.status(500).send({ error: 'Error unhearting recipe' });
    }
});

module.exports = router;
