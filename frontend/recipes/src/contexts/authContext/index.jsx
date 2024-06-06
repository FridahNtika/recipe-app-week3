import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isEmailUser, setIsEmailUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser({ ...user });
                const isEmail = user.providerData.some(
                    (provider) => provider.providerId === 'password'
                );
                setIsEmailUser(isEmail);
                setUserLoggedIn(true);

                try {
                    const response = await axios.get(`/api/users/${user.uid}`);
                    const userData = response.data;
                    setIsAdmin(userData.isAdmin);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setIsAdmin(false);
                }
            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
                setIsEmailUser(false);
                setIsAdmin(false);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUserLoggedIn(false);
            setCurrentUser(null);
            setIsEmailUser(false);
            setIsAdmin(false);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const value = {
        userLoggedIn,
        isEmailUser,
        isAdmin,
        currentUser,
        handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
