const express = require('express');
const router = express.Router();
const cors = require('cors');
const { doc, getDoc } = require('firebase/firestore');
const db = require('./firebase');
router.use(cors());

router.get('/:uid', async (req, res) => {
    const uid = req.params.uid;
    try {
        const userDocRef = doc(db, 'Users', uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (!userDocSnapshot.exists()) {
            return res.status(404).send({ error: 'User not found' });
        }
        const userData = userDocSnapshot.data();
        res.status(200).send({
            id: userDocSnapshot.id,
            username: userData.username,
            isAdmin: userData.isAdmin,
            oauthUserId: userData.oauthUserId,
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send({ error: error.message });
    }
});
module.exports = router;