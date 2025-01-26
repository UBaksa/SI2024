import React, { useState } from "react";
import "./CreatePonudaVozila.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Api_url } from "../../apiurl";
import { toast, Toaster } from "react-hot-toast";

export default function CreatePonudaVozila() {
  const [loadingCities, setLoadingCities] = useState([]); 
  const [unloadingCities, setUnloadingCities] = useState([]); 
  const [selectedLoadingCountry, setSelectedLoadingCountry] = useState(""); 
  const [selectedUnloadingCountry, setSelectedUnloadingCountry] = useState(""); 
  const [searchLoadingCity, setSearchLoadingCity] = useState(""); 
  const [searchUnloadingCity, setSearchUnloadingCity] = useState(""); 
  const [selectedLoadingCity, setSelectedLoadingCity] = useState(""); 
  const [selectedUnloadingCity, setSelectedUnloadingCity] = useState("");
  const [loadingDate, setLoadingDate] = useState(null); 
  const [unloadingDate, setUnloadingDate] = useState(null); 
  const [radius, setRadius] = useState("");

  const navigate = useNavigate();

  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [selectedTruck, setSelectedTruck] = useState("");
  const [selectedTruckType, setSelectedTruckType] = useState("");

  const handleWeightChange = (event) => setWeight(event.target.value);
  const handleLengthChange = (event) => setLength(event.target.value);
  const handleSelectedTruckChange = (event) => setSelectedTruck(event.target.value);
  const handleSelectedTruckTypeChange = (event) => setSelectedTruckType(event.target.value);
  const handleRadiusChange = (event) => setRadius(event.target.value);

  const today = new Date();

  const config = {
    apiKey: "vnKDiOTm02HEdCGVxNizow==oDxWmEko8XXQko6X",
    url: "https://api.api-ninjas.com/v1/geocoding",
  };

  const europeanCountries = [
    { code: "AL", name: "Albanija" },
    { code: "AD", name: "Andora" },
    { code: "AT", name: "Austrija" },
    { code: "BA", name: "Bosna i Hercegovina" },
    { code: "BG", name: "Bugarska" },
    { code: "HR", name: "Hrvatska" },
    { code: "CZ", name: "Češka" },
    { code: "DK", name: "Danska" },
    { code: "EE", name: "Estonija" },
    { code: "FI", name: "Finska" },
    { code: "FR", name: "Francuska" },
    { code: "DE", name: "Nemačka" },
    { code: "GR", name: "Grčka" },
    { code: "HU", name: "Mađarska" },
    { code: "IE", name: "Irska" },
    { code: "IT", name: "Italija" },
    { code: "LV", name: "Letonija" },
    { code: "LT", name: "Litvanija" },
    { code: "LU", name: "Luksemburg" },
    { code: "NL", name: "Holandija" },
    { code: "NO", name: "Norveška" },
    { code: "PL", name: "Poljska" },
    { code: "PT", name: "Portugalija" },
    { code: "RO", name: "Rumunija" },
    { code: "RU", name: "Rusija" },
    { code: "RS", name: "Srbija" },
    { code: "SK", name: "Slovačka" },
    { code: "SI", name: "Slovenija" },
    { code: "ES", name: "Španija" },
    { code: "SE", name: "Švedska" },
    { code: "CH", name: "Švajcarska" },
    { code: "GB", name: "Velika Britanija" },
    { code: "TR", name: "Turska" },
    { code: "KZ", name: "Kazahstan" },
  ];

  const loadCities = async (city, country) => {
    try {
      const response = await fetch(
        `${config.url}?city=${city}&country=${country}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": config.apiKey,
          },
        }
      );
      const data = await response.json();
      const uniqueCities = data.reduce((acc, current) => {
        if (!acc.find((item) => item.name === current.name)) {
          acc.push(current);
        }
        return acc;
      }, []);
      return uniqueCities;
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };

  const handleSearchCity = async (e, type) => {
    const value = e.target.value.toLowerCase();
    if (type === "loading") {
      setSearchLoadingCity(value);
    } else {
      setSearchUnloadingCity(value);
    }

    if (value) {
      if (type === "loading" && selectedLoadingCountry) {
        const cities = await loadCities(value, selectedLoadingCountry);
        setLoadingCities(cities);
      } else if (type === "unloading" && selectedUnloadingCountry) {
        const cities = await loadCities(value, selectedUnloadingCountry);
        setUnloadingCities(cities);
      }
    } else {
      if (type === "loading") setLoadingCities([]);
      else setUnloadingCities([]);
    }
  };

  const handleCitySelect = (cityName, type) => {
    if (type === "loading") {
      setSelectedLoadingCity(cityName);
      setSearchLoadingCity("");
      setLoadingCities([]);
    } else {
      setSelectedUnloadingCity(cityName);
      setSearchUnloadingCity("");
      setUnloadingCities([]);
    }
  };

  const handleSubmit = () => {
    if (!selectedLoadingCountry || !selectedUnloadingCountry || 
        !selectedLoadingCity || !selectedUnloadingCity || 
        !loadingDate || !unloadingDate || !weight || !length || 
        !selectedTruck || !selectedTruckType || !radius) {
      toast.error("Sva polja moraju biti popunjena!");
      return;
    }

    const data = {
      DrzavaU: selectedLoadingCountry,
      DrzavaI: selectedUnloadingCountry,
      MestoU: selectedLoadingCity,
      MestoI: selectedUnloadingCity,
      RadiusI: radius,
      Utovar: loadingDate,
      Istovar: unloadingDate,
      Duzina: parseFloat(length),
      Tezina: parseFloat(weight),
      TipNadogradnje: selectedTruckType,
      TipKamiona: selectedTruck,
      IdPreduzeca: localStorage.getItem("companyID"),
      IdKorisnika: localStorage.getItem("id"),
      Vreme: new Date()
    };

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Niste prijavljeni!");
      navigate("/login");
      return;
    }
  
    axios
      .post(Api_url + "/api/PonudaVozilas", data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((result) => {
        console.log("Uspesno kreirana ponuda:", result.data);
        toast.success("Ponuda uspešno kreirana!");
        navigate("/ponudevozila");
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          toast.error("Niste autorizovani za ovu akciju ili je vaša sesija istekla!");
          navigate("/login");
        } else {
          console.error("Greška pri kreiranju ponude:", error);
          toast.error(error.response?.data?.message || "Došlo je do greške. Pokušajte ponovo.");
        }
      });
  };
  
  return (
    <div className="createoffer">
      <Toaster position="top-right" reverseOrder={false} />
      <h3 className="title">Mesto, datum utovara i istovara</h3>
      <div className="createoffer-loading-info">
        <h3 style={{color: "rgb(25,118,210)"}}>Izaberite državu utovara</h3>
        <select
          className="country-select"
          value={selectedLoadingCountry}
          onChange={(e) => setSelectedLoadingCountry(e.target.value)}
        >
          <option value="">Država utovara</option>
          {europeanCountries.map((country) => (
            <option key={country.code} value={country.code}>
              {`${country.code} - ${country.name}`}
            </option>
          ))}
        </select>
        <br/>

        {selectedLoadingCountry && (
          <>
            <input
              type="text"
              value={searchLoadingCity}
              onChange={(e) => handleSearchCity(e, "loading")}
              placeholder="Pretražite mesto utovara"
              style={{height:"2rem",marginTop:"2%",marginBottom:"2%",padding:"1%"}}
              className="city-input"
            />
            {searchLoadingCity && loadingCities.length > 0 && (
              <ul className="city-list">
                {loadingCities.map((city) => (
                  <li
                    key={city.name}
                    onClick={() => handleCitySelect(city.name, "loading")}
                    style={{listStyleType:"none", cursor:"pointer",fontSize:"1rem",backgroundColor:"white",width:"80%",margin:"auto"}}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
            {selectedLoadingCity && (
              <p style={{fontSize:"1rem",color: "rgb(25,118,210)"}} className="selected-city">Utovar: {selectedLoadingCity}</p>
            )}
          </>
        )}

        <h3 style={{color: "rgb(25,118,210)"}}>Izaberite državu istovara</h3>
        <select
          className="country-select"
          value={selectedUnloadingCountry}
          onChange={(e) => setSelectedUnloadingCountry(e.target.value)}
        >
          <option value="">Država istovara</option>
          {europeanCountries.map((country) => (
            <option key={country.code} value={country.code}>
              {`${country.code} - ${country.name}`}
            </option>
          ))}
        </select>
        <br/>

        {selectedUnloadingCountry && (
          <>
            <input
              type="text"
              value={searchUnloadingCity}
              onChange={(e) => handleSearchCity(e, "unloading")}
              placeholder="Pretražite mesto istovara"
              style={{height:"2rem",marginTop:"2%",marginBottom:"2%",padding:"1%"}}
              className="city-input"
            />
            {searchUnloadingCity && unloadingCities.length > 0 && (
              <ul className="city-list">
                {unloadingCities.map((city) => (
                  <li
                    key={city.name}
                    onClick={() => handleCitySelect(city.name, "unloading")}
                    style={{listStyleType:"none", cursor:"pointer",fontSize:"1rem",backgroundColor:"white",width:"80%",margin:"auto"}}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
            {selectedUnloadingCity && (
              <p style={{fontSize:"1rem",color: "rgb(25,118,210)"}}  className="selected-city">Istovar: {selectedUnloadingCity}</p>
            )}
          </>
        )}

        <div className="radius-input">
          <h3 style={{color: "rgb(25,118,210)"}}>Radius isporuke (km)</h3>
          <input
            type="number"
            value={radius}
            onChange={handleRadiusChange}
            placeholder="npr. 50"
            min="0"
            style={{height:"2rem",marginTop:"3%",marginBottom:"2%",padding:"1%"}}
          />
        </div>
      </div>

      <div className="createoffer-loading-date">
        <label>Datum utovara:</label>
        <DatePicker
          selected={loadingDate}
          onChange={(date) => setLoadingDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Datum utovara"
          minDate={today}
          className="datepicker"
        />
        <label>Datum istovara:</label>
        <DatePicker
          selected={unloadingDate}
          onChange={(date) => setUnloadingDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Datum istovara"
          minDate={loadingDate || today}
          className="datepicker"
        />
      </div>

      <h3 className="title" style={{display:"inline-block",marginTop:"1%"}}>Podaci o teretu i vrsti vozila</h3>
      <div className="createoffer-cargo-info">
        <div className="createoffer-cargo-info-load">
          <h3>Težina tereta (t)</h3>
          <input 
            type="number" 
            placeholder="npr. 24.5" 
            onChange={handleWeightChange}
            min="0"
            step="0.1"
          />
          <h3>Dužina tereta (m)</h3>
          <input 
            type="number" 
            placeholder="npr. 13.6" 
            onChange={handleLengthChange}
            min="0"
            step="0.1"
          />
        </div>
        <div className="createoffer-cargo-info-truck">
          <h3>Tip nadogradnje</h3>
          <select value={selectedTruckType} onChange={handleSelectedTruckTypeChange}>
            <option value="">---</option>
            <option value="Cerada">Cerada</option>
            <option value="Mega">Mega</option>
            <option value="Cisterna">Cisterna</option>
            <option value="Platforma">Platforma</option>
            <option value="Schuboden">Schuboden</option>
            <option value="Kiper">Kipper</option>
            <option value="Autovoz">Autovoz</option>
            <option value="Hladnjaca">Hladnjaca</option>
          </select>
          <h3>Tip vozila</h3>
          <select value={selectedTruck} onChange={handleSelectedTruckChange}>
            <option value="">---</option>
            <option value="Kombi">Kombi do 3.5t</option>
            <option value="Truk7-5">Vozilo do 7.5t</option>
            <option value="Truk12-5">Vozilo do 12.5t</option>
            <option value="Sleper">Sleper</option>
            <option value="Prikolicar">Prikolicar</option>
          </select>
        </div>
      </div>
      <Button 
        variant="contained" 
        onClick={handleSubmit} 
        style={{marginTop:"0.5%"}}
      >
        Postavite ponudu
      </Button>
    </div>
  );
}