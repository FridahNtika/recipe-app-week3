import React, { useEffect } from 'react';
import '../styles/NavBar.css';
import { AiOutlineHome, AiOutlineCompass } from "react-icons/ai";
import { IoHeartOutline } from "react-icons/io5";
import { useMediaQuery } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Box, Flex, Icon, useColorModeValue, Tooltip } from "@chakra-ui/react"; 
import { Link, useLocation } from "react-router-dom";

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

const SideBarContent = () => (
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
  >
    <Box flex="1">
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path} tooltip={link.tooltip} />
      ))}
    </Box>
  </Box>
);

const BottomBarContent = () => (
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
  </Box>
);

const NavBar = () => {
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  const location = useLocation();

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
      {isMobile ? <BottomBarContent /> : <SideBarContent />}
    </>
  );
};

export default NavBar;
