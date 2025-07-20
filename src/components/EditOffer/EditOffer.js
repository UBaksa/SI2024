import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
import axios from "axios";
import { Api_url } from "../../apiurl";
import { toast, Toaster } from "react-hot-toast";

export default function EditOffer() {
  const { id } = useParams();
  const navigate = useNavigate();
  
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
  const [weight, setWeight] = useState("");
  const [lenght, setLenght] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [pallets, setPallets] = useState("");
  const [selectedTruck, setSelectedTruck] = useState("");
  const [selectedTruckType, setSelectedTruckType] = useState("");
  const [price, setPrice] = useState("");

  const handleWeightChange = (event) => setWeight(event.target.value);
  const handleLengthChange = (event) => setLenght(event.target.value);
  const handleCargoTypeChange = (event) => setCargoType(event.target.value);
  const handlePalletsChange = (event) => setPallets(event.target.value || "/");
  const handleSelectedTruckChange = (event) => setSelectedTruck(event.target.value);
  const handleSelectedTruckTypeChange = (event) => setSelectedTruckType(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);

  useEffect(() => {
    axios.get(`${Api_url}/api/Ponudas/${id}`)
      .then((response) => {
        const offer = response.data;
        setSelectedLoadingCountry(offer.drzavaU);
        setSelectedUnloadingCountry(offer.drzavaI);
        setSelectedLoadingCity(offer.mestoU);
        setSelectedUnloadingCity(offer.mestoI);
        setLoadingDate(new Date(offer.utovar));
        setUnloadingDate(new Date(offer.istovar));
        setWeight(offer.tezina.toString());
        setLenght(offer.duzina.toString());
        setCargoType(offer.vrstaTereta);
        setPallets(offer.zamenaPaleta);
        setSelectedTruck(offer.tipKamiona);
        setSelectedTruckType(offer.tipNadogradnje);
        setPrice(offer.cena.toString());
      })
      .catch((error) => {
        console.error("Error fetching offer:", error);
        toast.error("Došlo je do greške pri učitavanju ponude");
      });
  }, [id]);

  const validateForm = () => {
    let isValid = true;

    if (!selectedLoadingCountry) {
      toast.error("Izaberite državu utovara");
      isValid = false;
    }
    if (!selectedUnloadingCountry) {
      toast.error("Izaberite državu istovara");
      isValid = false;
    }
    if (!selectedLoadingCity) {
      toast.error("Izaberite grad utovara");
      isValid = false;
    }
    if (!selectedUnloadingCity) {
      toast.error("Izaberite grad istovara");
      isValid = false;
    }
    if (!loadingDate) {
      toast.error("Izaberite datum utovara");
      isValid = false;
    }
    if (!unloadingDate) {
      toast.error("Izaberite datum istovara");
      isValid = false;
    }
    if (!weight) {
      toast.error("Unesite težinu tereta");
      isValid = false;
    }
    if (!lenght) {
      toast.error("Unesite dužinu tereta");
      isValid = false;
    }
    if (!cargoType) {
      toast.error("Unesite vrstu tereta");
      isValid = false;
    }
    if (!selectedTruckType) {
      toast.error("Izaberite tip nadogradnje");
      isValid = false;
    }
    if (!selectedTruck) {
      toast.error("Izaberite tip vozila");
      isValid = false;
    }
    if (price === "") {
      toast.error("Unesite cenu (0 ako je cena na upit)");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // Format dates properly for the backend
    const formatDateForBackend = (date) => {
      return date ? date.toISOString() : null;
    };

    const data = {
      DrzavaU: selectedLoadingCountry,
      DrzavaI: selectedUnloadingCountry,
      MestoU: selectedLoadingCity,
      MestoI: selectedUnloadingCity,
      Utovar: formatDateForBackend(loadingDate),
      Istovar: formatDateForBackend(unloadingDate),
      Duzina: parseFloat(lenght),
      Tezina: parseFloat(weight),
      TipNadogradnje: selectedTruckType,
      TipKamiona: selectedTruck,
      VrstaTereta: cargoType,
      ZamenaPaleta: pallets || "/",
      Cena: price === "" ? 0 : parseInt(price)
    };

    console.log("Sending data:", JSON.stringify(data, null, 2));

    axios.put(`${Api_url}/api/Ponudas/${id}`, data)
      .then(() => {
        toast.success("Ponuda uspešno izmenjena!");
        setTimeout(() => {
          navigate("/ponude");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating offer:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          toast.error(`Greška: ${error.response.data.title}`);
          if (error.response.data.errors) {
            Object.values(error.response.data.errors).forEach(err => {
              toast.error(err.join(', '));
            });
          }
        } else {
          toast.error("Došlo je do greške pri izmeni ponude");
        }
      });
  };
    

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
    } else {
      setSelectedUnloadingCity(cityName);
      setSearchUnloadingCity("");
    }
  };

  return (
    <div className="createoffer">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="section-title">Mesto utovara i istovara</h2>
      <div className="location-section">
        <div className="country-selector">
          <h3>Država utovara</h3>
          <select
            className="country-select"
            value={selectedLoadingCountry}
            onChange={(e) => setSelectedLoadingCountry(e.target.value)}
            style={{textAlign:"center",color:"rgb(25,118,210)"}}
          >
            <option value="">Izaberite državu</option>
            {europeanCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {`${country.code} - ${country.name}`}
              </option>
            ))}
          </select>
        </div>

        {selectedLoadingCountry && (
          <>
            <div className="country-selector">
              <h3>Grad utovara</h3>
              <input
                type="text"
                className="city-search"
                value={searchLoadingCity}
                onChange={(e) => handleSearchCity(e, "loading")}
                placeholder="Unesite grad"
              />
              {searchLoadingCity && loadingCities.length > 0 && (
                <ul className="city-list">
                  {loadingCities.map((city) => (
                    <li
                      key={city.name}
                      onClick={() => handleCitySelect(city.name, "loading")}
                      style={{textAlign:"center",color:"rgb(25,118,210)"}}
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
              {selectedLoadingCity && (
                <p className="selected-city">Utovar: {selectedLoadingCity}</p>
              )}
            </div>
          </>
        )}

        <div className="country-selector">
          <h3>Država istovara</h3>
          <select
            className="country-select"
            value={selectedUnloadingCountry}
            onChange={(e) => setSelectedUnloadingCountry(e.target.value)}
            style={{textAlign:"center",color:"rgb(25,118,210)"}}
          >
            <option value="">Izaberite državu</option>
            {europeanCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {`${country.code} - ${country.name}`}
              </option>
            ))}
          </select>
        </div>

        {selectedUnloadingCountry && (
          <>
            <div className="country-selector">
              <h3>Grad istovara</h3>
              <input
                type="text"
                className="city-search"
                value={searchUnloadingCity}
                onChange={(e) => handleSearchCity(e, "unloading")}
                placeholder="Unesite grad"
              />
              {searchUnloadingCity && unloadingCities.length > 0 && (
                <ul className="city-list">
                  {unloadingCities.map((city) => (
                    <li
                      key={city.name}
                      onClick={() => handleCitySelect(city.name, "unloading")}
                      style={{textAlign:"center",color:"rgb(25,118,210)"}}
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
              {selectedUnloadingCity && (
                <p className="selected-city">Istovar: {selectedUnloadingCity}</p>
              )}
            </div>
          </>
        )}
      </div>
      <h2 className="section-title">Datumi utovara i istovara</h2>
      <div className="date-section">
        <div className="date-picker-group">
          <div className="date-picker-container">
            <label>Datum utovara</label>
            <DatePicker
              selected={loadingDate}
              onChange={(date) => setLoadingDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Izaberite datum"
              minDate={today}
              className="datepicker"
            />
          </div>
          <div className="date-picker-container">
            <label>Datum istovara</label>
            <DatePicker
              selected={unloadingDate}
              onChange={(date) => setUnloadingDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Izaberite datum"
              minDate={today}
              className="datepicker"
            />
          </div>
        </div>
      </div>
      <h2 className="section-title">Podaci o teretu i vozilu</h2>
      <div className="cargo-section">
        <div className="cargo-fields">
          <div className="cargo-column">
            <h3>Težina tereta (t)</h3>
            <input 
              type="text" 
              placeholder="npr. 24.5" 
              onChange={handleWeightChange} 
              value={weight}
            />
            
            <h3>Dužina tereta (m)</h3>
            <input 
              type="text" 
              placeholder="npr. 13" 
              onChange={handleLengthChange} 
              value={lenght}
            />
            
            <h3>Vrsta tereta</h3>
            <input 
              type="text" 
              placeholder="npr. iverica" 
              onChange={handleCargoTypeChange} 
              value={cargoType}
            />
            
            <h3>Razmena paleta</h3>
            <input 
              type="text" 
              placeholder="npr. da / 33 palete" 
              onChange={handlePalletsChange} 
              value={pallets}
            />
          </div>
          
          <div className="cargo-column">
            <h3>Tip nadogradnje</h3>
            <select 
              value={selectedTruckType} 
              onChange={handleSelectedTruckTypeChange}
            >
              <option value="">Izaberite tip</option>
              <option value="Cerada">Cerada</option>
              <option value="Mega">Mega</option>
              <option value="Cisterna">Cisterna</option>
              <option value="Platforma">Platforma</option>
              <option value="Schuboden">Schuboden</option>
              <option value="Kiper">Kipper</option>
              <option value="Autovoz">Autovoz</option>
              <option value="Hladnjaca">Hladnjača</option>
            </select>           
            <h3>Tip vozila</h3>
            <select 
              value={selectedTruck} 
              onChange={handleSelectedTruckChange}
            >
              <option value="">Izaberite tip</option>
              <option value="Kombi">Kombi do 3.5t</option>
              <option value="Truk7-5">Vozilo do 7.5t</option>
              <option value="Truk12-5">Vozilo do 12.5t</option>
              <option value="Sleper">Sleper</option>
              <option value="Prikolicar">Prikolicar</option>
            </select>
            <h3>Cena prevoza (€)</h3>
            <input 
              type="number" 
              placeholder="npr. 2300 (0 za cenu na upit)" 
              onChange={handlePriceChange} 
              value={price}
            />
          </div>
        </div>
      </div>

      <Button 
        variant="contained" 
        onClick={handleSubmit} 
        className="submit-button"
      >
        Sačuvaj izmene
      </Button>
    </div>
  );
}