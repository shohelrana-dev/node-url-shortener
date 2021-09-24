import React from 'react';
import { Link } from '@reach/router';
import { AppBar, Box, Container, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static" color="transparent">
            <Container>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        URL Shortener App
                    </Typography>
                    <Button variant="outlined">
                        <Link to="/" >Home</Link>
                    </Button>
                    <Button variant="outlined">
                        <Link to="/login">Login</Link>
                    </Button>
                    <Button variant="outlined">
                        <Link to="/signup">Signup</Link>
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;