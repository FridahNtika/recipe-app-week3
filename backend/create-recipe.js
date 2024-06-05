const express = require("express");
/* const request = require('request'); */
const router = express.Router();
const db = require("./firebase");
const { collection, updateDoc, doc, addDoc } = require("firebase/firestore");;

router.post("/create-recipe", async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        res.status(200).json(data);
        /* const docRef = await addDoc(collection(db, "Recipes"), {
            Author: "",
            Servings: 4,
            PrepTime: username,
            TimeTaken: message,
        })
        res.status(200).json({message: `Successfully added document with id ${docRef.id}`}); */
    } catch (error) {
        console.log("Error creating recipe: ", error);
        res.status(500).json({error: error.message});
    }
})

module.exports = router;