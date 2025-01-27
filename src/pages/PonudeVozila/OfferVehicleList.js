import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_url } from "../../apiurl";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import { Blocks } from 'react-loader-spinner';
import "./OfferVehicleList.css"
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Link } from "react-router-dom";
import WorkOffTwoToneIcon from '@mui/icons-material/WorkOffTwoTone';


export default function OfferVehicleList() {
  const [vehicleOffers, setVehicleOffers] = useState([]);
  const [filteredVehicleOffers, setFilteredVehicleOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterDrzavaU, setFilterDrzavaU] = useState("");
  const [filterDrzavaI, setFilterDrzavaI] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

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

  useEffect(() => {
    axios
      .get(Api_url + "/api/PonudaVozilas")
      .then((response) => {
        setVehicleOffers(response.data);
        setFilteredVehicleOffers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = vehicleOffers.filter((offer) => {
      const drzavaUFull = europeanCountries.find(
        (country) => country.code === offer.drzavaU
      )?.name;
    
      const drzavaIFull = europeanCountries.find(
        (country) => country.code === offer.drzavaI
      )?.name;
    
      return (
        (filterDrzavaU === "" || drzavaUFull === filterDrzavaU) &&
        (filterDrzavaI === "" || drzavaIFull === filterDrzavaI)
      );
    });
    

    if (sortColumn) {
      filtered = filtered.sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredVehicleOffers(filtered);
  }, [filterDrzavaU, filterDrzavaI, vehicleOffers, sortColumn, sortOrder]);

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };

  const renderSortArrow = (column) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? " ↑" : " ↓";
    }
    return null;
  };

  if (loading) {
    return <Blocks visible={true} height="80" width="80" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="offer-buttons">
        <Link to={"/ponudevozila/preduzeceponudevozila"}>
          <Button variant="contained">Moje ponude</Button>
        </Link>
        <Link to={"/ponudevozila/create-ponuda-vozila"}>
          <Button variant="contained" color="success">
            Kreiraj ponudu
          </Button>
        </Link>
      </div>
      <div className="vehicle-offer-list">
        <h3>Filtriranje ponuda vozila</h3>
        <div className="filters">
          <label>
            Država Utovara:
            <select
              value={filterDrzavaU}
              onChange={(e) => setFilterDrzavaU(e.target.value)}
            >
              <option value="">Sva polazišta</option>
              {europeanCountries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </label>
          <span
            onClick={() => {
              const temp = filterDrzavaU;
              setFilterDrzavaU(filterDrzavaI);
              setFilterDrzavaI(temp);
            }}
          >
            <CompareArrowsIcon style={{ fontSize: 70 }} />
          </span>
          <label>
            Država Istovara:
            <select
              value={filterDrzavaI}
              onChange={(e) => setFilterDrzavaI(e.target.value)}
            >
              <option value="">Sva odredišta</option>
              {europeanCountries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <h3>Lista ponuda vozila</h3>
        {filteredVehicleOffers.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
          <p><WorkOffTwoToneIcon sx={{fontSize:"5rem",color:"red"}}/></p>
          <p>Nema dostupnih vozila!</p>
        </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th 
                onClick={() => handleSort("utovar")}
                style={{ backgroundColor: "green" }}>
                  Utovar {renderSortArrow("utovar")}
                  </th>
                <th
                  onClick={() => handleSort("drzavaU")}
                  style={{ backgroundColor: "green" }}
                >
                  Država Utovara {renderSortArrow("drzavaU")}
                </th>
                <th
                  style={{ backgroundColor: "green" }}
                  onClick={() => handleSort("mestoU")}
                >
                  Mesto Utovara {renderSortArrow("mestoU")}
                </th>
                <th style={{ backgroundColor: "rgb(25,118,210)" }}>Istovar</th>
                <th
                  style={{ backgroundColor: "rgb(25,118,210)" }}
                  onClick={() => handleSort("drzavaI")}
                >
                  Država Istovara {renderSortArrow("drzavaI")}
                </th>
                <th
                  style={{ backgroundColor: "rgb(25,118,210)" }}
                  onClick={() => handleSort("mestoI")}
                >
                  Mesto Istovara {renderSortArrow("mestoI")}
                </th>
                <th>Radius Istovara</th>
                <th>Dužina</th>
                <th>Težina</th>
                <th>Tip Nadogradnje</th>
                <th>Tip Kamiona</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicleOffers.map((offer, index) => (
                <tr
                  key={offer.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "gainsboro" : "white",
                  }}
                  onClick={() => navigate(`/vehicleoffer/${offer.id}`)}
                >
                  <td>{new Date(offer.utovar).toLocaleDateString("sr-RS", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}</td>
                  <td>{offer.drzavaU}</td>
                  <td>{offer.mestoU}</td>
                  <td>{new Date(offer.istovar).toLocaleDateString("sr-RS", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}</td>
                  <td>{offer.drzavaI}</td>
                  <td>{offer.mestoI}</td>
                  <td>{offer.radiusI}km</td>
                  <td>{offer.duzina} m</td>
                  <td>{offer.tezina} t</td>
                  <td>{offer.tipNadogradnje}</td>
                  <td>{offer.tipKamiona}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
