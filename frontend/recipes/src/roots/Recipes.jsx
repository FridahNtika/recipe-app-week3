import NavBar from '../components/NavBar';
import React, { useState, useEffect } from 'react';
import '../styles/recipes.css';
import axios from 'axios';
import katsucurry from '../images/katsucurry.jpg';
import timericon from '../images/timer_icon.png';
import noimage from '../images/no_image.png';
import { Link , useNavigate} from 'react-router-dom';
import {Button} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

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
  const [edamamRecipe, setEdamamRecipe] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
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

  async function fetchEdamamProfile(recipeText,cuisineType,profileName){
    try {
      const res = await axios.get(`http://localhost:5001/edamam/recipe/search/click/${recipeText}/${cuisineType}/${profileName}`);
      setEdamamRecipe(res.data);
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
    setEdamamSearchArray([]);
    setCuisineOption('Any');
  }

  const handleSearchButtonClickEdamam = () => {
    setLoading(true);
    const recipeText = searchQuery;
    const cuisineType = cuisineOption;
    setEdamamSearchArray([]);
    if(recipeText != '' && isUserRecipes != true){
      console.log("recipeText = ", recipeText ," cuisineOption=" , cuisineType )
      fetchEdamamSearch(recipeText, cuisineType);
    }
    }

    const handleEdamamProfileClick = async (currentProfile) => {
      const recipeText = searchQuery;
      const cuisineType = cuisineOption;
      const edamamRecipeName = currentProfile.name;
      console.log("recipeText=", recipeText, cuisineType, edamamRecipeName);
      await fetchEdamamProfile(recipeText, cuisineType, edamamRecipeName);

      const res = await axios.get("http://localhost:5001/recipes");
      const updatedRecipeArray = res.data;
      console.log(updatedRecipeArray);
      const filteredRecipe = updatedRecipeArray.find(recipe =>
        recipe.recipeName.toLowerCase() === edamamRecipeName.toLowerCase()
      )
      console.log("recipeText=", recipeText, cuisineType, edamamRecipeName, filteredRecipe.id);
      navigate(`/recipe-details/${filteredRecipe.id}`);
    }

    // const handleRedirection = async (recipeName) => {
    //   const res = await axios.get("http://localhost:5001/recipes");
    //   const updatedRecipeArray = res.data;
    //   console.log(updatedRecipeArray);
    //   const filteredRecipe = updatedRecipeArray.find(recipe =>
    //     recipe.recipeName.toLowerCase() === edamamRecipeName.toLowerCase()
    //   )
    //   console.log("recipeText=", recipeText, cuisineType, edamamRecipeName, filteredRecipe.id);
    //   navigate(`/recipe-details/${filteredRecipe.id}`);
    // }

  return (
    <div>
      <NavBar />
      <h1 className='recipesh1'>Recipes</h1>

      <div className='topbar'>
        <input
          type="text"
          className="input-search"
          placeholder="Type to Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {isUserRecipes ? (
          <select className='any-type'>
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
        <Button className='search-button' onClick={handleSearchButtonClickEdamam}                 
                    bg="#9EAFBB"
                    border="4px solid white"
                    color="white"
                    fontSize={20}
                    borderRadius="20px"
                    _hover={{ bg: 'white', color: '#9EAFBB', border: '4px solid #9EAFBB', cursor: 'pointer' }}
                    height="45px"
                    paddingX="20px"
                    paddingY="15px"
                    minWidth={75}
                    >Search</Button>
        <select
          className='sorting-dropdown'
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>
      <Button className='edamam-button' onClick={handleEdamamFlavorFinderButtonClick}                   
                    bg="#6acc00"
                    border="4px solid white"
                    color="white"
                    fontSize={20}
                    sx={{
                      textDecoration: isUserRecipes === true ? 'none' : 'underline',
                    }}
                    borderRadius="20px"
                    _hover={{ bg: 'white', color: '#9EAFBB', border: '4px solid #9EAFBB', cursor: 'pointer' }}
                    height="45px"
                    paddingX="20px"
                    paddingY="15px" >
        Search on Edamam</Button>
      <Button className="flavor-button" onClick={handleFlavorFinderButtonClick}                   
                    bg="lightblue"
                    border="4px solid white"
                    color="white"
                    fontSize={20}
                    sx={{
                      textDecoration: isUserRecipes === false ? 'none' : 'underline',
                    }}
                    borderRadius="20px"
                    _hover={{ bg: 'white', color: '#9EAFBB', border: '4px solid #9EAFBB', cursor: 'pointer' }}
                    height="45px"
                    paddingX="20px"
                    paddingY="15px">Search on FlavorFinder</Button>
  
      {loading ? (
        <div>
        <p className='loader'/>
        </div>
      ) : (
        <div className="AllRecipes">
          {isUserRecipes ? (
            <div className="user-recipes">
              {sortedRecipes.map((currentRecipe, index) => (
                <Link to={`/recipe-details/${currentRecipe.id}`} className="recipe-link" key={`${currentRecipe.recipeName}-${index}`}>
                  <div className="IndividualRecipe">
                    <img className="recipe-image" alt={currentRecipe.recipeName} src={noimage} />
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
              <div
                key={`${currentRecipe.recipeName}-${index}`}
                className="recipe-link"
                onClick={() => handleEdamamProfileClick(currentRecipe)}
                style={{ cursor: 'pointer' }} // Add this line to indicate the item is clickable
              >
                <div className="IndividualRecipe">
                  <img className="recipe-image" alt={currentRecipe.name} src={currentRecipe.imageURL} />
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
              </div>
            ))}
          </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Recipe;
