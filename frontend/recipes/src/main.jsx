import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './contexts/authContext'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'

import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from "./roots/Home.jsx";
import Recipes from "./roots/Recipes.jsx";
import MyRecipes from "./roots/MyRecipes.jsx";
import { CreateRecipe } from "./roots/CreateRecipe.jsx";
import RecipeDetails from "./roots/RecipeDetails.jsx";
import Admin from "./roots/AdminPage.jsx";
import ChatBot from './components/ChatBot.jsx';
import NavBar from "./components/NavBar.jsx";
import ProtectedRoute from "./components/login/ProtectedRoute.jsx";
import ProtectedRouteUser from "./components/login/ProtectedRouteUser.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>,
  },
  {
    path: "/recipes",
    element:<Recipes/>,    
  },
   {
    path: "/my-recipes",
    element:<ProtectedRouteUser> <MyRecipes /> </ProtectedRouteUser>,    
  }, 
  {
    path: "/create-recipe",
    element:<ProtectedRouteUser> <CreateRecipe /> </ProtectedRouteUser>,    
  },
  {
    path: "/recipe-details/:recipeID",
    element:<RecipeDetails/>,    
  },
  {
    path: "/admin",
    element:  (<ProtectedRoute> <Admin /> </ProtectedRoute>),    
  },
  {
    path: "/temp-chatbot",
    element:<ChatBot/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <RouterProvider router={router}/>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
)
