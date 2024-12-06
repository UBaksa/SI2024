import React, { useState } from "react";
import "./CreateOffer.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";

export default function CreateOffer() {
  const [loadingCities, setLoadingCities] = useState([]); // Gradovi za utovar
  const [unloadingCities, setUnloadingCities] = useState([]); // Gradovi za istovar
  const [selectedLoadingCountry, setSelectedLoadingCountry] = useState(""); // Odabrana zemlja za utovar
  const [selectedUnloadingCountry, setSelectedUnloadingCountry] = useState(""); // Odabrana zemlja za istovar
  const [searchLoadingCity, setSearchLoadingCity] = useState(""); // Pretraga za gradove utovara
  const [searchUnloadingCity, setSearchUnloadingCity] = useState(""); // Pretraga za gradove istovara
  const [selectedLoadingCity, setSelectedLoadingCity] = useState(""); // Odabrani grad za utovar
  const [selectedUnloadingCity, setSelectedUnloadingCity] = useState(""); // Odabrani grad za istovar
  const [loadingDate, setLoadingDate] = useState(null); // Datum utovara
  const [unloadingDate, setUnloadingDate] = useState(null); 


  const [weight,setWeight] = useState("")
  const [lenght,setLenght] = useState("")
  const [cargoType,setCargoType] = useState("")
  const [pallets,setPallets] = useState("")
  const [selectedTruck,setSelectedTruck] = useState("")
  const [selectedTruckType,setSelectedTruckType] = useState("")
  const [price,setPrice] = useState("")

  const handleWeightChange = (event) => setWeight(event.target.value);
  const handleLengthChange = (event) => setLenght(event.target.value);
  const handleCargoTypeChange = (event) => setCargoType(event.target.value);
  const handlePalletsChange = (event) => setPallets(event.target.value);
  const handleSelectedTruckChange = (event) => setSelectedTruck(event.target.value);
  const handleSelectedTruckTypeChange = (event) => setSelectedTruckType(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);


  const today = new Date();//tr vreme

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
    { code: "RS", name: "Srbija" },
    { code: "SK", name: "Slovačka" },
    { code: "SI", name: "Slovenija" },
    { code: "ES", name: "Španija" },
    { code: "SE", name: "Švedska" },
    { code: "CH", name: "Švajcarska" },
    { code: "GB", name: "Velika Britanija" },
  ];

  // Funkcija za učitavanje gradova prema pretrazi
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

  // f-ja za pretragu gradova
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
    } else {
      setSelectedUnloadingCity(cityName);
      setSearchUnloadingCity("");
    }
  };

  return (
    <div className="createoffer">
        <h3 className="title">Mesto, datum utovara i istovara</h3>
      <div className="createoffer-loading-info">
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
              placeholder="Utovarno mesto"
              style={{ padding: "10px", margin: "10px 0", }}
            />
            {searchLoadingCity && (
              <ul className="city-list">
                {loadingCities.map((city) => (
                  <li
                    key={city.name}
                    onClick={() => handleCitySelect(city.name, "loading")}
                    style={{listStyleType:"none", cursor:"pointer",fontSize:"1.1rem",backgroundColor:"white",width:"80%",margin:"auto"}}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
            {selectedLoadingCity && (
              <p style={{fontSize:"1.1rem", color:"rgb(25,118,210)"}}>Utovar: {selectedLoadingCity}</p>
            )}
          </>
        )}
        <br/>

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
              placeholder="Istovarno mesto"
              style={{ padding: "10px", margin: "10px 0" }}
            />
            {searchUnloadingCity && (
              <ul className="city-list">
                {unloadingCities.map((city) => (
                  <li
                    key={city.name}
                    onClick={() => handleCitySelect(city.name, "unloading")}
                    style={{listStyleType:"none", cursor:"pointer",fontSize:"1.1rem",backgroundColor:"white",width:"80%",margin:"auto"}}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
            {selectedUnloadingCity && (
              <p style={{fontSize:"1.1rem", color:"rgb(25,118,210)"}}>Istovar: {selectedUnloadingCity}</p>
            )}
          </>
        )}
      </div>
      <div className="createoffer-loading-date">
        <label>
          Datum utovara:
        </label>
        <DatePicker
          selected={loadingDate}
          onChange={(date) => setLoadingDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Datum utovara"
          minDate={today}
          className="datepicker"
        />
        <label>
          Datum istovara:
        </label>
        <DatePicker
          selected={unloadingDate}
          onChange={(date) => setUnloadingDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Datum utovara"
          minDate={today}
          className="datepicker"
        />
      </div>
      <h3 className="title" style={{display:"inline-block",marginTop:"1%"}}>Podaci o teretu i vrsti vozila</h3>
      <div className="createoffer-cargo-info">
        <div className="createoffer-cargo-info-load">
          <h3>Tezina tereta:</h3>
          <input onChange={handleWeightChange} type="text"></input>
          <h3>Duzina tereta:</h3>
          <input onChange={handleLengthChange} type="text"></input>
          <h3>Vrsta tereta:</h3>
          <input onChange={handleCargoTypeChange} type="text"></input>
          <h3>Razmena paleta</h3>
            <input onChange={handlePalletsChange} type="text"></input>
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
              <option value="kombi">Kombi do 3.5t</option>
              <option value="truck7-5">Vozilo do 7.5t</option>
              <option value="truck12-5">Vozilo do 12.5t</option>
              <option value="sleper">Sleper</option>
              <option value="prikolicar">Prikolicar</option>
            </select>
            <h3>Cena prevoza</h3>
            <input type="number" onChange={handlePriceChange}></input>
          </div>
      </div>
        <Button variant="contained" style={{marginTop:"0.5%"}}>Postavite ponudu</Button>
    </div>
  );
}
