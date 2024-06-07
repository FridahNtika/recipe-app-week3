const express = require("express");
const router = express.Router();
const { getDocs, collection, getDoc, doc } = require('firebase/firestore');
const db = require("./firebase");

router.get("/", async (req, res) => {
    try {
        let eachRecipeData = [];
        const recipeCollection = await getDocs(collection(db, "Recipes"));

        recipeCollection.forEach((userDoc) => {
            const recipeData = userDoc.data();
            eachRecipeData.push({
                id: userDoc.id,
                recipeName: recipeData.name,
                author: recipeData.author,
                ingredients: recipeData.ingredients,
                instructions: recipeData.instructions,
                source: recipeData.source,
                userReviewIds: recipeData.userReviewIds,
                averageRating: recipeData.averageRating,
                dateCreated: recipeData.dateCreated,
                duration: recipeData.duration
                // Add other recipe fields here
            });
        });

        res.status(200).json(eachRecipeData);
    } catch (error) {
        console.error("Error fetching Recipes: ", error);
        res.status(400).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const uniqueId = req.params.id;
        const recipeDoc = await getDoc(doc(db, "Recipes", uniqueId));

        if (recipeDoc.exists()) {
            const recipeData = recipeDoc.data();
            const response = {
                id: recipeData.id,
                recipeName: recipeData.name,
                author: recipeData.author,
                ingredients: recipeData.ingredients,
                instructions: recipeData.instructions,
                source: recipeData.source,
                userReviewIds: recipeData.userReviewIds,
                averageRating: recipeData.averageRating,
                dateCreated: recipeData.dateCreated,
                duration: recipeData.duration,
                imageURL: recipeData.imageURL,
                calories: recipeData.calories,
                totalNutrients: recipeData.totalNutrients,
                savedUserIds: recipeData.savedUserIds
                // Add other recipe fields here
            };
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "Recipe not found" });
        }
    } catch (error) {
        console.error("Error fetching Recipe: ", error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
