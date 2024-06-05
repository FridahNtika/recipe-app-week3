import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Wrap, WrapItem, Center, IconButton, Flex, HStack, Button, Input } from '@chakra-ui/react';
import { IoIosHeart } from 'react-icons/io';
import NavBar from '../components/NavBar';
import StarRating from '../components/StarRating';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState('created'); // State to track the active tab
  const [searchQuery, setSearchQuery] = useState(''); // State to track the search query

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

  // Filter recipes based on the search query
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <Text fontSize="4xl" mb={4}>My Recipes</Text>
      <HStack spacing={50} mb={2} alignItems="center">
        <Text
          fontSize="2xl"
          p={4}
          cursor="pointer"
          bg={activeTab === 'created' ? '#90B4CE' : 'transparent'}
          _hover={{ bg: '#90B4CE' }}
          onClick={() => setActiveTab('created')}
          borderRadius="md"
          border={activeTab === 'created' ? '2px' : 'none'}
          borderColor={activeTab === 'created' ? 'blue.700' : 'transparent'}
        >
          Created Recipes
        </Text>
        <Text
          fontSize="2xl"
          p={4}
          cursor="pointer"
          bg={activeTab === 'saved' ? '#90B4CE' : 'transparent'}
          _hover={{ bg: '#90B4CE' }}
          onClick={() => setActiveTab('saved')}
          borderRadius="md"
          border={activeTab === 'saved' ? '2px' : 'none'}
          borderColor={activeTab === 'saved' ? 'blue.700' : 'transparent'}
        >
          Saved Recipes
        </Text>
        <Input
          placeholder="Search recipes"
          value={searchQuery}
          ml="auto"
          onChange={(e) => setSearchQuery(e.target.value)}
          width="200px"
        />
        <Button colorScheme="red" ml="auto">Create +</Button>
      </HStack>

      <Wrap spacing="30px">
        {filteredRecipes.map(recipe => (
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
              <Flex justifyContent="space-between" alignItems="center" mt={2}>
                <StarRating rating={recipe.averageRating} />
                <Text>{recipe.averageRating} / 5</Text>
              </Flex>
              <Flex justifyContent="flex-end" mt={4}>
                <IconButton
                  icon={<IoIosHeart />}
                  aria-label="Save Recipe"
                  colorScheme="blue"
                  variant="outline"
                />
              </Flex>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};

export default MyRecipes;
