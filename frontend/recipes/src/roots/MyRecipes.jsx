import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Wrap, WrapItem, Center, IconButton, Flex, HStack, Button, Input } from '@chakra-ui/react';
import { IoIosHeart } from 'react-icons/io';
import { EditIcon } from '@chakra-ui/icons';
import NavBar from '../components/NavBar';
import StarRating from '../components/StarRating';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState('created');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [userId, setUserId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
    recipe.name && recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply filtering based on the active tab
  let displayedRecipes;
  if (activeTab === 'created') {
    displayedRecipes = filteredRecipes.filter(recipe => recipe.authorId === userId);
  } else if (activeTab === 'saved') {
    displayedRecipes = filteredRecipes.filter(recipe => Array.isArray(recipe.savedUserIds) && recipe.savedUserIds.includes(userId));
  } else {
    displayedRecipes = filteredRecipes;
  }

  const handleHeartClick = async (recipeId, isSaved) => {
    try {
      const url = `http://localhost:5001/my-recipes/recipes/${recipeId}/${isSaved ? 'unheart' : 'heart'}`;
      const method = isSaved ? 'delete' : 'post';
      const response = await axios({
        method: method,
        url: url,
        data: { userId }
      });
      console.log('Heart action response:', response.data);

      // Update local state to reflect changes
      setRecipes(recipes.map(recipe => {
        if (recipe.id === recipeId) {
          if (isSaved) {
            recipe.savedUserIds = recipe.savedUserIds.filter(id => id !== userId);
          } else {
            recipe.savedUserIds.push(userId);
          }
        }
        return recipe;
      }));
    } catch (error) {
      console.error('Error updating heart status:', error);
    }
  };

  return (
    <>
      <NavBar />
      <Text fontSize="4xl" mb={4}>My Recipes</Text>
      <HStack spacing={50} mb={2} alignItems="center">
        <Text
          fontSize="2xl"
          p={3}
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
          p={3}
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
        <Button colorScheme="red" mr="2vw" ml="auto" onClick={() => navigate('/create-recipe')}>Create +</Button>
      </HStack>

      <Wrap spacing="30px">
        {displayedRecipes.map(recipe => (
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
              position="relative"
            >
              {recipe.authorId === userId && (
                <IconButton
                  icon={<EditIcon />}
                  aria-label="Edit Recipe"
                  colorScheme="teal"
                  size="sm"
                  position="absolute"
                  top="5px"
                  right="5px"
                  onClick={() => navigate(`/edit-recipe/${recipe.id}`)} // Navigate to edit page
                />
              )}
              <Text>Picture goes here</Text>
              <Center>
                <Text fontSize={24}>{recipe.name ? recipe.name : 'No label'}</Text>
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
                  variant={Array.isArray(recipe.savedUserIds) && recipe.savedUserIds.includes(userId) ? 'solid' : 'outline'}
                  onClick={() => handleHeartClick(recipe.id, Array.isArray(recipe.savedUserIds) && recipe.savedUserIds.includes(userId))}
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
