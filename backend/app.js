const express = require("express");
const app = express();
const port = 5001;
app.use(express.json());
const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } = require("firebase/firestore");

const cors = require("cors");
app.use(cors());
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

//import routes
const create = ("/create-recipe");

//initialize routes
app.use("/create-recipe", create); 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});