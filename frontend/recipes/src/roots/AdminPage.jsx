import React from 'react';
import NavBar from '../components/NavBar';
import '../styles/adminpage.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Button, Spinner, Text, VStack } from '@chakra-ui/react';

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [recipeArray, setRecipeArray] = useState([]);

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
  }, []);

  const handlePublish = async (recipeId) => {
    try {
      await axios.put(`http://localhost:5001/recipes/${recipeId}/publish`);
      // Update the local state to remove the published recipe
      setRecipeArray((prev) => prev.filter((recipe) => recipe.id !== recipeId));
    } catch (error) {
      console.error("Error publishing recipe: ", error);
    }
  };

  const handleRemove = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:5001/recipes/${recipeId}`);
      // Update the local state to remove the deleted recipe
      setRecipeArray((prev) => prev.filter((recipe) => recipe.id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe: ", error);
    }
  };

  const filteredRecipes = recipeArray.filter(recipe => !recipe.isEdamam && !recipe.isPublished);

  return (
    <div>
      <NavBar />
      <h2 className='header' style={{ fontWeight: 'bold' }}>
        Welcome to the Admin Dashboard
      </h2>
      <div className= 'page-container'>
      {loading ? (
        <Spinner />
      ) : (
        <VStack spacing={4}>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Box key={recipe.id} p={4} backgroundColor="#C5D4DF" borderWidth="1px" borderRadius="md" width="100%" position="relative" className="individual-recipe">
                <Text fontSize="25px" fontWeight="bold">{recipe.recipeName}</Text>
                <Text fontSize="20px">Author: {recipe.author}</Text>
                <Text fontSize="20px">Ingredients: {recipe.ingredients.map(ingredient => `${ingredient.name} (${ingredient.quantity} ${ingredient.unit})`).join(', ')}</Text>
                <Text fontSize="20px">Instructions: {Array.isArray(recipe.instructions) ? recipe.instructions.join('. ') : "No instructions provided."}</Text>
                <Box display="flex" justifyContent="flex-start" mt={4}>
                  <Button
                    bg="#9EAFBB"
                    border="4px solid white"
                    color="white"
                    fontSize={20}
                    borderRadius="20px"
                    _hover={{ bg: 'white', color: '#9EAFBB', border: '4px solid #9EAFBB', cursor: 'pointer' }}
                    height="45px"
                    paddingX="20px"
                    paddingY="15px"
                    className='publish-button' onClick={() => handlePublish(recipe.id)}>
                    Publish
                  </Button>
                  <Button
                    bg="#E57373"
                    border="4px solid white"
                    color="white"
                    fontSize={20}
                    borderRadius="20px"
                    _hover={{ bg: 'white', color: '#E57373', border: '4px solid #E57373', cursor: 'pointer' }}
                    height="45px"
                    paddingX="20px"
                    paddingY="15px"
                    className='remove-button' ml={2} onClick={() => handleRemove(recipe.id)}>
                    Remove
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Text>No recipes to review</Text>
          )}
        </VStack>
      )}
    </div>
    </div>
  );
};

export default AdminPage;

