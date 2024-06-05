import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Text, Wrap, WrapItem, Center, Button, Flex } from '@chakra-ui/react';

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
      <Text fontSize="4xl" mb={4}>My Recipes</Text>
      <Wrap spacing="30px">
        {recipes.map(recipe => (
          <WrapItem key={recipe.id}>
            <Box
              p={6}
              bg="#90B4CE"
              borderRadius="md"
              width="20vw"
              height="40vh"
              _hover={{ boxShadow: 'dark-lg' }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Text>Picture goes here</Text>
              <Center>
                <Text fontSize={24}>{recipe.name}</Text>
              </Center>
              <Flex justifyContent="flex-end" mt={4}>
                <Button>Save</Button>
              </Flex>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};

export default MyRecipes;
