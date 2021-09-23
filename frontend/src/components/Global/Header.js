import React from 'react';
import { Menu } from 'antd';
import { Link } from '@reach/router';

const Header = () => {
    return (
        <header>
            <div className="container">
                <Menu mode="horizontal">
                    <Menu.Item key="home">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="login">
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                    <Menu.Item key="signup">
                        <Link to="/signup">Signup</Link>
                    </Menu.Item>
                </Menu>
            </div>
        </header>
    );
};

export default Header;