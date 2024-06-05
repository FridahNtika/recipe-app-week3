import React from 'react'
import { Stack, Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();

    const handleClick = () => {
        navigate('/recipes'); 
    };

    return (
        <Box className="landing-page">
            <Stack
                spacing={6}
                align="center"
                textAlign="center"
            >
                <h1 color="white">
                    This is FlavorFinder.
                </h1>
                <h2>
                    Something flavorful awaits...
                </h2>
                <Button  
                    className= "chakra-button"
                    bg='#9EAFBB' 
                    border="4px solid white" 
                    color="white" 
                    fontSize={30}
                    borderRadius="20px"
                    _hover={{ bg: 'white', color: '#9EAFBB', border: '4px solid #9EAFBB', cursor: 'pointer'}}
                    height="60px" 
                    paddingX="40px"
                    paddingY="20px"
                    size="lg" 
                    onClick={handleClick}
                >
                    Explore Recipes
                </Button>
            </Stack>
        </Box>
    );
}

export default Home
