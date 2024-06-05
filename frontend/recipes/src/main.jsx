import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'


import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from "./roots/Home.jsx";
import Recipes from "./roots/Recipes.jsx";
//import MyRecipes from "./roots/MyRecipes.jsx";
import { CreateRecipe } from "./roots/CreateRecipe.jsx";
import RecipeDetails from "./roots/RecipeDetails.jsx";
import Admin from "./roots/AdminPage.jsx";
import NavBar from "./components/NavBar.jsx"


const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>,
  },
  {
    path: "/recipes",
    element:<Recipes/>,    
  },
/*   {
    path: "/my-recipes",
    element:<MyRecipes/>,    
  }, */
  {
    path: "/create-recipe",
    element:<CreateRecipe/>,    
  },
  {
    path: "/recipe-details",
    element:<RecipeDetails/>,    
  },
  {
    path: "/admin",
    element:<Admin/>,
  },
])
const container = document.getElementById("root");
const root = createRoot(container);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ChakraProvider>
        <RouterProvider router={router}/>
      </ChakraProvider>
  </React.StrictMode>,
)
