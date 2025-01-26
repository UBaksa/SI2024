import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_url } from "../../apiurl";  
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./SearchPreduzece.css";
import DomainDisabledTwoToneIcon from '@mui/icons-material/DomainDisabledTwoTone';

export default function SearchPreduzece() {
  const [preduzeca, setPreduzeca] = useState([]);
  const [filteredPreduzeca, setFilteredPreduzeca] = useState([]);
  const [filter, setFilter] = useState({
    companyName: "",
    companyState: "",
    companyCity: "",
    companyId: "",  
    companyPIB: "",
  });
  const [isKontroler, setIsKontroler] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreduzeca = async () => {
      try {
        const response = await axios.get(`${Api_url}/api/Preduzeces`);
        setPreduzeca(response.data);
        setFilteredPreduzeca(response.data);
      } catch (error) {
        console.error("Greška prilikom učitavanja preduzeća:", error);
      }
    };

    fetchPreduzeca();
  }, []);

  useEffect(() => {
    const applyFilter = () => {
      const filtered = preduzeca.filter((preduzece) => {
        return (
          (filter.companyId === "" || preduzece.id.toLowerCase().includes(filter.companyId.toLowerCase())) &&
          preduzece.companyName.toLowerCase().includes(filter.companyName.toLowerCase()) &&
          preduzece.companyState.toLowerCase().includes(filter.companyState.toLowerCase()) &&
          preduzece.companyCity.toLowerCase().includes(filter.companyCity.toLowerCase()) &&
          (filter.companyPIB === "" || preduzece.companyPIB.toLowerCase().includes(filter.companyPIB.toLowerCase()))
        );
      });
      setFilteredPreduzeca(filtered);
    };

    applyFilter();
  }, [filter, preduzeca]);

  useEffect(() => {
    const roles = JSON.parse(localStorage.getItem("roles")); 
    if (roles && roles.includes("Kontroler")) {
      setIsKontroler(true); 
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handlePreduzeceClick = (id) => {
    navigate(`/pretragapreduzeca/${id}`);
  };

  const handleDeletePreduzece = async (id) => {
    const confirmDelete = window.confirm("Da li ste sigurni da želite obrisati ovo preduzeće?");
    if (confirmDelete) {
      try {
        await axios.delete(`${Api_url}/api/Preduzeces/${id}`);
        setPreduzeca(preduzeca.filter((preduzece) => preduzece.id !== id));
        setFilteredPreduzeca(filteredPreduzeca.filter((preduzece) => preduzece.id !== id));
      } catch (error) {
        console.error("Greška prilikom brisanja preduzeća:", error);
      }
    }
  };

  return (
    <div className="search-preduzece">
      <h2>Pretraga Preduzeća</h2>
      <div className="search-preduzece-inputs">
        <div className="search-preduzece-left">
        <input
          type="text"
          placeholder="Država"
          name="companyState"
          value={filter.companyState}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Grad"
          name="companyCity"
          value={filter.companyCity}
          onChange={handleInputChange}
        />
        </div>
        <br />
        <input
          type="text"
          placeholder="Naziv Preduzeća"
          name="companyName"
          value={filter.companyName}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <div className="search-preduzece-right">
        <input
          type="text"
          placeholder="ID Preduzeća"
          name="companyId"
          value={filter.companyId}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          placeholder="PIB"
          name="companyPIB"
          value={filter.companyPIB}
          onChange={handleInputChange}
        />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ backgroundColor: "green" }}>Ime preduzeća </th>
            <th style={{ backgroundColor: "rgb(25,118,210)" }}>Država</th>
            <th style={{ backgroundColor: "rgb(25,118,210)" }}>Grad</th>
            <th>PIB</th>
            <th>Detalji</th>
            {isKontroler && <th>Brisanje</th>}
          </tr>
        </thead>
        <tbody>
          {filteredPreduzeca.length === 0 ? (
            <tr>
              <td colSpan="6"><div>
                <DomainDisabledTwoToneIcon style={{fontSize:"5rem",color:"red"}}/>
                <h3>Nema preduzeca po Vasoj pretrazi</h3>
              </div></td>
            </tr>
          ) : (
            filteredPreduzeca.map((preduzece) => (
              <tr key={preduzece.id}>
                <td>{preduzece.companyName}</td>
                <td>{preduzece.companyState}</td>
                <td>{preduzece.companyCity}</td>
                <td>{preduzece.companyPIB}</td>
                <td>
                  <Button variant="contained" onClick={() => handlePreduzeceClick(preduzece.id)}>
                    Detalji
                  </Button>
                </td>
                {isKontroler && (
                  <td>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeletePreduzece(preduzece.id)}
                    >
                      Obriši
                    </Button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}