import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {CreateRecipe} from "./routes/CreateRecipe"
import {createBrowserRouter} from "react-router-dom"

const router = createBrowserRouter([
    {
      path: "/create",
      element: <CreateRecipe />
    }
  ]
);

//render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
