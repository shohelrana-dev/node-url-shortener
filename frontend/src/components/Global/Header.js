import React from 'react';
import { Link } from '@reach/router';
import { AppBar, Container, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
    const { isLoggedIn, logout } = useAuth();
    return (
        <AppBar position="static" color="transparent">
            <Container>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <h4>URL Shortener App</h4>
                    </Typography>
                    <Button variant="outlined">
                        <Link to="/" >URL List</Link>
                    </Button>
                    {isLoggedIn || <Button variant="outlined">
                        <Link to="/login">Login</Link>
                    </Button>}
                    {isLoggedIn || <Button variant="outlined">
                        <Link to="/signup">Signup</Link>
                    </Button>}
                    {isLoggedIn && <Button variant="outlined">
                        <Link to="/logout" onClick={logout} >Logout</Link>
                    </Button>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;