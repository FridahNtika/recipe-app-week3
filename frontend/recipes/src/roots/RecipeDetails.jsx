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
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const RecipeDetails = () => {
  const [isSaved, setIsSaved] = useState(false);
  const toast = useToast();

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

  return (
    <div className="main-page">
      <NavBar />
      <div className="header">
        <div className="title-save">
          <h2>
            <strong> Grandma’s Quiche</strong>
          </h2>
        </div>

        <div className="duration-and-author">
          <div className="duration">
            <img className="timer-image" src={timericon} />
            <p>≈90 Minutes</p>
          </div>
          <p className="author">Author: Sarah</p>
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
                <li>
                  2 1/2 tablespoons fresh blood orange juice from 1 blood orange
                </li>
                <li>1 tablespoon sherry vinegar</li>
                <li>2 tablespoons minced shallot</li>
                <li>1/2 teaspoon honey</li>
                <li>3 tablspoons olive oil</li>
                <li>Kosher salt</li>
                <li>Freshly ground black peppe</li>
                <li>1/2 teaspoon honey</li>
              </ul>
            </div>
          </div>
        </GridItem>

        <GridItem className="card " rowSpan={1} colSpan={2}>
          <div className="nutrition-facts-container">
            <h2 className="nutrition-facts"> Nutrition Facts</h2>
            <div className="nutrients">
              <div className="nutrient">
                <h2> 120</h2>
                <h3> Calories</h3>
              </div>
              <div className="nutrient">
                <h2> 120</h2>
                <h3> Calories</h3>
              </div>
      
              <div className="nutrient">
                <h2> 120</h2>
                <h3> Calories</h3>
              </div>
              <Button className="action-button">View All</Button>
            </div>
          </div>
        </GridItem>

        <GridItem className="card" rowSpan={3} colSpan={2}>
          <ChatBot />
        </GridItem>
      </Grid>
    </div>
  );
};

export default RecipeDetails;
