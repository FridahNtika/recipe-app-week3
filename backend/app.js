const express = require("express");
const cors = require("cors");
const app = express();
const port = 5001;
const myRecipesRouter = require("./my-recipes");
const db = require("./firebase");
const { collection, getDocs } = require("firebase/firestore");

app.use(express.json());
app.use(cors());

// Define the /test route
app.get('/test', async (req, res) => {
    try {
        const snapshot = await getDocs(collection(db, 'test'));
        const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching messages' });
    }
});

// Use the my-recipes router
app.use('/my-recipes', myRecipesRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
