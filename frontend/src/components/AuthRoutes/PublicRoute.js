import React from 'react';
import { Redirect } from '@reach/router';
import { useAuth } from '../../contexts/AuthContext';

const PublicRoute = ({ as: Component, ...props }) => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Redirect to="/" noThrow />
    } else {
        return <Component {...props} />
    }
}

export default PublicRoute;