const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const { db, storage } = require("./firebase");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single('photo'), async (req, res) => {
    try {
        const data = req.body;
        const date = new Date().toDateString();
        let imageURL = "";

        // If a photo is uploaded, upload it to Firebase Storage
        if (req.file) {
            const bucket = storage.bucket();
            const blob = bucket.file(`recipes/${uuidv4()}`);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: req.file.mimetype
                }
            });

            blobStream.on('error', (err) => {
                console.log("Error uploading image:", err);
                res.status(500).json({ error: err.message });
            });

            blobStream.on('finish', async () => {
                // Make the file publically accessible
                await blob.makePublic();

                imageURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;

                const recipe = {
                    author: data.author,
                    authorId: data.authorId,
                    averageRating: "",
                    dateCreated: date,
                    name: data.recName,
                    prepTime: data.prepTime,
                    cookTime: data.cookTime,
                    servings: data.servings,
                    ingredients: JSON.parse(data.ingredients), // Ensure ingredients are parsed
                    instructions: JSON.parse(data.instr), // Ensure instructions are parsed
                    isPublished: false,
                    isEdamam: false,
                    source: data.source,
                    savedUserIds: [data.authorId],
                    imageURL: imageURL // Store the photo URL in Firestore
                };

                const docRef = await db.collection("Recipes").add(recipe);
                res.status(201).json({message: `Successfully added document with id ${docRef.id}`});
            });

            blobStream.end(req.file.buffer);
        } else {
            const recipe = {
                author: data.author,
                authorId: data.authorId,
                averageRating: "",
                dateCreated: date,
                name: data.recName,
                prepTime: data.prepTime,
                cookTime: data.cookTime,
                servings: data.servings,
                ingredients: JSON.parse(data.ingredients), // Ensure ingredients are parsed
                instructions: JSON.parse(data.instr), // Ensure instructions are parsed
                isPublished: false,
                isEdamam: false,
                source: data.source,
                savedUserIds: [data.authorId],
                imageURL: imageURL // Store the photo URL in Firestore
            };

            const docRef = await db.collection("Recipes").add(recipe);
            res.status(201).json({message: `Successfully added document with id ${docRef.id}`});
        }
    } catch (error) {
        console.log("Error creating recipe: ", error);
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
