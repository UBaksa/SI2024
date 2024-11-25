import React from 'react';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar/Navbar'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import {Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import './App.css';
import Ponude from './pages/Ponude/Ponude';

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/ponude' element={<Ponude/>}></Route>
          <Route path='/register' element={<Register/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
