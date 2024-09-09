import React from 'react';
import Login from './components/Login.js';
import Home from './components/Home.js';
import {Route, Routes} from 'react-router-dom';

const App = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
    
  )
}

export default App
