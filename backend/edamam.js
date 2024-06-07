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
        name: recipe.label,
        ingredients: recipe.ingredientLines,
        calories: recipe.calories,
        totalNutrients: recipe.totalNutrients,
        instructionsUrl: recipe.url,
        duration: recipe.totalTime,
        imageURL: recipe.images.LARGE.url,

        isEdamamRecipe: true,
        averageRating: 0,
        author: "edamam",
        source: "edamam",
        userReviewIds: [],
        savedUserIds: []
        };

        // Check if the recipe already exists in Firestore
        const recipesRef = collection(db, "Recipes");
        const q = query(recipesRef, where("name", "==", recipeDetails.name));
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

    const getImageUrl = (images) => {
        if (images.LARGE && images.LARGE.url) {
            return images.LARGE.url;
        } else if (images.REGULAR && images.REGULAR.url) {
            return images.REGULAR.url;
        } else if (images.SMALL && images.SMALL.url) {
            return images.SMALL.url;
        } else {
            return "";
        }
        };

router.get('/recipe/search/:recipeText/:cuisineType', async (req, res) => {
    const recipeText = req.params.recipeText;
    const cuisineType = req.params.cuisineType;
    let jsonURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeText}&app_id=${apiId}&app_key=${apiKey}`;
    if(cuisineType != 'Any'){
        jsonURL += `&cuisineType=${cuisineType}&imageSize=LARGE`;
    } else{
        jsonURL += `&imageSize=LARGE`;
    }
    try {
        const response = await fetch(jsonURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        if (jsonData.hits && jsonData.hits.length > 0) {
            const recipesArray = [];
            for (const hit of jsonData.hits) {
                const recipe = hit.recipe;
                const recipeDetails = {
                    name: recipe.label,
                    ingredients: recipe.ingredientLines,
                    calories: recipe.calories,
                    totalNutrients: recipe.totalNutrients,
                    instructionsUrl: recipe.url,
                    duration: recipe.totalTime,
                    imageURL: getImageUrl(recipe.images),
                    isEdamamRecipe: true,
                    averageRating: 0,
                    author: "edamam",
                    source: "edamam",
                    userReviewIds: [],
                    savedUserIds: []
                };
                // Add the recipeDetails to the array
                recipesArray.push(recipeDetails);
            }

            // Return the array of recipes
            res.json(recipesArray);
        } else {
            res.status(404).json({ error: 'Recipes not found' });
        }
    } catch (error) {
        console.error('Error fetching the JSON data:', error);
        res.status(500).json({ error: 'Failed to fetch the JSON data' });
    }
});

router.get('/recipe/search/click/:recipeText/:cuisineType/:recipeName', async (req, res) => {
    const { recipeText, cuisineType, recipeName } = req.params;

    let jsonURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeText}&app_id=${apiId}&app_key=${apiKey}`;
    
    if (cuisineType !== 'Any') {
        jsonURL += `&cuisineType=${cuisineType}&imageSize=LARGE`;
    } else {
        jsonURL += `&imageSize=LARGE`;
    }

    try {
        const response = await fetch(jsonURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        if (jsonData.hits && jsonData.hits.length > 0) {
            const foundRecipe = jsonData.hits.find(hit => hit.recipe.label === recipeName);

            if (foundRecipe) {
                const recipe = foundRecipe.recipe;
                const recipeDetails = {
                    name: recipe.label,
                    ingredients: recipe.ingredientLines,
                    calories: recipe.calories,
                    totalNutrients: recipe.totalNutrients,
                    instructionsUrl: recipe.url,
                    duration: recipe.totalTime,
                    imageURL: getImageUrl(recipe.images),
                    isEdamamRecipe: true,
                    averageRating: 0,
                    author: "edamam",
                    source: "edamam",
                    userReviewIds: [],
                    savedUserIds: []
                };

                // Send response to the client
                res.json(recipeDetails);

                // Check if the recipe already exists in Firestore
                const recipesRef = collection(db, "Recipes");
                const q = query(recipesRef, where("name", "==", recipeDetails.name));
                const querySnapshot = await getDocs(q);
        
                if (querySnapshot.empty) {
                    // Recipe does not exist, add it to Firestore
                    const docRef = await addDoc(recipesRef, recipeDetails);
                    console.log("Document written with ID: ", docRef.id);
                } else {
                    // Recipe already exists, log the message
                    console.log("Recipe already exists in the database.");
                }
            } else {
                res.status(404).json({ error: 'Recipe not found' });
            }
        } else {
            res.status(404).json({ error: 'Recipes not found' });
        }
    } catch (error) {
        console.error('Error fetching the JSON data:', error);
        res.status(500).json({ error: 'Failed to fetch the JSON data' });
    }
});
module.exports = router;
