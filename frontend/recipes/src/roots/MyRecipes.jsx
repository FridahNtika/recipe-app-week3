import React from 'react'
import {
  Container,
  Box,
  Text,
  Wrap, 
  WrapItem 
} from '@chakra-ui/react';

const MyRecipes = () => {
  return (
    <Container>
      <Text fontSize="2xl" mb={4}>My Recipe Page</Text>
      <Wrap spacing="30px">
        <WrapItem>
          <Box 
            p={6} 
            bg="blue.500" 
            borderRadius="md" 
            width="200px" 
            _hover={{ boxShadow: 'dark-lg' }}>
            <Text color="white">Test Card 1</Text>
          </Box>
        </WrapItem>
        <WrapItem>
          <Box 
            p={6} 
            bg="blue.500" 
            borderRadius="md" 
            width="200px" 
            _hover={{ boxShadow: 'dark-lg' }}>
            <Text color="white">Test Card 2</Text>
          </Box>
        </WrapItem>
        <WrapItem>
          <Box 
            p={6} 
            bg="blue.500" 
            borderRadius="md" 
            width="200px" 
            _hover={{ boxShadow: 'dark-lg' }}>
            <Text color="white">Test Card 3</Text>
          </Box>
        </WrapItem>
        <WrapItem>
          <Box 
            p={6} 
            bg="blue.500" 
            borderRadius="md" 
            width="200px" 
            _hover={{ boxShadow: 'dark-lg' }}>
            <Text color="white">Test Card 4</Text>
          </Box>
        </WrapItem>
      </Wrap>
    </Container>
  )
}

export default MyRecipes