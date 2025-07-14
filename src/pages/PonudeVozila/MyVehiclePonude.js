import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_url } from "../../apiurl";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Blocks, Comment } from "react-loader-spinner";
import "./MyVehiclePonude.css";

export default function MyVehiclePonude() {
  const [ponudaVozila, setPonudaVozila] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const idPreduzece = localStorage.getItem("companyID");

    if (!idPreduzece) {
      setError("ID preduzeća nije pronađen u localStorage-u.");
      setLoading(false);
      return;
    }

    axios
      .get(`${Api_url}/api/PonudaVozilas/preduzeceponude/${idPreduzece}`)
      .then((response) => {
        setPonudaVozila(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Nemate kreiranih ponuda.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ margin: "auto", marginBottom: "18%" }}>
        <Blocks
          height="300"
          width="300"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ margin: "auto", marginBottom: "18%" }}>
        <Comment
          height="300"
          width="300"
          color="#1976d2"
          ariaLabel="comment-loading"
          backgroundColor="white"
          visible={true}
        />
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <>
      <div className="offer-buttons">
        <Button
          variant="contained"
          onClick={() => navigate("/ponudevozila/create-ponuda-vozila")}
        >
          Kreiraj novu ponudu vozila
        </Button>
      </div>
      <div className="my-ponudaVozila">
        <h2>Moje Ponude Vozila</h2>
        {ponudaVozila.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th style={{ backgroundColor: "green" }}>Datum Utovara</th>
                <th style={{ backgroundColor: "green" }}>Država Utovara</th>
                <th style={{ backgroundColor: "green" }}>Mesto Utovara</th>
                <th style={{ backgroundColor: "rgb(25,118,210)" }}>Datum Istovara</th>
                <th style={{ backgroundColor: "rgb(25,118,210)" }}>Država Istovara</th>
                <th style={{ backgroundColor: "rgb(25,118,210)" }}>Mesto Istovara</th>
                <th>Radius</th>
                <th>Dužina</th>
                <th>Težina</th>
                <th>Tip Kamiona</th>
                <th>Tip Nadogradnje</th>
              </tr>
            </thead>
            <tbody>
              {ponudaVozila.map((ponuda, index) => (
                <tr
                  key={ponuda.id}
                  onClick={() => navigate(`/vehicleoffer/${ponuda.id}`)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: index % 2 === 0 ? "gainsboro" : "white",
                  }}
                >
                  <td>{new Date(ponuda.utovar).toLocaleDateString("sr-RS", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}</td>
                  <td>{ponuda.drzavaU}</td>
                  <td>{ponuda.mestoU}</td>
                  <td>{new Date(ponuda.istovar).toLocaleDateString("sr-RS", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}</td>
                  <td>{ponuda.drzavaI}</td>
                  <td>{ponuda.mestoI}</td>
                  <td>{ponuda.radiusI}km</td>
                  <td>{ponuda.duzina}m</td>
                  <td>{ponuda.tezina}t</td>
                  <td>{ponuda.tipKamiona}</td>
                  <td>{ponuda.tipNadogradnje}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Nema ponuda vozila za prikaz.</div>
        )}
      </div>
    </>
  );
}
