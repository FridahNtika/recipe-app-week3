const express = require("express");
const router = express.Router();
const { getDocs, collection } = require('firebase/firestore');
const db = require("./firebase");

router.get("/", async (req, res) => {
    try {
        let eachRecipeData = [];
        const recipeCollection = await getDocs(collection(db, "Recipes"));

        recipeCollection.forEach((userDoc) => {
            const recipeData = userDoc.data();
            eachRecipeData.push({
                recipeName: recipeData.name,
                author: recipeData.author,
                ingredients: recipeData.ingredients,
                instructions: recipeData.instructions,
                source: recipeData.source,
                userReviewIds: recipeData.userReviewIds,
                averageRating: recipeData.averageRating,
                dateCreated: recipeData.dateCreated,
                // Add other recipe fields here
            });
        });

        res.status(200).json(eachRecipeData);
    } catch (error) {
        console.error("Error fetching Recipes: ", error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
