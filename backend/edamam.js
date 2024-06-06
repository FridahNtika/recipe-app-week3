const express = require("express");
const router = express.Router();
const { getDocs, collection , addDoc, query, where} = require('firebase/firestore');
const db = require("./firebase");
const dotenv = require('dotenv');

dotenv.config();

const apiId= process.env.EDAMAM_ID;
const apiKey= process.env.EDAMAM_KEY;

const jsonURL = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${apiId}&app_key=${apiKey}&cuisineType=Asian`;

router.get('/recipe', async (req, res) => {
    try {
    const response = await fetch(jsonURL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();

    if (jsonData.hits && jsonData.hits.length > 0) {
        const recipe = jsonData.hits[0].recipe;
        const recipeDetails = {
        label: recipe.label,
        ingredients: recipe.ingredientLines,
        caloires: recipe.calories,
        totalNutrients: recipe.totalNutrients,
        instructionsUrl: recipe.url
        };

        // Check if the recipe already exists in Firestore
        const recipesRef = collection(db, "edamamRecipes");
        const q = query(recipesRef, where("label", "==", recipeDetails.label));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
        // Recipe does not exist, add it to Firestore
        const docRef = await addDoc(recipesRef, recipeDetails);
        console.log("Document written with ID: ", docRef.id);
        res.json(recipeDetails);
        } else {
            // Recipe already exists, return a message indicating this
            console.log("Recipe already exists in the database.");
            res.status(200).json({ message: 'Recipe already exists in the database', recipeDetails });
            }
    } else {
        res.status(404).json({ error: 'Recipe not found' });
    }
    } catch (error) {
    console.error('Error fetching the JSON data:', error);
    res.status(500).json({ error: 'Failed to fetch the JSON data' });
    }
    });

    module.exports = router;
