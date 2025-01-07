import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_url } from "../../apiurl";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./MyPonude.css";

export default function MyPonude() {
  const [ponude, setPonude] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const idPreduzece = localStorage.getItem("companyID");

    if (!idPreduzece) {
      setError("Id preduzeća nije pronađen u localStorage-u.");
      setLoading(false);
      return;
    }

    axios
      .get(`${Api_url}/api/Ponudas/preduzeceponude/${idPreduzece}`)
      .then((response) => {
        setPonude(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Greška prilikom učitavanja ponuda.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) {
    return <div>Učitavanje ponuda...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  

  return (
    <>
    <div className="offer-buttons">
        <Button
          variant="contained"
          onClick={() => navigate("/ponude/createoffer")}
        >
          Kreiraj novu ponudu
        </Button>
      </div>
    <div className="my-ponude">
      <h2>Moje Ponude</h2>
      {ponude.length > 0 ? (
        <table>
          <thead>
          <tr>
            <th
              style={{ backgroundColor: "green" }}
            >
              Datum Utovara
            </th>
            <th
              style={{ backgroundColor: "green" }}
            >
              Država Utovara
            </th>
            <th
              style={{ backgroundColor: "green" }}
            >
              Mesto Utovara
            </th>
            <th
              style={{ backgroundColor: "rgb(25,118,210)" }}
            >
              Datum Istovara
            </th>
            <th
              style={{ backgroundColor: "rgb(25,118,210)" }}
            >
              Država Istovara
            </th>
            <th
              style={{ backgroundColor: "rgb(25,118,210)" }}
            >
              Mesto Istovara
            </th>
            <th
              style={{ backgroundColor: "rgb(0, 70, 141)" }}
            >
              Dužina
            </th>
            <th
              style={{ backgroundColor: "rgb(0, 70, 141)" }}
            >
              Težina
            </th>
            <th
              style={{ backgroundColor: "rgb(0, 70, 141)" }}
            >
              Tip Kamiona
            </th>
            <th
              style={{ backgroundColor: "rgb(0, 70, 141)" }}
            >
              Vrsta nadogradnje
            </th>
            <th
              style={{ backgroundColor: "rgb(0, 70, 141)" }}
            >
              Vrsta Tereta
            </th>
            <th
              style={{ backgroundColor: "rgb(0, 70, 141)" }}
            >
              Cena
            </th>
          </tr>
          </thead>
          <tbody>
            {ponude.map((ponuda, index) => (
              <tr
                key={ponuda.ponudaId}
                onClick={() => navigate(`/offer/${ponuda.ponudaId}`)}
                style={{
                  cursor: "pointer",
                  backgroundColor: index % 2 === 0 ? "gainsboro" : "white",
                }}
              >
               <td>
                {new Date(ponuda.utovar).toLocaleDateString("sr-RS", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td>{ponuda.drzavaU}</td>
              <td>{ponuda.mestoU}</td>
              <td>
                {new Date(ponuda.istovar).toLocaleDateString("sr-RS", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td>{ponuda.drzavaI}</td>
              <td>{ponuda.mestoI}</td>
              <td>{ponuda.duzina}m</td>
              <td>{ponuda.tezina}t</td>
              <td>{ponuda.tipKamiona}</td>
              <td>{ponuda.tipNadogradnje}</td>
              <td>{ponuda.vrstaTereta}</td>
              <td>{ponuda.cena === 0 ? 'Na upit' : ponuda.cena + "€"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Nema ponuda za prikaz.</div>
      )}
    </div>
    </>
  );
}
