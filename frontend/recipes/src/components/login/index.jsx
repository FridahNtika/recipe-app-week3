import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../../firebase/firebase';
import { GiCook } from "react-icons/gi";
import { AuthContext } from '../../contexts/authContext';
import '../../styles/adminlogin.css';

const Login = ({ toggleAdminModal }) => {
    const { userLoggedIn, user } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    //prevent background scrolling when modal is open
    document.body.classList.add('active-modal');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            }
        }
    };


    return (
        <div className="modal">
            <div onClick={toggleAdminModal} className="overlay"></div>
            <div className="modal-content">
                {userLoggedIn && (<Navigate to={'/recipes'} replace={true} />)}

                <main className="w-full flex self-center place-content-center place-items-center">
                    <div className="admin-login-form">
                        <div className="text-center">
                            <div className="user-icon" style={{display: "flex", justifyContent: "center", paddingBottom: 20}}>
                               <GiCook/>
                            </div>
                        </div>
                        <form onSubmit={onSubmit} className="space-y-5">
                            <div>
                                <label className="text-sm text-gray-600 font-bold">Email</label>
                                <input
                                    type="email"
                                    autoComplete='email'
                                    required
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    className="w-full mt-2 admin-input"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 font-bold">Password</label>
                                <input
                                    type="password"
                                    autoComplete='current-password'
                                    required
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    className="w-full mt-2 admin-input"
                                />
                            </div>

                            {errorMessage && (
                                <span className='text-red-600 font-bold'>{errorMessage}</span>
                            )}

                            <button
                                type="submit"
                                disabled={isSigningIn}
                                className={`w-full admin-button ${isSigningIn ? 'disabled' : ''}`}
                            >
                                {isSigningIn ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                        <button className="close-modal" onClick={toggleAdminModal}>
                            Close
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Login;
