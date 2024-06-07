const express = require("express");
const router = express.Router();
const { db } = require("./firebase");

router.get("/", async (req, res) => {
    try {
        let eachRecipeData = [];
        const recipeCollection = await db.collection("Recipes").get();

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
                duration: recipeData.duration,
                imageURL: recipeData.imageURL,
                isEdamam: recipeData.isEdamam,
                isPublished: recipeData.isPublished
            });
        });

        console.log("Recipes fetched successfully:", eachRecipeData);
        res.status(200).json(eachRecipeData);
    } catch (error) {
        console.error("Error fetching Recipes:", error.message);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

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

//admin approves user recipe to publish
router.put("/:id/publish", async (req, res) => {
    try {
        const uniqueId = req.params.id;
        const recipeDocRef = doc(db, "Recipes", uniqueId);

        await updateDoc(recipeDocRef, {
            isPublished: true
        });

        res.status(200).json({ message: "Recipe published successfully" });
    } catch (error) {
        console.error("Error publishing Recipe: ", error);
        res.status(400).json({ error: error.message });
    }
});

// Delete a recipe that admin doesn't want to publish
router.delete("/:id", async (req, res) => {
    try {
        const uniqueId = req.params.id;
        const recipeDocRef = doc(db, "Recipes", uniqueId);

        await deleteDoc(recipeDocRef);

        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        console.error("Error deleting Recipe: ", error);
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;
