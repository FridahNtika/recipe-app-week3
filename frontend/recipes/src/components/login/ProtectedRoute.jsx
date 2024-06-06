import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';

const ProtectedRoute = ({ children }) => {
    const { userLoggedIn, isAdmin } = React.useContext(AuthContext);
    console.log(isAdmin);

    if (!userLoggedIn || !isAdmin) {
        return <Navigate to='/' replace />;
    }

    return children;
};

export default ProtectedRoute;
