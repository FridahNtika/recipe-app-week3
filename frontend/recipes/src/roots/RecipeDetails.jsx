import React from "react";
import NavBar from "../components/NavBar";
import { Grid, GridItem } from "@chakra-ui/react";
import "../styles/recipedetails.css";

const RecipeDetails = () => {
  return (
    <div className="main-page">
      <NavBar />
      <Grid
        className="main-content"
        h="100vh"
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
      >
        <GridItem className="card" colSpan={3}  />
        <GridItem className="card" rowSpan={4} colSpan={1} />
        <GridItem className="card" rowSpan={1} colSpan={2} />
        <GridItem className="card" rowSpan={3} colSpan={2} />
      </Grid>
    </div>
  );
};

export default RecipeDetails;
