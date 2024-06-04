import axios from "axios";
import * as React from "react";
import {useState} from "react";

export const CreateRecipe = () => {
    //initializes variables
    const [name, setName] = useState("");
    const [prep, setPrep] = useState("");
    const [cooking, setCooking] = useState("");
    const [serving, setServing] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    
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

      } catch (error) {
        console.log("Error saving the recipe: ", error);
      }
    }

    return (
        <>
        <h1>Create a recipe</h1>
        <form id="create-form">
          <label>Recipe Name:
            <input type="text" value={name} onChange={(evt) => setName(evt.target.value)}></input>
          </label>
          <label>Prep Time:
            <input type="text" value={prep} onChange={(evt) => setPrep(evt.target.value)}></input>
          </label>
          <label>Cooking Time:
            <input type="text" value={cooking} onChange={(evt) => setCooking(evt.target.value)}></input>
          </label>
          <label>How many plates does it serve:
            <input type="text" value={serving} onChange={(evt) => setServing(evt.target.value)}></input>
          </label>
          <button type="submit" onClick={handleSave}>SAVE</button>
          <button type="submit" onClick={handleCancel}>CANCEL</button>
        </form>
        </>
    )
}