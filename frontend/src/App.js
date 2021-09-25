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
import { PopMsgProvider } from './contexts/PopMsgContext';

function App() {

  return (
    <AuthProvider>
      <PopMsgProvider>
        <div className="app">
          <Header />
          <Router>
            <ProtectedRoute as={Home} path="/" />
            <PublicRoute as={Login} path="/login" />
            <PublicRoute as={Signup} path="/signup" />
          </Router>
        </div>
      </PopMsgProvider>
    </AuthProvider>
  );
}

export default App;
