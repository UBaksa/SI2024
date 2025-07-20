import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_url } from "../../apiurl";
import { useParams } from "react-router-dom";
import "./PreduzeceDetails.css";
import { Blocks } from 'react-loader-spinner';
import PersonOffTwoToneIcon from '@mui/icons-material/PersonOffTwoTone';

export default function PreduzeceDetails() {
  const [preduzece, setPreduzece] = useState(null);
  const [korisnici, setKorisnici] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPreduzece = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${Api_url}/api/Preduzeces/${id}`);
        setPreduzece(response.data);
        setKorisnici(response.data.korisnici || []);  
      } catch (error) {
        console.error("Greška prilikom učitavanja detalja preduzeća:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreduzece();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <Blocks
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="preduzece-details-container">
      <div className="preduzece-details">
        <h2>Detalji Preduzeća</h2>
        
        <div className="details-section">
          <table className="preduzece-table">
            <tbody>
              <tr>
                <th style={{ backgroundColor: "green" }}>Ime preduzeća</th>
                <td>{preduzece.companyName}</td>
              </tr>
              <tr>
                <th style={{ backgroundColor: "rgb(25,118,210)" }}>Država</th>
                <td>{preduzece.companyState}</td>
              </tr>
              <tr>
                <th style={{ backgroundColor: "rgb(25,118,210)" }}>Grad</th>
                <td>{preduzece.companyCity}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{preduzece.companyMail}</td>
              </tr>
              <tr>
                <th>Telefon</th>
                <td>{preduzece.companyPhone}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="users-section">
          <h3>Korisnici preduzeća</h3>
          {korisnici.length > 0 ? (
            <table className="users-table">
              <thead>
                <tr>
                  <th style={{ backgroundColor: "green" }}>Ime</th>
                  <th style={{ backgroundColor: "green" }}>Prezime</th>
                  <th style={{ backgroundColor: "rgb(25,118,210)" }}>Mail</th>
                  <th>Telefon</th>
                </tr>
              </thead>
              <tbody>
                {korisnici.map((korisnik) => (
                  <tr key={`${korisnik.preduzeceId}-${korisnik.mail}`}>
                    <td>{korisnik.firstName}</td>
                    <td>{korisnik.lastName}</td>
                    <td>{korisnik.mail}</td>
                    <td>{korisnik.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-users">
              <PersonOffTwoToneIcon className="no-users-icon" />
              <p className="no-users-text">Ovo preduzeće nema korisnika!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}