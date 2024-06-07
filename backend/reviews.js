const express = require("express");
const router = express.Router();
const db = require("./firebase");
const cors = require("cors");
const {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} = require("firebase/firestore");

router.use(cors());

router.get("/:id", async (req, res) => {
  let reviewData = [];

  try {
    const recipeId = req.params.id;
    const recipeDoc = await getDoc(doc(db, "Recipes", recipeId));

    if (recipeDoc.exists()) {
      const response = recipeDoc.data();
      const userReviewIds = response.userReviewIds;

      if (userReviewIds.length == 0) {
        res.status(200).send({reviewsFound: false, reviews: []});
        return;
      }

      // Collect all promises
      const reviewPromises = userReviewIds.map(async (reviewId) => {
        try {
          console.log("reviewId: ", reviewId);
          const reviewDoc = await getDoc(doc(db, "UserReviews", reviewId));
          console.log("reviewDoc: ", reviewDoc.data());
          reviewData.push(reviewDoc.data());
          console.log("review data after push:", reviewData);
        } catch (error) {
          throw new Error(
            `Error fetching reviewId ${reviewId}: ${error.message}`
          );
        }
      });

      await Promise.all(reviewPromises);


      console.log("found these reviews:", reviewData);
      res.status(200).json({reviewsFound: true, reviews: reviewData});
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    console.error("Error fetching Recipe: ", error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/new-review", async (req, res) => {
  try {
    const data = req.body;
    const date = new Date().toDateString();
    const recipeId = data.recipeId;

    const review = {
      author: data.author,
      userId: data.userId,
      rating: 0,
      description: data.description,
      title: data.title,
      timestamp: date,
      replies: [],

      // reply
      // {
      //     author: "",
      //     comment:"",
      //     timestamp:new Date().toDateString();,
      //     userId:"",
      //     votes:""
      // }
    };

    const reviewRef = await addDoc(collection(db, "UserReviews"), review);
    // res.status(201).json({message: `Successfully added document with id ${docRef.id}`});

    try {
      const recipeRef = doc(db, "Recipes", recipeId);
      await updateDoc(recipeRef, {
        userReviewIds: arrayUnion(reviewRef.id),
      });
      res
        .status(200)
        .send({ message: "Review successfully added to recipe reviews list " });
    } catch (error) {
      console.error("Error adding review to reviews list:", error);
      res.status(500).send({ error: "Error adding review to reviews list" });
    }
  } catch (error) {
    console.log("Error creating recipe: ", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
