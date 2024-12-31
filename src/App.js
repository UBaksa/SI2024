import React from 'react';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar/Navbar'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import {Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import './App.css';
import Ponude from './pages/Ponude/Ponude';
import RegisterPreduzece from './pages/RegisterPreduzece/RegisterPreduzece'
import { AppProvider } from "./context/AppContext";
import OfferCard from "./components/Cards/OfferCard"

function App() {
  return (
      <div className="App">
        <AppProvider>
          <Navbar/>
            <Routes>
              <Route path='/' element={<Homepage/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/ponude/*' element={<Ponude/>}/>
              <Route path="/offer/:id" element={<OfferCard />} />
              <Route path='/register' element={<Register/>}/>
              <Route path='/registerPreduzece' element={<RegisterPreduzece/>}/>
            </Routes>
          <Footer/>
        </AppProvider>
      </div>
  );
}

export default App;
