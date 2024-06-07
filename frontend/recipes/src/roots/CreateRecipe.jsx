import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  Heading, NumberInput, NumberInputStepper, NumberInputField,
  Button, Text, useToast, OrderedList, ListItem, FormControl,
  NumberIncrementStepper, NumberDecrementStepper, Input, FormLabel,
  FormErrorMessage, Table, Thead, Tbody, Tr, Th, TableCaption, TableContainer,
  Popover, PopoverTrigger, PopoverContent, PopoverHeader,
  PopoverBody, PopoverArrow, PopoverCloseButton, HStack, VStack
} from '@chakra-ui/react';
import NavBar from "../components/NavBar";

export const CreateRecipe = () => {
  const [userId, setUserId] = useState("");
  const [author, setAuthor] = useState("");
  const [name, setName] = useState("");
  const [prep, setPrep] = useState("");
  const [cooking, setCooking] = useState("");
  const [serving, setServing] = useState(1);
  const [item, setItem] = useState("");
  const [unit, setUnit] = useState("");
  const [amount, setAmount] = useState(0);
  const [cals, setCals] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [servingsError, setServingsError] = useState(false);
  const [steps, setSteps] = useState([{ id: 1, value: '' }, 
    { id: 2, value: '' }, { id: 3, value: '' }, { id: 4, value: '' }]);
  const [photo, setPhoto] = useState(null);
  const [forbidden, setForbidden] = useState(null);
  const toast = useToast();
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const address = user.email.split("@");
        setAuthor(address[0]);
        setUserId(user.uid);
      } else {
        setUserId(null);
        setAuthor(null);
      }
    });
    return () => unsubscribe();
  }, []);
  
  const handleCancel = () => {
    setName("");
    setPrep("");
    setCooking("");
    setServing(1);
    setIngredients([]);
    setSteps([{ id: 1, value: '' }, 
    { id: 2, value: '' }, { id: 3, value: '' }, { id: 4, value: '' }]);
    setInstructions([]);
    setPhoto(null);
    setCals(0);
  }

  const handleSave = async (evt) => {
    evt.preventDefault();

    if (!name || !prep || !cooking || !serving || !ingredients || !instructions) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in all the required fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      return;
    }

    const formData = new FormData();
    formData.append('recName', name);
    formData.append('prepTime', prep);
    formData.append('cookTime', cooking);
    formData.append('servings', serving);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('instr', JSON.stringify(instructions));
    formData.append('authorId', userId);
    formData.append('author', author);
    formData.append('source', 'user');
    formData.append('calories', cals); // Add calories to the formData
    if (photo) {
      formData.append('photo', photo);
    }

    const response = axios.post("http://localhost:5001/create-recipe", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    toast.promise(response, {
      success: { title: 'Recipe created', 
        description: 'Your recipe has been created successfully', 
        position: 'bottom-right', 
        isClosable: true },
      error: { title: 'Failed to create recipe', 
        description: 'An error occurred', 
        position: 'bottom-right', 
        isClosable: true },
      loading: { title: 'Saving recipe', 
        description: 'Please wait', 
        position: 'bottom-right', 
        isClosable: true },
    });

    try {
      await response;
      handleCancel();
    } catch (error) {
      console.log("Error saving the recipe: ", error);
    }
  };

  const handlePrep = (evt) => {
    const value = evt.target.value;
    if (value === '' || (Number.isInteger(Number(value)) && Number(value) > 0)) {
      setPrep(value);
    }
  };

  const handleCooking = (evt) => {
    const value = evt.target.value;
    if (value === '' || (Number.isInteger(Number(value)) && Number(value) > 0)) {
      setCooking(value);
    }
  };

  const handleServing = (val) => {
    const num = parseInt(val);
    if (num >= 1) {
      setServing(num);
      setServingsError(false);
    } else {
      setServingsError(true);
    };
  };

  const handleCals = (evt) => {
    const value = evt.target.value;
    if (value === '' || (Number.isInteger(Number(value)) && Number(value) > 0)) {
      setCals(value);
    }
  };

  const handleAddIngredient = () => {
    if (item && unit && amount) {
      setIngredients([...ingredients, { name: item, quantity: amount, unit: unit }]);
      setItem('');
      setUnit('');
      setAmount(0);
    }
  };

  const handleAddStep = () => {
    setSteps((prevSteps) => [
      ...prevSteps,
      { id: prevSteps.length + 1, value: '' },
      { id: prevSteps.length + 2, value: '' },
      { id: prevSteps.length + 3, value: '' },
      { id: prevSteps.length + 4, value: '' }
    ]);
  };

  const handleAddInstruction = (id, value) => {
    const updatedItems = steps.map((step) =>
      step.id === id ? { ...step, value } : step
    );
    setSteps(updatedItems);
    const updatedInstructions = updatedItems.map((item) => item.value);
    setInstructions(updatedInstructions);
  };

  const handlePhotoChange = (evt) => {
    setPhoto(evt.target.files[0]);
  };

  if (!forbidden) {
    return (
      <>
        <NavBar />
        <Heading as='h2' size='xl' color={"black"} padding={2}>Create a recipe</Heading>
        <div id="createRec">
          <FormControl isRequired padding={3} paddingRight={15}>
            <FormLabel>Recipe name</FormLabel>
            <Input type="text" value={name} onChange={(evt) => setName(evt.target.value)} />

            <FormLabel>Prep time (In minutes)</FormLabel>
            <Input type="number" value={prep} onChange={handlePrep} /> 

            <FormLabel>Cooking time (In minutes)</FormLabel>
            <Input type="number" value={cooking} onChange={handleCooking} /> 

            <FormLabel>How many plates does it serve?</FormLabel>
            <NumberInput min={1} value={serving} onChange={(valueString) => handleServing(valueString)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {servingsError && <FormErrorMessage>Serving must be at least 1.</FormErrorMessage>}

            <FormLabel>Calories</FormLabel>
            <Input type="number" value={cals} onChange={handleCals} />
            
            <FormLabel>Photo</FormLabel>
            <Input type="file" accept="image/*" onChange={handlePhotoChange} />
            <br></br>
            <br></br>

            <HStack>
              <Popover offset={[120,10]}>
                <PopoverTrigger>
                  <Button>+</Button>
                </PopoverTrigger>
                <PopoverContent bg='#D9D9D9'>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader fontWeight='semibold'>Add Ingredient</PopoverHeader>
                  <PopoverBody>
                    <VStack spacing={3}>
                      <FormControl>
                        <FormLabel>Ingredient name</FormLabel>
                        <Input type="text" value={item} onChange={(evt) => setItem(evt.target.value)} />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Quantity</FormLabel>
                        <Input type="number" value={amount} onChange={(evt) => setAmount(evt.target.value)} />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Unit</FormLabel>
                        <Input type="text" value={unit} onChange={(evt) => setUnit(evt.target.value)} />
                      </FormControl>
                      <Button onClick={handleAddIngredient}
                        bg='#9EAFBB' border="2px solid white" color="white" 
                        fontSize={22} borderRadius="15px"
                        _hover={{ bg: 'white', color: '#9EAFBB', border: '2px solid #9EAFBB', cursor: 'pointer'}}
                        height="40px" paddingX="20px" paddingY="10px" size="md">Add</Button>
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Text> Add Ingredients</Text>
            </HStack>
            
            <TableContainer>
              <Table variant='simple'>
                <TableCaption>Recipe ingredients</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Item</Th>
                    <Th>Unit</Th>
                    <Th>Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {ingredients.map((ingredient, index) => (
                    <Tr key={index}>
                      <Th>{ingredient.name}</Th>
                      <Th>{ingredient.unit}</Th>
                      <Th>{ingredient.quantity}</Th>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            
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
            <br />
            <br></br>
            <Button  bg='#9EAFBB' border="2px solid white" color="white" 
              fontSize={24} borderRadius="15px"
              _hover={{ bg: 'white', color: '#9EAFBB', border: '2px solid #9EAFBB', cursor: 'pointer'}}
              height="40px" paddingX="20px" paddingY="10px" size="md" 
              onClick={handleSave}>
              Save
            </Button>
            <Button  bg='#9C0F20' border="2px solid white" color="white" 
              fontSize={24} borderRadius="15px"
              _hover={{ bg: 'white', color: '#9EAFBB', border: '2px solid #9EAFBB', cursor: 'pointer'}}
              height="40px" paddingX="20px" paddingY="10px" size="md" 
              onClick={handleCancel}>
              Cancel
            </Button>
          </FormControl>
        </div>
      </>
    );
  } else {
    return null;
  }
};
