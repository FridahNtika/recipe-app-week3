import axios from "axios";
import * as React from "react";
import {useState} from "react";
import { Heading,Link,NumberInput,NumberInputStepper,NumberInputField } from '@chakra-ui/react';
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
    const toast = useToast();
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
      try {
        const data = {recName: name, prepTime: prep,
          cookTime: cooking, servings: serving,
          ingredients: ingredients, instr: instructions,
          source: "user"
        };
        //console.log(data);
        const response = await axios.post("http://localhost:5001/create-recipe", data);
        console.log('Recipe saved successfully:', response.data);
        toast.promise(createPostPromise, {
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
        await createPostPromise;
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
          <NumberInput min={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text>Ingredients</Text>
          <Text>+ Add Ingredients</Text>
            <TableContainer>
            <Table variant='simple'>
              <TableCaption>Recipe ingredients</TableCaption>
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th>Unit</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
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
          {/* <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement='right'
        closeOnBlur={false}
      >
        <PopoverContent>
          <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to cancel?
          </PopoverBody>
          <PopoverFooter display='flex' justifyContent='flex-end'>
            <ButtonGroup size='sm'>
              <Button variant='outline'>No</Button>
              <Button colorScheme='red'>Yes</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover> */}
        </FormControl>
        </div>
        </>
    )
}