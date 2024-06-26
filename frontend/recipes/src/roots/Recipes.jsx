import NavBar from '../components/NavBar';
import React, { useState, useEffect } from 'react';
import '../styles/recipes.css';
import axios from 'axios';
import katsucurry from '../images/katsucurry.jpg';
import timericon from '../images/timer_icon.png';
import { Link } from 'react-router-dom';
import {Button} from '@chakra-ui/react';

const StarRating = ({ rating, outOf = 5,}) => {
  const fullStars = Math.floor(rating);
  const fractionalPart = rating - fullStars;
  const emptyStars = outOf - Math.ceil(rating);
  const fractionClass = fractionalPart >= 0.75 ? 'three-quarter' : 
                        fractionalPart >= 0.5 ? 'half' : 
                        fractionalPart >= 0.25 ? 'quarter' : '';

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, index) => (
        <div key={index} className= "star full" ></div>
      ))}
      {fractionalPart > 0 && <div className={`star ${fractionClass}`}></div>}
      {[...Array(emptyStars)].map((_, index) => (
        <div key={index} className= "star empty"></div>
      ))}
    </div>
  );
};

const Recipe = () => {
  const [loading, setLoading] = useState(true);
  const [recipeArray, setRecipeArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [searchBarRecipe, setSearchBarRecipe] = useState('');
  const [searchBarCuisine, setSearchBarCuisine] = useState('');
  const [edamamSearchArray, setEdamamSearchArray] = useState([]);
  const [isUserRecipes, setIsUserRecipes] = useState(true);
  const [cuisineOption, setCuisineOption] = useState('Any');
  const cuisineTypes = [
    "Any","American", "Asian", "British", "Caribbean", "Central Europe", "Chinese", 
    "Eastern Europe", "French", "Indian", "Italian", "Japanese", "Kosher", 
    "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "South American", 
    "South East Asian"
  ];
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

  async function fetchEdamamSearch(recipeText, cuisineType) {
    try {
      const res = await axios.get(`http://localhost:5001/edamam/recipe/search/${recipeText}/${cuisineType}`);
      setEdamamSearchArray(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Recipes: ", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const filteredRecipes = recipeArray.filter(currentRecipe =>
    currentRecipe?.recipeName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortOption === 'name') {
      return a.recipeName.localeCompare(b.recipeName);
    } else if (sortOption === 'rating') {
      return b.averageRating - a.averageRating;
    }
    return 0;
  });
  const checkImage = async (currentProfile) => {
    console.log(currentProfile)
  }

  const handleEdamamFlavorFinderButtonClick = () => {
    setIsUserRecipes(false);
    setSearchQuery("");
  }

  const handleFlavorFinderButtonClick = () => {
    setIsUserRecipes(true);
    setSearchQuery("");
  }

  const handleSearchButtonClickEdamam = () => {
    const recipeText = searchQuery;
    const cuisineType = cuisineOption;
    if(recipeText != '' && isUserRecipes != true){
      console.log("recipeText = ", recipeText ," cuisineOption=" , cuisineType )
      fetchEdamamSearch(recipeText, cuisineType);
    }
    }

  return (
    <div>
      <NavBar />
      <div className='topbar'>
        <h1 className='recipesh1'>Recipes</h1>
        <input
          type="text"
          className="input-search"
          placeholder="Type to Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {isUserRecipes ? (
          <select className='cuisine-type'>
            <option value='any'>Any</option>
          </select>
        ) : (
          <select
            className='cuisine-type'
            value={cuisineOption}
            onChange={e => setCuisineOption(e.target.value)}
          >
            {cuisineTypes.map((cuisine, index) => (
              <option key={index} value={cuisine}>{cuisine}</option>
            ))}
          </select>
        )}
        <Button className='search-button' onClick={handleSearchButtonClickEdamam}>Search</Button>
        <select
          className='sorting-dropdown'
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>
      <Button className='edamam-button' onClick={handleEdamamFlavorFinderButtonClick}>Search on Edamam</Button>
      <Button className="flavor-button" onClick={handleFlavorFinderButtonClick}>Search on FlavorFinder</Button>
  
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="AllRecipes">
          {isUserRecipes ? (
            <div className="user-recipes">
              {sortedRecipes.map((currentRecipe, index) => (
                <Link to={`/recipe-details/${currentRecipe.id}`} className="recipe-link" key={`${currentRecipe.recipeName}-${index}`}>
                  <div className="IndividualRecipe">
                    <img className="recipe-image" alt={currentRecipe.recipeName} src={katsucurry} />
                    <div className="rating">
                      <StarRating rating={currentRecipe.averageRating} />
                      <p className='rating-text'>{currentRecipe.averageRating} / 5</p>
                      <p className='number-of-reviews'>{currentRecipe.userReviewIds ? currentRecipe.userReviewIds.length : 0} Reviews</p>
                    </div>
                    <h1 className='recipe-name'>{currentRecipe.recipeName}</h1>
                    <div className='time-and-author'>
                      <img className="timer-image" src={timericon} alt="timer icon" />
                      <p>≈{currentRecipe.duration} Minutes</p>
                      <p className="author">Author: {currentRecipe.author}</p>
                    </div>
                    <a href={`/save/${currentRecipe.id}`} className="bookmark-icon">
                      <div className="bookmark" />
                    </a>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="edamam-recipes">
              {edamamSearchArray.map((currentRecipe, index) => (
                <a href={`/recipes/${currentRecipe.id}`} className="recipe-link" key={`${currentRecipe.recipeName}-${index}`}>
                  <div className="IndividualRecipe">
                    <img className="recipe-image" alt={currentRecipe.name} src={katsucurry} />
                    <div className="rating">
                      <StarRating rating={currentRecipe.averageRating} />
                      <p className='rating-text'>{currentRecipe.averageRating} / 5</p>
                      <p className='number-of-reviews'>{currentRecipe.userReviewIds ? currentRecipe.userReviewIds.length : 0} Reviews</p>
                    </div>
                    <h1 className='recipe-name'>{currentRecipe.name}</h1>
                    <div className='time-and-author'>
                      <img className="timer-image" src={timericon} alt="timer icon" />
                      <p>≈{currentRecipe.duration > 0 ? `${currentRecipe.duration} Minutes` : 'N/A'}</p>
                      <p className="author">Author: {currentRecipe.author}</p>
                    </div>
                    <a href={`/save/${currentRecipe.id}`} className="bookmark-icon">
                      <div className="bookmark" />
                    </a>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Recipe;
