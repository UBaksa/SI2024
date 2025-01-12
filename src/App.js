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
import EditProfile from "./pages/EditProfile/EditProfile"
import EditProfil from "./pages/EditProfile/EditProfil"
import NewKorisnik from "./pages/NewKorisnik/NewKorisnik"
import RemoveKorisnik from "./pages/RemoveKorisnik/RemoveKorisnik"
import SearchPreduzece from "./pages/SearchPreduzece/SearchPreduzece"
import PreduzeceDetails from "./pages/SearchPreduzece/PreduzeceDetails"
function App() {
  return (
      <div className="App">
        <AppProvider>
          <Navbar/>
            <Routes>
              <Route path='/' element={<Homepage/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/profil' element={<EditProfile/>}/>
              <Route path='/editprofil/:id' element={<EditProfil/>}/>
              <Route path='/ponude/*' element={<Ponude/>}/>
              <Route path="/offer/:id" element={<OfferCard />} />
              <Route path='/register' element={<Register/>}/>
              <Route path='/novikorisnik' element={<NewKorisnik/>}/>
              <Route path='/izbrisikorisnika' element={<RemoveKorisnik/>}/>
              <Route path='/pretragapreduzeca' element={<SearchPreduzece/>}/>
              <Route path='/pretragapreduzeca/:id' element={<PreduzeceDetails/>}/>
              <Route path='/registerPreduzece' element={<RegisterPreduzece/>}/>
            </Routes>
          <Footer/>
        </AppProvider>
      </div>
  );
}

export default App;
