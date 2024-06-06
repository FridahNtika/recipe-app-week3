import React from "react";
import NavBar from "../components/NavBar";
import { Grid, GridItem } from "@chakra-ui/react";
import "../styles/recipedetails.css";
import curry from "../images/katsucurry.jpg";
import ChatBot from "../components/ChatBot";

const RecipeDetails = () => {
  return (
    <div className="main-page">
      <NavBar />
      <div className="header">
        <h2>
          <strong> Grandma’s Quiche</strong>
        </h2>
      </div>
      <Grid
        className="main-content"
        h="100vh"
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
      >
        <GridItem className="card ingredients-container" rowSpan={4} colSpan={1}>
          <div className="image-container">
            <img src={curry} alt="Curry Image" />
          </div>
          <div className="ingredients">
            <h2> Ingredients</h2>
            <div className="ingredients-list">
                <ul>
                  <li>2 1/2 tablespoons fresh blood orange juice from 1 blood orange</li>
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

        <GridItem className="card" rowSpan={1} colSpan={2}/>

        <GridItem className="card"  rowSpan={3} colSpan={2} > 
             <ChatBot/>
        </GridItem>
      
      </Grid>
    </div>
  );
};

export default RecipeDetails;
