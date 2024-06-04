import dotenv from "dotenv";
import express from "express";

const router = express.Router();
dotenv.config();

router.post("/create-recipe", async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        /* const docRef = await addDoc(collection(db, "Recipes"), {
            Author: "",
            Servings: 4,
            PrepTime: username,
            TimeTaken: message,
        })
        res.status(200).json({message: `Successfully added document with id ${docRef.id}`}); */
    } catch (error) {
        console.log("Error creating recipe: ", error);
        res.status(500).json();
    }
})

module.exports = router;