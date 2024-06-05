import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Text, Wrap, WrapItem } from '@chakra-ui/react';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      console.log('Fetching recipes...');
      try {
        const response = await axios.get('http://localhost:5001/my-recipes/recipes');
        console.log('Recipes fetched:', response.data);
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
  
    fetchRecipes();
  }, []);

  return (
    <Container>
      <Text fontSize="2xl" mb={4}>My Recipe Page</Text>
      <Wrap spacing="30px">
        {recipes.map(recipe => (
          <WrapItem key={recipe.id}>
            <Box
              p={6}
              bg="blue.500"
              borderRadius="md"
              width="200px"
              _hover={{ boxShadow: 'dark-lg' }}>
              <Text color="white">{recipe.name}</Text>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Container>
  );
};

export default MyRecipes;
