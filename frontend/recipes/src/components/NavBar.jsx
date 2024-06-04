import React from 'react';
import '../styles/NavBar.css';
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineCompass } from "react-icons/ai";
import { IoHeartOutline } from "react-icons/io5";
import { useMediaQuery } from "@chakra-ui/react";



const NavBar = () => {

  const LinkItems = [
    { name: 'Home', icon: AiOutlineHome },
    { name: 'Recipes', icon: AiOutlineCompass },
    { name: 'MyRecipes', icon: IoHeartOutline },
  ];
  
  
  const iconStyle = { color: "black" };
  const iconStyleHover = { color: "white" };

  const NavItem = ({ icon, ...rest }) => (
    <Link href={icon.name} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="6"
        borderRadius="lg"
        role="group"
        className = "nav-item"
        cursor="pointer"
        _hover={{
          bg: '#5D4DF',
          color: 'white',
          borderRadius: '25px',
        }}
        {...rest}>
        {icon.icon && (
          <Icon
            mr="3"
            ml="3"
            mt="2"
            fontSize="45"
            style={iconStyle}
            _groupHover={iconStyleHover}
            as={icon.icon}
          />
        )}
      </Flex>
    </Link>
  );

  const SideBarContent = () => (
  
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      paddingRight="5px"
      paddingLeft="5px"
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
          <NavItem key={link.name} icon={link} />
        ))}
      </Box>
    </Box>
  );

  const BottomBarContent = () => (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
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
        <NavItem key={link.name} icon={link} />
      ))}
    </Box>
  );
  
  
  const NavBar = () => {
    const [isMobile] = useMediaQuery("(max-width: 600px)");

    return (
      <>
        {isMobile ? <BottomBarContent /> : <SideBarContent/>}
      </>
    );
  };
}

export default NavBar;
