import React from 'react';
import './assets/css/global.css';
import { Router } from '@reach/router';
import Header from './components/Global/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <Home path="/" />
        <Login path="/login" />
        <Signup path="/signup" />
      </Router>
    </div>
  );
}

export default App;
