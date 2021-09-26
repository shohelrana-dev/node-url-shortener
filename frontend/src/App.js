import React from 'react';
import './assets/css/global.css';
import { Router } from '@reach/router';
import Header from './components/Global/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/AuthRoutes/ProtectedRoute';
import PublicRoute from './components/AuthRoutes/PublicRoute';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'

function App() {

  // Alert configuration
  const AlertOptions = {
    position: 'top right',
    timeout: 3000,
    offset: '30px',
    transition: 'scale'
  }

  return (
    <AlertProvider template={AlertTemplate} {...AlertOptions}>
      <AuthProvider>
        <div className="app">
          <Header />
          <Router>
            <ProtectedRoute as={Home} path="/" />
            <PublicRoute as={Login} path="/login" />
            <PublicRoute as={Signup} path="/signup" />
          </Router>
        </div>
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
