import React, {useState, useEffect} from 'react';
import '../styles/recipes.css';
import axios from 'axios';


const Recipe = () => {
  const [loading, setLoading] = useState(true);
  const [recipeArray, setRecipeArray] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState('');

async function fetchAllRecipes(){
  try{
    const res = await axios.get("http://localhost:5001/recipes");
    setRecipeArray(res.data);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching Recipes: ", error);
    setLoading(false);
  }
}


  useEffect(() => {
    fetchAllRecipes();
  })

  

  return (
    <div>
      <h1>Recipes Page</h1>
    </div>
  )
}

export default Recipe
