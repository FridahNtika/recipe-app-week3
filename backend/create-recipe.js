const express = require("express");
/* const request = require('request'); */
const router = express.Router();
const db = require("./firebase");
const { collection, updateDoc, doc, addDoc } = require("firebase/firestore");;

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const date = new Date().toDateString();
        const recipe = {
            author: data.author,
            authorId: data.authorId,
            averageRating: "",
            dateCreated: date,
            name: data.recName,
            prepTime: data.prepTime,
            cookTime: data.cookTime,
            servings: data.servings,
            ingredients: data.ingredients,
            instructions: data.instr,
            isPublished: false,
            isEdamam: false,
            source: data.source
        };
        //console.log(recipe);
        const docRef = await addDoc(collection(db, "Recipes"), recipe);
        res.status(201).json({message: `Successfully added document with id ${docRef.id}`});
    } catch (error) {
        console.log("Error creating recipe: ", error);
        res.status(500).json({error: error.message});
    }
})

module.exports = router;