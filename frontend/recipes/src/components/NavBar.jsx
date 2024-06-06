import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import '../styles/NavBar.css';
import { AiOutlineHome, AiOutlineCompass } from "react-icons/ai";
import { IoHeartOutline } from "react-icons/io5";
import { useMediaQuery } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Box, Flex, Icon, useColorModeValue, Tooltip } from "@chakra-ui/react"; 
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';

const LinkItems = [
  { name: 'Home', path: '/', icon: AiOutlineHome, tooltip: 'Home' },
  { name: 'Recipes', path: '/recipes', icon: AiOutlineCompass, tooltip: 'All Recipes' },
  { name: 'MyRecipes', path: '/my-recipes', icon: IoHeartOutline, tooltip: 'My Recipes' },
  { name: 'CreateNewRecipe', path: '/create-recipe', icon: IoIosAddCircleOutline, tooltip: 'Create New Recipe' },
];

const iconStyle = { color: "black" };
const iconStyleHover = { color: "white" };

const NavItem = ({ icon, path, tooltip, ...rest }) => (
  <Tooltip label={tooltip} placement='right' fontSize={25} backgroundColor= '#C5D4DF' color='black' borderRadius={15}> 
    <Link to={path} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        borderRadius="lg"
        role="group"
        className="nav-item"
        cursor="pointer"
        _hover={{
          bg: '#C5D4DF',
          color: 'white',
          borderRadius: '25px',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            ml="2"
            mt="2"
            fontSize="45"
            style={iconStyle}
            _groupHover={iconStyleHover}
            as={icon}
          />
        )}
      </Flex>
    </Link>
  </Tooltip>
);

const SideBarContent = ({ handleLogout, userLoggedIn }) => (
  <Box
    bg="#D9D9D9" 
    borderRight="1px"
    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    w={{ base: 'full', md: '100px' }}
    paddingRight="2px"
    paddingLeft="2px"
    paddingTop="8px"
    pos="fixed"
    top="0"
    left="0"
    h="100vh"
    className="sidebar"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
  >
    <Box flex="1">
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path} tooltip={link.tooltip} />
      ))}
    </Box>
    {userLoggedIn && (
      <Box display="flex" justifyContent="center" marginBottom={20}>
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </Box>
    )}
  </Box>
);

const BottomBarContent = ({ handleLogout, userLoggedIn }) => (
  <Box
    bg="#D9D9D9"
    borderTop="1px"
    borderTopColor={useColorModeValue('gray.200', 'gray.700')}
    w="full"
    pos="fixed"
    bottom="0"
    left="0"
    h="60px"
    display="flex"
    justifyContent="space-around"
    alignItems="center"
    className="bottombar"
  >
    {LinkItems.map((link) => (
      <NavItem key={link.name} icon={link.icon} path={link.path} tooltip={link.tooltip} />
    ))}
    {userLoggedIn && (
      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Log out
      </button>
    )}
  </Box>
);

const NavBar = () => {
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  const location = useLocation();
  const navigate = useNavigate();  // Initialize useNavigate hook
  const { handleLogout, userLoggedIn } = useContext(AuthContext);

  // Update the handleLogout function to include navigation
  const handleLogoutAndRedirect = () => {
    handleLogout();  // Call the original handleLogout function
    navigate('/');  // Redirect to /home
  };

  useEffect(() => {
    const body = document.body;
    if (location.pathname !== '/' && !isMobile) {
      body.style.paddingLeft = '120px'; // Adjust as needed
    } else {
      body.style.paddingLeft = '0';
    }
    return () => {
      body.style.paddingLeft = '0';
    };
  }, [location.pathname, isMobile]); // Include isMobile in the dependency array

  return (
    <>
      {isMobile ? <BottomBarContent handleLogout={handleLogoutAndRedirect} userLoggedIn={userLoggedIn} /> : <SideBarContent handleLogout={handleLogoutAndRedirect} userLoggedIn={userLoggedIn} />}
    </>
  );
};

export default NavBar;
