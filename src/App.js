import React from 'react';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar/Navbar'
import Login from './pages/Login/Login';
import {Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </div>
  );
}

export default App;
