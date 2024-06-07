import React from "react";
import NavBar from "../components/NavBar";
import { Grid, GridItem } from "@chakra-ui/react";
import "../styles/recipedetails.css";
import curry from "../images/katsucurry.jpg";
import ChatBot from "../components/ChatBot";
import timericon from "../images/timer_icon.png";
import saveFill from "../assets/saveFill.svg";
import saveOutline from "../assets/saveOutline.svg";
import { IconButton, Box, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useToast, useDisclosure } from "@chakra-ui/react";
import BasicModal from "../components/BasicModal";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";
import NewReview from "../components/NewReview";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const RecipeDetails = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [totalNutrients, setTotalNutrients] = useState({});
  const [allReviews, setAllReviews] = useState([])
  const [reviewsFound, setReviewsFound] = useState(false)
  // const [recipeID, setRecipeID] = useState("")
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let { recipeID } = useParams();

  const [author, setAuthor] = useState("");
  const [userId, setUserId] = useState("");

  // console.log("recipe ID: ", recipeID);
  const handleSave = () => {
    if (!isSaved) {
      toast({
        title: "Recipe Saved!",
        duration: 1000,
        position: "bottom-left",
      });
    }
    setIsSaved(!isSaved);
  };

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/recipes/${recipeID}`
      );
      setRecipe(response.data);
      setTotalNutrients(response.data.totalNutrients);
      // console.log(response, " -> Recipe");
    } catch (e) {
      console.error(e);
    }
  };

  const fetchReviews = async () => {
    const reviewsList = recipe?.userReviewIds;
    console.log("reviews list:", reviewsList);
    if (reviewsList == []) {
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5001/reviews/${recipeID}`
      );

      console.log("User reviews: ", response.data)
      setAllReviews(response.data.reviews)
      setReviewsFound(response.data.reviewsFound)
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRecipe();
    fetchReviews();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const address = user.email.split("@");
        setAuthor(address[0]);
        setUserId(user.uid);
      } else {
        setUserId(null);
        setAuthor(null);
      }
    });
    return () => unsubscribe();
  }, []);

  console.log("User ID in rD: ", userId);
  console.log("Author in rD: ", author);

  return (
    <div className="main-page">
      <NavBar />
      <div className="header">
        <div className="title">
          <h2>
            <strong> {recipe.recipeName} </strong>
          </h2>
        </div>

        <div className="duration-and-author">
          <div className="duration">
            <img width="10px" className="timer-image" src={timericon} />
            <p>≈{recipe.duration} minutes</p>
          </div>
          <p className="author">
            {recipe.author ? `By ${recipe.author}` : `Author: Unknown`}
          </p>
        </div>

        <div className="save-button-container">
          <IconButton
            onClick={handleSave}
            className="save-button"
            size="lg"
            variant="unstyled"
            aria-label="Search database"
            icon={
              <img
                src={isSaved ? saveFill : saveOutline}
                alt="save icon outline"
              />
            }
          />
        </div>
      </div>
      <Grid
        className="main-content"
        h="100vh"
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
      >
        <GridItem
          className="card ingredients-container"
          rowSpan={4}
          colSpan={1}
        >
          <div className="image-container">
            <img src={curry} alt="Curry Image" />
          </div>
          <div className="ingredients">
            <h2> Ingredients</h2>
            <div className="ingredients-list">
              <ul>
                {recipe.ingredients?.map((ingr, index) => (
                  <li key={index}> {ingr} </li>
                ))}
              </ul>
            </div>
          </div>
        </GridItem>

        <GridItem className="card " rowSpan={1} colSpan={2}>
          <div className="nutrition-facts-container">
            <h2 className="nutrition-facts"> Nutrition Facts</h2>
            <div className="nutrients">
              <div className="nutrient">
                <h2> {Math.round(recipe.calories)}</h2>
                <h3> Calories</h3>
              </div>

              <div className="nutrient">
                <h2>
                  {Math.round(totalNutrients["PROCNT"]?.quantity)}
                  {totalNutrients["PROCNT"]?.unit}
                </h2>
                <h3> Protein </h3>
              </div>

              <div className="nutrient">
                <h2>
                  {Math.round(totalNutrients["CHOCDF"]?.quantity)}
                  {totalNutrients["NA"]?.unit}
                </h2>
                <h3> Carbs </h3>
              </div>

              <div className="nutrient">
                <h2>
                  {Math.round(totalNutrients["FAT"]?.quantity)}
                  {totalNutrients["FAT"]?.unit}
                </h2>
                <h3> Fat </h3>
              </div>

              <Button className="action-button" onClick={onOpen}>
                View All
              </Button>
              <BasicModal
                totalNutrients={totalNutrients}
                isOpen={isOpen}
                onClose={onClose}
              />
            </div>
          </div>
        </GridItem>

        <GridItem className="card" rowSpan={3} colSpan={2}>
          <ChatBot recipe={recipe} />
        </GridItem>
      </Grid>

      <div className="reviews-section">
        <h2 className="reviews-title">
          <strong> Reviews </strong>
        </h2>

        <div className="reviews-container card">

{reviewsFound && 
allReviews.map((review, key) => 
  <ReviewCard reviewData={review} key={key} />
)
}

          {/* <ReviewCard />
          <ReviewCard /> */}
          <NewReview fetchReviews={fetchReviews} recipeID={recipeID} userId={userId} author={author} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
