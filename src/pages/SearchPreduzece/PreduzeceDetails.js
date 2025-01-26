import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_url } from "../../apiurl";
import { useParams } from "react-router-dom";
import "./PreduzeceDetails.css";
import { Blocks } from 'react-loader-spinner'
import PersonOffTwoToneIcon from '@mui/icons-material/PersonOffTwoTone';

export default function PreduzeceDetails() {
  const [preduzece, setPreduzece] = useState(null);
  const [korisnici, setKorisnici] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPreduzece = async () => {
      try {
        const response = await axios.get(`${Api_url}/api/Preduzeces/${id}`);
        console.log("Podaci o preduzeću:", response.data); 
        setPreduzece(response.data);

        const korisnici = response.data.korisnici || []; 
        console.log("Korisnici preduzeća:", korisnici);
        setKorisnici(korisnici);  
      } catch (error) {
        console.error("Greška prilikom učitavanja detalja preduzeća:", error);
      }
    };

    fetchPreduzece();
  }, [id]);

  if (!preduzece) {
    return <div style={{margin:"auto",marginBottom:"18%"}}><Blocks
        height="300"
        width="300"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
        /></div>;;
  }

  return (
    <div className="preduzece-details">
      <h2>Detalji Preduzeća</h2>
      <table>
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
      <h3>Korisnici preduzeća</h3>
      {korisnici.length > 0 ? (
        <table>
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
              <tr key={korisnik.preduzeceId}>
                <td>{korisnik.firstName}</td>
                <td>{korisnik.lastName}</td>
                <td>{korisnik.phoneNumber}</td>
                <td>{korisnik.mail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
        <p><PersonOffTwoToneIcon style={{fontSize:"5rem",color:"red"}}/></p>
        <p style={{fontWeight:"bolder"}}>Ovo preduzece nema korisnika!</p>
        </div>
      )}
    </div>
  );
}
