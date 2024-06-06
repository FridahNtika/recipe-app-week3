import React, { useState } from 'react';
import { Stack, Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/login';
import '../styles/home.css';
import { FaRegCircleUser } from "react-icons/fa6";


const Home = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        navigate('/recipes');
    };

    const toggleAdminModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <Box className="landing-page">
            <Stack spacing={6} align="center" textAlign="center">
                <h1 color="white">This is FlavorFinder.</h1>
                <h2>Something flavorful awaits...</h2>
                <Button
                    className="chakra-button"
                    bg="#9EAFBB"
                    border="4px solid white"
                    color="white"
                    fontSize={30}
                    borderRadius="20px"
                    _hover={{ bg: 'white', color: '#9EAFBB', border: '4px solid #9EAFBB', cursor: 'pointer' }}
                    height="60px"
                    paddingX="30px"
                    paddingY="10px"
                    size="lg"
                    onClick={handleClick}
                >
                    Explore Recipes
                </Button>
                <Button
                    className="chakra-button"
                    onClick={toggleAdminModal}
                    bg="#9EAFBB"
                    border="4px solid white"
                    color="white"
                    fontSize={20}
                    borderRadius="20px"
                    _hover={{ bg: 'white', color: '#9EAFBB', border: '4px solid #9EAFBB', cursor: 'pointer' }}
                    height="45px"
                    paddingX="20px"
                    paddingY="15px"
                    position = "absolute"
                    top= "10px"
                    right= "10px"
                >
                      <span style={{ marginRight: '10px' }}>Admin/User Login</span>
                        <span><FaRegCircleUser /></span>
                </Button>
                {isModalOpen && <Login toggleAdminModal={toggleAdminModal} />}
            </Stack>
        </Box>
    );
};

export default Home;
