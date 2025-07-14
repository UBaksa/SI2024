import React from 'react';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import './App.css';
import Ponude from './pages/Ponude/Ponude';
import RegisterPreduzece from './pages/RegisterPreduzece/RegisterPreduzece';
import { AppProvider } from "./context/AppContext";
import OfferCard from "./components/Cards/OfferCard";
import EditProfile from "./pages/EditProfile/EditProfile";
import EditProfil from "./pages/EditProfile/EditProfil";
import NewKorisnik from "./pages/NewKorisnik/NewKorisnik";
import RemoveKorisnik from "./pages/RemoveKorisnik/RemoveKorisnik";
import SearchPreduzece from "./pages/SearchPreduzece/SearchPreduzece";
import PreduzeceDetails from "./pages/SearchPreduzece/PreduzeceDetails";
import PonudeVozila from './pages/PonudeVozila/PonudeVozila';
import ProtectedRoute from './components/ProtectedRoute'; 
import VehicleOffer from './pages/PonudeVozila/VehicleOffer';
import Podrska from './pages/Podrska/Podrska';
import EditVehicleOffer from './pages/PonudeVozila/EditVehicleOffer';
function App() {
  return (
    <div className="App">
      <AppProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/podrska' element={<Podrska />} />
          <Route path='/profil' element={<ProtectedRoute roles={["Prevoznik", "Kontroler","Dispecer"]}><EditProfile /></ProtectedRoute>} />
          <Route path='/editprofil/:id' element={<ProtectedRoute roles={["Prevoznik", "Kontroler","Dispecer"]}><EditProfil /></ProtectedRoute>} />
          <Route path='/ponude/*' element={<ProtectedRoute roles={["Prevoznik", "Kontroler","Dispecer"]}><Ponude /></ProtectedRoute>} />
          <Route path='/ponudevozila/*' element={<ProtectedRoute roles={["Prevoznik", "Kontroler"]}><PonudeVozila /></ProtectedRoute>} />
          <Route path='/offer/:id' element={<ProtectedRoute roles={["Prevoznik","Kontroler","Dispecer"]}><OfferCard /></ProtectedRoute>} />
          <Route path='/vehicleoffer/:id' element={<ProtectedRoute roles={["Prevoznik","Kontroler",]}><VehicleOffer /></ProtectedRoute>} />
          <Route path='/editvehicleoffer/:id' element={<ProtectedRoute roles={["Prevoznik","Kontroler",]}><EditVehicleOffer /></ProtectedRoute>} />
          <Route path='/novikorisnik' element={<ProtectedRoute roles={["Kontroler"]}><NewKorisnik /></ProtectedRoute>} />
          <Route path='/izbrisikorisnika' element={<ProtectedRoute roles={["Kontroler"]}><RemoveKorisnik /></ProtectedRoute>} />
          <Route path='/pretragapreduzeca' element={<ProtectedRoute roles={["Prevoznik","Kontroler","Dispecer"]}><SearchPreduzece /></ProtectedRoute>} />
          <Route path='/pretragapreduzeca/:id' element={<ProtectedRoute roles={["Prevoznik","Kontroler","Dispecer"]}><PreduzeceDetails /></ProtectedRoute>} />
          <Route path='/registerPreduzece' element={<ProtectedRoute roles={["Prevoznik","Kontroler","Dispecer"]}><RegisterPreduzece /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </AppProvider>
    </div>
  );
}

export default App;
