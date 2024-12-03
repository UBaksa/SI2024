import React, { useState, useEffect } from "react";
import "./CreateOffer.css";



export default function App() {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCountry, setLoadingCountry] = useState("");
  const [unloadingCountry, setUnloadingCountry] = useState("");
  const [loadingCity, setLoadingCity] = useState("");
  const [unloadingCity, setUnloadingCity] = useState("");

  const config = {
    cUrl: "https://api.countrystatecity.in/v1/countries",
    ckey: "aTN2b2NkZXlrNEZtQVltalZtMzBCSWhJSURKWXFnM1NnbHZXSEIyYg==",
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const headers = new Headers();
      headers.append("X-CSCAPI-KEY", config.ckey);

      const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };

      const response = await fetch(config.cUrl, requestOptions);
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error loading countries:", error);
    }
  };

  const loadCities = async () => {
    try{
        const headers = new Headers();
        headers.append("X-CSCAPI-KEY", config.ckey);

        const requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow",
        };

        const response = await fetch(config.cUrl, requestOptions);
        const data = await response.json();
        console.log(data);
        
        setCities(data);
    }
    catch (error) {
        console.error("Error loading cities:", error);
      }
  }

  const handleLoadingCountryChange = (e) => {
    setLoadingCountry(e.target.value);
  };

  const handleUnloadingCountryChange = (e) => {
    setUnloadingCountry(e.target.value);
  };

  const handleLoadingCityChange = (e) => {
    setLoadingCity(e.target.value);
  };

  const handleUnloadingCityChange = (e) => {
    setUnloadingCity(e.target.value);
  };

  return (
    <div className="createoffer">
      <div className="createoffer-loading-info">
        <select
          className="loading-country"
          value={loadingCountry}
          onChange={handleLoadingCountryChange}
        >
          <option value="">Select Loading Country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.iso2}>
              {country.iso2}-{country.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="loading-city"
          value={loadCities}
          onChange={handleLoadingCityChange}
          placeholder="Loading City"
        />

        <select
          className="unloading-country"
          value={unloadingCountry}
          onChange={handleUnloadingCountryChange}
        >
          <option value="">Select Unloading Country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.iso2}>
              {country.iso2}-{country.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="unloading-city"
          value={loadCities}
          onChange={handleUnloadingCityChange}
          placeholder="Unloading City"
        />
      </div>
    </div>
  );
}