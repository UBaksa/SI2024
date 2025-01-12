import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_url } from "../../apiurl";
import { useParams } from "react-router-dom";
import "./PreduzeceDetails.css";

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
    return <div>Učitavanje detalja...</div>;
  }

  return (
    <div className="preduzece-details">
      <h2>Detalji Preduzeća</h2>

      <table>
        <tbody>
          <tr>
            <th>Ime preduzeća</th>
            <td>{preduzece.companyName}</td>
          </tr>
          <tr>
            <th>Država</th>
            <td>{preduzece.companyState}</td>
          </tr>
          <tr>
            <th>Grad</th>
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
              <th>Ime</th>
              <th>Prezime</th>
            </tr>
          </thead>
          <tbody>
            {korisnici.map((korisnik) => (
              <tr key={korisnik.preduzeceId}>
                <td>{korisnik.firstName}</td>
                <td>{korisnik.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Trenutno nema korisnika za ovo preduzeće.</p>
      )}
    </div>
  );
}
