import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Text, Wrap, WrapItem, Center } from '@chakra-ui/react';

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
    <>
    <Text fontSize="2xl" mb={4}>My Recipes</Text>
      <Wrap spacing="30px">
        {recipes.map(recipe => (
          <WrapItem key={recipe.id}>
            <Box
              p={6}
              bg="blue.500"
              borderRadius="md"
              width="20vw"
              height="35vh"
              _hover={{ boxShadow: 'dark-lg' }}>
              <Center>
              <Text color="white" alignContent={"center"}>{recipe.name}</Text>
              </Center>
            </Box>
          </WrapItem>
        ))}
          {recipes.map(recipe => (
          <WrapItem key={recipe.id}>
            <Box
              p={6}
              bg="blue.500"
              borderRadius="md"
              width="20vw"
              height="35vh"
              _hover={{ boxShadow: 'dark-lg' }}>
              <Center>
              <Text color="white" alignContent={"center"}>{recipe.name}</Text>
              </Center>
            </Box>
          </WrapItem>
        ))}
        {recipes.map(recipe => (
          <WrapItem key={recipe.id}>
            <Box
              p={6}
              bg="blue.500"
              borderRadius="md"
              width="20vw"
              height="35vh"
              _hover={{ boxShadow: 'dark-lg' }}>
              <Center>
              <Text color="white" alignContent={"center"}>{recipe.name}</Text>
              </Center>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};

export default MyRecipes;
