const express = require("express");
const cors = require("cors");
const recipeRouter = require('./recipes');
const myRecipesRouter = require("./my-recipes");
const createRecipeRouter = require("./create-recipe");
const reviewsRouter = require("./reviews");
const db = require("./firebase");
const { collection, getDocs } = require("firebase/firestore");
const openaiRouter = require('./openai');
const edamamRouter = require('./edamam');
const userRoutes =  require('./users');

const app = express();
const port = 5001;

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

app.use("/create-recipe", createRecipeRouter); 
app.use("/recipes", recipeRouter);
app.use('/my-recipes', myRecipesRouter);
app.use('/openai', openaiRouter); 
app.use('/edamam', edamamRouter);
app.use('/reviews', reviewsRouter);


app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
