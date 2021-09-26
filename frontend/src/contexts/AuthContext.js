import React, { useContext, useState } from "react";
import axios from 'axios';
import apiEndpoints from "../api-endpoints";
import _pr from "../promiseResolver";
import { useAlert } from 'react-alert';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('auth-token') !== null);
    const [authToken, setAuthToken] = useState(localStorage.getItem('auth-token'));
    const [currentUser, setCurrentUser] = useState();

    const alert = useAlert();


    // signup function
    async function signup(name, email, password) {
        const [resError, resData] = await _pr(axios.post(apiEndpoints.signup, { name, email, password }));
        let errors = resError?.response?.data?.errors || {};
        let success = resData?.data?.success || false;
        let successMsg = resData?.data?.message || null;

        return { errors, success, successMsg };
    }

    // login function
    async function login(email, password) {
        const [resError, resData] = await _pr(axios.post(apiEndpoints.login, { email, password }));
        let errors = resError?.response?.data?.errors || {};

        if (resData && !resError && !resData.data.error && resData.data.token) {
            localStorage.setItem('auth-token', resData.data.token);
            setAuthToken(resData.data.token);
            setIsLoggedIn(true);
            setCurrentUser(resData.data.user);
            alert.success('Login successfully', { position: 'top right' });
        }

        return { errors, userData: resData?.data };
    }

    // logout function
    function logout() {
        localStorage.removeItem('auth-token');
        setIsLoggedIn(false);
        alert.success('You has been logout.', { position: 'top right' });
    }

    const value = {
        authToken,
        isLoggedIn,
        currentUser,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}