import axios from "axios";
import * as React from "react";
import {useState} from "react";
import { Stack, Box, Button, useToast } from '@chakra-ui/react';

export const CreateRecipe = () => {
    //initializes variables
    const [name, setName] = useState("");
    const [prep, setPrep] = useState("");
    const [cooking, setCooking] = useState("");
    const [serving, setServing] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const toast = useToast();
    
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
    const handleSave = async () => {
      try {
        const data = {recName: name, prepTime: prep,
          cookTime: cooking, servings: serving,
          ingredients: ingredients, instr: instructions,
          source: "user"
        };
        const response = await axios.post("http://localhost:5001/create-recipe", data);
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
        <h1>Create a recipe</h1>
        <form id="create-form">
          <label>Recipe Name: 
            <input type="text" value={name} onChange={(evt) => setName(evt.target.value)}></input>
          </label>
          <br></br>
          <br></br>
          <label>Prep Time: 
            <input type="text" value={prep} onChange={(evt) => setPrep(evt.target.value)}></input>
          </label>
          <br></br>
          <br></br>
          <label>Cooking Time: 
            <input type="text" value={cooking} onChange={(evt) => setCooking(evt.target.value)}></input>
          </label>
          <br></br>
          <br></br>
          <label>How many plates does it serve: 
            <input type="text" value={serving} onChange={(evt) => setServing(evt.target.value)}></input>
          </label>
          <br></br>
          <p>Ingredients</p>
          <p>+ Add ingredients</p>
          <Button  bg='#9EAFBB' 
                    border="4px solid white" 
                    color="white" 
                    fontSize={30}
                    borderRadius="20px"
                    _hover={{ bg: 'white', color: '#9EAFBB', border: '4px solid #9EAFBB', cursor: 'pointer'}}
                    height="60px" 
                    paddingX="40px"
                    paddingY="20px"
                    size="lg" 
                    onClick={handleSave}
                >
                    Save
                </Button>
          <button id="cancel" type="submit" onClick={handleCancel}>CANCEL</button>
        </form>
        </>
    )
}