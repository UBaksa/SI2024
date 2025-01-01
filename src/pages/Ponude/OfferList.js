import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_url } from "../../apiurl";
import "./OfferList.css";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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

export default function OfferList() {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterDrzavaU, setFilterDrzavaU] = useState("");
  const [filterDrzavaI, setFilterDrzavaI] = useState("");
  const [sortColumn, setSortColumn] = useState(""); 
  const [sortOrder, setSortOrder] = useState("asc"); 

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(Api_url + "/api/Ponudas")
      .then((response) => {
        setOffers(response.data);
        setFilteredOffers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = offers.filter((offer) => {
      return (
        (filterDrzavaU === "" || offer.drzavaU === filterDrzavaU) &&
        (filterDrzavaI === "" || offer.drzavaI === filterDrzavaI)
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

    setFilteredOffers(filtered);
  }, [filterDrzavaU, filterDrzavaI, offers, sortColumn, sortOrder]);

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <div className="offer-buttons">
    <Link to={"/ponude/preduzeceponude"}><Button variant="contained">Moje ponude</Button></Link>
    <Link to={"/ponude/createoffer"}><Button variant="contained" color="success">Kreiraj ponudu</Button></Link>
    </div>
    <div className="offer-list">
      <h2>Filtriranje Ponuda</h2>
      <div className="filters">
        <label>
          Država Utovara:
          <select
            value={filterDrzavaU}
            onChange={(e) => setFilterDrzavaU(e.target.value)}
          >
            <option value="">Sve države</option>
            {europeanCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.code} - {country.name}
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
            <option value="">Sve države</option>
            {europeanCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.code} - {country.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <h2>Lista Ponuda</h2>
      <table>
        <thead>
          <tr>
            <th
              style={{ backgroundColor: "green" }}
              onClick={() => handleSort("utovar")}
            >
              Datum Utovara
            </th>
            <th
              style={{ backgroundColor: "green" }}
              onClick={() => handleSort("drzavaU")}
            >
              Država Utovara
            </th>
            <th
              style={{ backgroundColor: "green" }}
              onClick={() => handleSort("mestoU")}
            >
              Mesto Utovara
            </th>
            <th
              style={{ backgroundColor: "rgb(25,118,210)" }}
              onClick={() => handleSort("istovar")}
            >
              Datum Istovara
            </th>
            <th
              style={{ backgroundColor: "rgb(25,118,210)" }}
              onClick={() => handleSort("drzavaI")}
            >
              Država Istovara
            </th>
            <th
              style={{ backgroundColor: "rgb(25,118,210)" }}
              onClick={() => handleSort("mestoI")}
            >
              Mesto Istovara
            </th>
            <th
              style={{ backgroundColor: "rgb(0, 70, 141)" }}
              onClick={() => handleSort("duzina")}
            >
              Dužina
            </th>
            <th
              style={{ backgroundColor: "rgb(0, 70, 141)" }}
              onClick={() => handleSort("tezina")}
            >
              Težina
            </th>
            <th
              style={{ backgroundColor: "rgb(0, 70, 141)" }}
              onClick={() => handleSort("tipKamiona")}
            >
              Tip Kamiona
            </th>
            <th
              style={{ backgroundColor: "rgb(0, 70, 141)" }}
              onClick={() => handleSort("tipNadogradnje")}
            >
              Vrsta nadogradnje
            </th>
            <th
              style={{ backgroundColor: "rgb(0, 70, 141)" }}
              onClick={() => handleSort("vrstaTereta")}
            >
              Vrsta Tereta
            </th>
            <th
              style={{ backgroundColor: "rgb(0, 70, 141)" }}
              onClick={() => handleSort("cena")}
            >
              Cena
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredOffers.map((offer, index) => (
            <tr
              key={offer.ponudaId}
              style={{
                backgroundColor: index % 2 === 0 ? "gainsboro" : "white",
              }}
              onClick={() => navigate(`/offer/${offer.ponudaId}`)}
            >
              <td>
                {new Date(offer.utovar).toLocaleDateString("sr-RS", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td>{offer.drzavaU}</td>
              <td>{offer.mestoU}</td>
              <td>
                {new Date(offer.istovar).toLocaleDateString("sr-RS", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td>{offer.drzavaI}</td>
              <td>{offer.mestoI}</td>
              <td>{offer.duzina}m</td>
              <td>{offer.tezina}t</td>
              <td>{offer.tipKamiona}</td>
              <td>{offer.tipNadogradnje}</td>
              <td>{offer.vrstaTereta}</td>
              <td>{offer.cena}€</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
