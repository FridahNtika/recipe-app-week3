import axios from "axios";
import * as React from "react";
import {useState} from "react";
import { Heading,Box,NumberInput,NumberInputStepper,NumberInputField } from '@chakra-ui/react';
import {
  Button,
  Text,
  useToast,
  useDisclosure,
  FormControl,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer} from '@chakra-ui/react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  HStack,
  VStack
} from '@chakra-ui/react'
import NavBar from "../components/NavBar";

export const CreateRecipe = () => {
    //initializes variables
    const [name, setName] = useState("");
    const [prep, setPrep] = useState("");
    const [cooking, setCooking] = useState("");
    const [serving, setServing] = useState(0);
    const [item, setItem] = useState("");
    const [unit, setUnit] = useState("");
    const [amount, setAmount] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [servingsError, setServingsError] = useState(false);
    const toast = useToast();
    //const isError = input === ''
    const { isOpen, onToggle, onClose } = useDisclosure()
    
    //clears all input when cancel button is clicked
    const handleCancel = () => {
      setName("");
      setPrep("");
      setCooking("");
      setServing(0);
      setIngredients([]);
      setInstructions([]);
    }

    //stores the recipe when save button is clicked
    const handleSave = async (evt) => {
      evt.preventDefault();
      const data = {recName: name, prepTime: prep,
        cookTime: cooking, servings: serving,
        ingredients: ingredients, instr: instructions,
        source: "user"
      };
      //console.log(data);
      const response = axios.post("http://localhost:5001/create-recipe", data);
      toast.promise(response, {
        success: {title: 'Recipe created', 
          description: 'Your recipe has been created successfully', 
          position: 'bottom-right', 
          isClosable: true },
        error: {title: 'Failed to create recipe', 
          description: 'An error occurred', 
          position: 'bottom-right', 
          isClosable: true },
        loading: {title: 'Saving recipe', 
          description: 'Please wait', 
          position: 'bottom-right', 
          isClosable: true },
      });
      try {
        await response;
        setName("");
        setPrep("");
        setCooking("");
        setServing(0);
        setIngredients([]);
        setInstructions([]);
      } catch (error) {
        console.log("Error saving the recipe: ", error);
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

    const handleAddIngredient = () => {
      if (item && unit && amount) {
        setIngredients([...ingredients, { name: item, quantity: amount, unit: unit }]);
        setItem('');
        setUnit('');
        setAmount(0);
      }
    };

    return (
        <>
        <Heading as='h2' size='xl' color={"black"} padding={3}>Create a recipe</Heading>
        <div id="createRec">
        {/* <NavBar/> */}
        <FormControl isRequired padding={5}>
          <FormLabel>Recipe name</FormLabel>
          <Input type="text" value={name} onChange={(evt) => setName(evt.target.value)}/>

          <FormLabel>Prep time</FormLabel>
          <Input type="number" value={prep} onChange={(evt) => setPrep(evt.target.value)}/>

          <FormLabel>Cooking time</FormLabel>
          <Input type="text" value={cooking} onChange={(evt) => setCooking(evt.target.value)}/>

          <FormLabel>How many plates does it serve?</FormLabel>
          <NumberInput min={1} value={serving} onChange={(valueString) => handleServing(valueString)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {servingsError && <FormErrorMessage>Serving must be at least 1.</FormErrorMessage>}
          <br></br>

          {/*Popup to add ingredients*/}
          <HStack>
            <Popover>
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
          
          {/*Table to print out each ingredient added*/}
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
    )
}