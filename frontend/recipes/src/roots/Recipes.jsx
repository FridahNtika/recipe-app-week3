import NavBar from '../components/NavBar';
import React, {useState, useEffect} from 'react';
import '../styles/recipes.css';
import axios from 'axios';
import katsucurry from '../images/katsucurry.jpg';

const Recipe = () => {
  const [loading, setLoading] = useState(true);
  const [recipeArray, setRecipeArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  async function fetchAllRecipes() {
    try {
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
  }, []); // Add an empty dependency array to ensure this runs only once after the initial render

  const filteredRecipes = recipeArray.filter(currentRecipe =>
    currentRecipe?.recipeName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <h1>Recipes Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="AllRecipes">
          {filteredRecipes.map((currentRecipe, index) => (
            <div key={`${currentRecipe.recipeName}-${index}`} className="IndividualRecipe">
              <a href={`/recipes/${currentRecipe.id}`} className="recipe-link">
                <img className="recipe-image" alt={currentRecipe.recipeName} src={katsucurry} />
                <p>{currentRecipe.recipeName}</p>
              </a>
              <a href={`/save/${currentRecipe.id}`} className="bookmark-icon">
                <div className="bookmark" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipe;
