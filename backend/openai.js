// openai.js
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const cors = require('cors');
const db = require('./firebase'); // Assuming you have firebase setup similar to your other routes
const { collection, getDocs } = require("firebase/firestore");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const router = express.Router();

router.use(bodyParser.json());
router.use(cors());

router.post('/message', async (req, res) => {
  const { conversation } = req.body;

  const systemMessage = { role: "system", content: "You are a helpful assistant." };

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...conversation],
    });

    res.json({ botMessage: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

router.get('/conversation/:id', async (req, res) => {
  const { id } = req.params;
  const conversationRef = db.collection('conversations').doc(id);
  const doc = await conversationRef.get();

  if (doc.exists) {
    res.json({ threadId: id, messages: doc.data().messages });
  } else {
    res.status(404).json({ error: 'Conversation not found' });
  }
});

module.exports = router;
