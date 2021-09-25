import React, { useContext, useState } from "react";
import axios from 'axios';
import apiEndpoints from "../api-endpoints";
import _pr from "../promiseResolver";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('auth-token') !== null);
    const [authToken, setAuthToken] = useState(localStorage.getItem('auth-token'));
    const [currentUser, setCurrentUser] = useState();


    // signup function
    async function signup(name, email, password) {
        const [resError, resData] = await _pr(axios.post(apiEndpoints.signup, { name, email, password }));
        let errors = resError?.response?.data?.errors || {};
        let errorMsg = resError?.response?.data?.message || null;
        let successMsg = resData?.data?.message || null;

        return { errors, errorMsg, successMsg };
    }

    // login function
    async function login(email, password) {
        const [resError, resData] = await _pr(axios.post(apiEndpoints.login, { email, password }));
        let errors = resError?.response?.data?.errors || {};
        let errorMsg = resError?.response?.data?.message || null;

        if (resData && !resError && !resData.data.error && resData.data.token) {
            localStorage.setItem('auth-token', resData.data.token);
            setAuthToken(resData.data.token);
            setIsLoggedIn(true);
            setCurrentUser(resData.data.user);
        }

        return { errors, errorMsg };
    }

    // logout function
    function logout() {
        localStorage.removeItem('auth-token');
        setIsLoggedIn(false);
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