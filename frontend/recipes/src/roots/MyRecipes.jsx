import React from 'react'
import { VStack, Box, Text } from '@chakra-ui/react';

const MyRecipes = () => {
  return (
    
    <div>
      <h1>My Recipe Page</h1>
      <VStack spacing={4} align="stretch">
      <Box 
          p={6} 
          bg="blue.500" 
          borderRadius="md" 
          width="100%" 
          _hover={{ boxShadow: 'dark-lg' }}>
          <Text color="white">Test Card</Text>
        </Box>
        <Box 
          p={6} 
          bg="blue.500" 
          borderRadius="md" 
          width="100%" 
          _hover={{ boxShadow: 'dark-lg' }}>
          <Text color="white">Test Card</Text>
        </Box>
      </VStack>
    </div>
  )
}

export default MyRecipes