import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { useToast } from '@chakra-ui/react';
const ProtectedRoute = ({ children }) => {
  const { userLoggedIn, isAdmin } = React.useContext(AuthContext);
  const [notAuthorized, setNotAuthorized] = useState(false);
  const toast = useToast();
  useEffect(() => {
    if (!userLoggedIn || !isAdmin) {
      setNotAuthorized(true);
    } else {
      setNotAuthorized(false); 
    }
  }, [userLoggedIn, isAdmin]);
  useEffect(() => {
    if (notAuthorized) {
      toast({
        title: 'Access Denied!',
        description: 'You must be logged in as an admin to access this page.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [notAuthorized, toast]);
  if (notAuthorized) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRoute;