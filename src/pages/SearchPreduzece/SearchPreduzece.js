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
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.delete(
        `https://localhost:7083/api/Preduzeces/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      console.error('Greška prilikom brisanja preduzeća:', error);
    }
  };

  return (
    <div className="search-preduzece">
      <h2>Pretraga Preduzeća</h2>
      <div className="search-filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Naziv Preduzeća"
            name="companyName"
            value={filter.companyName}
            onChange={handleInputChange}
            style={{marginBottom:"2%"}}
          />
        </div>
        <div className="filter-row">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Država"
              name="companyState"
              value={filter.companyState}
              onChange={handleInputChange}
            />
          </div>
          <div className="filter-group">
            <input
              type="text"
              placeholder="Grad"
              name="companyCity"
              value={filter.companyCity}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-group">
            <input
              type="text"
              placeholder="ID Preduzeća(samo za Kontrolere)"
              name="companyId"
              value={filter.companyId}
              onChange={handleInputChange}
            />
          </div>
          <div className="filter-group">
            <input
              type="text"
              placeholder="PIB"
              name="companyPIB"
              value={filter.companyPIB}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ backgroundColor: "green" }}>Ime preduzeća</th>
              <th style={{ backgroundColor: "rgb(25,118,210)" }}>Država</th>
              <th style={{ backgroundColor: "rgb(25,118,210)" }}>Grad</th>
              <th>PIB</th>
              <th></th>
              {isKontroler && <th>Brisanje</th>}
            </tr>
          </thead>
          <tbody>
            {filteredPreduzeca.length === 0 ? (
              <tr>
                <td colSpan={isKontroler ? 6 : 5}>
                  <div className="no-results">
                    <DomainDisabledTwoToneIcon style={{ fontSize: "5rem", color: "red" }} />
                    <h3>Nema preduzeća po Vašoj pretrazi</h3>
                  </div>
                </td>
              </tr>
            ) : (
              filteredPreduzeca.map((preduzece) => (
                <tr key={preduzece.id}>
                  <td>{preduzece.companyName}</td>
                  <td>{preduzece.companyState}</td>
                  <td>{preduzece.companyCity}</td>
                  <td>{preduzece.companyPIB}</td>
                  <td>
                    <Button 
                      variant="contained" 
                      onClick={() => handlePreduzeceClick(preduzece.id)}
                      style={{ backgroundColor: "rgb(25,118,210)", color: "white" }}
                    >
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
    </div>
  );
}