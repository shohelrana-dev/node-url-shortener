import React from 'react';
import { Redirect } from '@reach/router';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ as: Component, ...props }) => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Component {...props} />
    } else {
        return <Redirect to="/login" noThrow />
    }
}

export default ProtectedRoute;