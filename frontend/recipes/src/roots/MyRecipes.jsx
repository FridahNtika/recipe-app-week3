import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Text, Wrap, WrapItem, Center, IconButton, Flex, HStack, Button, Input, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormControl, FormLabel, useToast, OrderedList, ListItem
} from '@chakra-ui/react';
import { IoIosHeart } from 'react-icons/io';
import { EditIcon } from '@chakra-ui/icons';
import NavBar from '../components/NavBar';
import StarRating from '../components/StarRating';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import "../styles/myrecipes.css";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState('created');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [userId, setUserId] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [steps, setSteps] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
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
        toast({
          title: "Error fetching recipes.",
          description: "An error occurred while fetching recipes. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
  
    fetchRecipes();
  }, []);

  const handleHeartClick = async (recipeId, isSaved, recipeName) => {
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

      toast({
        title: `Recipe ${isSaved ? 'unsaved' : 'saved'}.`,
        description: `${recipeName} has been ${isSaved ? 'removed from' : 'added to'} your saved list.`,
        status: isSaved ? 'info' : 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating heart status:', error);
      toast({
        title: "Error.",
        description: `An error occurred while updating the status of ${recipeName}. Please try again later.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditClick = (recipe) => {
    setSelectedRecipe(recipe);
    setSteps(recipe.instructions.map((instruction, index) => ({ id: index + 1, value: instruction })));
    onOpen();
  };

  const handleIngredientChange = (index, event) => {
    const updatedIngredients = selectedRecipe.ingredients.map((ingredient, i) => 
      i === index ? { ...ingredient, [event.target.name]: event.target.value } : ingredient
    );
    setSelectedRecipe({ ...selectedRecipe, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    setSelectedRecipe({
      ...selectedRecipe,
      ingredients: [...selectedRecipe.ingredients, { name: '', quantity: '', unit: '' }]
    });
  };

  const handleRemoveIngredient = (index) => {
    setSelectedRecipe({
      ...selectedRecipe,
      ingredients: selectedRecipe.ingredients.filter((_, i) => i !== index)
    });
  };

  const handleSaveChanges = async () => {
    try {
      const updatedRecipe = {
        ...selectedRecipe,
        instructions: steps.map(step => step.value)
      };
      const response = await axios.put(`http://localhost:5001/my-recipes/recipes/${selectedRecipe.id}`, updatedRecipe);
      console.log('Recipe updated:', response.data);
      setRecipes(recipes.map(recipe => recipe.id === selectedRecipe.id ? updatedRecipe : recipe));
      onClose();
      toast({
        title: "Recipe updated.",
        description: `${selectedRecipe.name} has been updated successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating recipe:', error);
      toast({
        title: "Error.",
        description: `An error occurred while updating ${selectedRecipe.name}. Please try again later.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleFieldChange = (field, value) => {
    setSelectedRecipe({
      ...selectedRecipe,
      [field]: value
    });
  };

  const handleAddStep = () => {
    setSteps((prevSteps) => [
      ...prevSteps,
      { id: prevSteps.length + 1, value: '' }
    ]);
  };

  const handleAddInstruction = (id, value) => {
    const updatedSteps = steps.map((step) =>
      step.id === id ? { ...step, value } : step
    );
    setSteps(updatedSteps);
  };

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

  return (
    <>
      <NavBar />
      <h1 style = {{fontWeight: "bold", fontSize:"35px", marginTop: "20px"}} mb={4}>My Recipes</h1>
      <div className='topbar'>
      <HStack spacing={50} mb={2} alignItems="center">
        <Text
          fontSize="2xl"
          p={3}
          cursor="pointer"
          bg={activeTab === 'created' ? 'lightblue' : 'transparent'}
          _hover={{ bg: 'lightblue' }}
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
          bg={activeTab === 'saved' ? 'lightblue' : 'transparent'}
          _hover={{ bg: 'lightblue' }}
          onClick={() => setActiveTab('saved')}
          borderRadius="md"
          border={activeTab === 'saved' ? '2px' : 'none'}
          borderColor={activeTab === 'saved' ? 'blue.700' : 'transparent'}
        >
          Saved Recipes
        </Text>
        <Input
          placeholder="Search recipes..."
          className='input-search'
          fontSize={22}
          value={searchQuery}
          height="50px"
          paddingX="20px"
          paddingY="15px"
          ml="auto"
          onChange={(e) => setSearchQuery(e.target.value)}
          width="1100px"
        />
        <Button colorScheme="red" mr="2vw" ml="auto" onClick={() => navigate('/create-recipe')}>Create +</Button>
      </HStack>
      </div>

      <Wrap spacing="30px">
        {displayedRecipes.map(recipe => (
          <WrapItem key={recipe.id}>
            <Box
              p={6}
              bg="lightblue"
              borderRadius="md"
              width="20vw"
              height="40vh"
               transition="transform 0.3s ease, background-color 0.3s ease"
              _hover={{ transform: "scale(1.05)" }}
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
                  onClick={() => handleEditClick(recipe)} // Open edit modal
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
                  onClick={() => handleHeartClick(recipe.id, Array.isArray(recipe.savedUserIds) && recipe.savedUserIds.includes(userId), recipe.name)}
                />
              </Flex>
            </Box>
          </WrapItem>
        ))}
      </Wrap>

      {selectedRecipe && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Recipe</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={3}>
                <FormLabel>Recipe Name</FormLabel>
                <Input
                  value={selectedRecipe.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Prep Time</FormLabel>
                <Input
                  value={selectedRecipe.prepTime}
                  onChange={(e) => handleFieldChange('prepTime', e.target.value)}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Cooking Time</FormLabel>
                <Input
                  value={selectedRecipe.cookingTime}
                  onChange={(e) => handleFieldChange('cookingTime', e.target.value)}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Servings</FormLabel>
                <NumberInput
                  min={1}
                  value={selectedRecipe.servings}
                  onChange={(valueString) => handleFieldChange('servings', parseInt(valueString))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Instructions</FormLabel>
                <OrderedList>
                  {steps.map((step) => (
                    <div key={step.id}>
                      <ListItem>
                        <Input type="text" value={step.value} 
                          onChange={(evt) => handleAddInstruction(step.id, evt.target.value)}
                        />
                      </ListItem>
                      <br />
                    </div>
                  ))}
                </OrderedList>
                <Button onClick={handleAddStep}>+</Button>
              </FormControl>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <Flex key={index} mb={3}>
                  <Input
                    name="name"
                    placeholder="Ingredient Name"
                    value={ingredient.name}
                    onChange={(event) => handleIngredientChange(index, event)}
                    mr={3}
                  />
                  <Input
                    name="quantity"
                    placeholder="Quantity"
                    value={ingredient.quantity}
                    onChange={(event) => handleIngredientChange(index, event)}
                    mr={3}
                  />
                  <Input
                    name="unit"
                    placeholder="Unit"
                    value={ingredient.unit}
                    onChange={(event) => handleIngredientChange(index, event)}
                    mr={3}
                  />
                  <Button colorScheme="red" onClick={() => handleRemoveIngredient(index)}>Remove</Button>
                </Flex>
              ))}
              <Button colorScheme="teal" onClick={handleAddIngredient}>Add Ingredient</Button>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSaveChanges}>
                Save Changes
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default MyRecipes;
