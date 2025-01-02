import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./OfferCard.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import RoutingMachine from "./routingmachine";
import { Api_url } from "../../apiurl";

const config = {
  apiKey: "vnKDiOTm02HEdCGVxNizow==oDxWmEko8XXQko6X",
  url: "https://api.api-ninjas.com/v1/geocoding",
};

export default function OfferCard() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        const response = await axios.get(`${Api_url}/api/Ponudas/${id}`);
        setOffer(response.data);

        const { mestoU, mestoI } = response.data;
        const coordsU = await fetchCoordinates(mestoU);
        const coordsI = await fetchCoordinates(mestoI);

        if (coordsU && coordsI) {
          setRouteCoordinates([
            [coordsU.latitude, coordsU.longitude],
            [coordsI.latitude, coordsI.longitude],
          ]);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOfferData();
  }, [id]);

  const fetchCoordinates = async (location) => {
    try {
      const response = await axios.get(`${config.url}`, {
        headers: { "X-Api-Key": config.apiKey },
        params: { city: location },
      });
      console.log(`Coordinates for ${location}:`, response.data);
      return response.data?.[0];
    } catch (err) {
      console.error(`Error fetching coordinates for ${location}:`, err);
      return null;
    }
  };

  const updateDistance = (e) => {
    const routes = e.routes;
    console.log("Routes found:", routes);
    if (routes?.[0]?.summary) {
      const summary = routes[0].summary;
      console.log("Route summary:", summary);
      setDistance(Math.round(summary.totalDistance / 1000));
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        ...offer,
        cena: offer.cena + 10, // Primer izmene (možete ovo prilagoditi)
      };

      const response = await axios.put(`${Api_url}/api/Ponudas/${id}`, updatedData);
      alert("Ponuda uspešno ažurirana!");
      setOffer(response.data); // Ažuriramo lokalno stanje
    } catch (err) {
      console.error("Greška prilikom ažuriranja ponude:", err);
      alert("Greška prilikom ažuriranja ponude.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!offer) return <div>No offer found</div>;

  return (
    <div className="offer-card">
      <div className="offer-card-route-tittle">
        <h3>{offer.drzavaU} {offer.mestoU} --- {offer.drzavaI} {offer.mestoI}</h3>
      </div>
      <div className="offer-card-route-company">
        <div className="offer-card-route-company-img">
          <img alt="Company" src="https://64.media.tumblr.com/c81b84c9d9b7f972ed0d26b30e9c8809/tumblr_inline_n6tbzefUoM1qapiqu.gif" />
        </div>
        <div className="offer-card-route-company-text">
          <h3>{offer.preduzece?.companyName}</h3>
          <h5>{offer.preduzece?.companyState}, {offer.preduzece?.companyCity}</h5>
          <h5>Fax:{offer.preduzece?.companyPhone}, Mail:{offer.preduzece?.companyMail}</h5>
          <h5>PIB:{offer.preduzece?.companyPhone}</h5>
        </div>
      </div>
      {offer.preduzece?.companyID === id && (
        <div className="offer-card-update">
          <button onClick={handleUpdate} className="update-btn">Ažuriraj ponudu</button>
        </div>
      )}
      <div className="offer-card-route-user">
        <h3>Kontakt osoba</h3>
        <div className="offer-card-route-user-info">
          <div className="offer-card-route-user-info-img">
            <img alt="User" src="https://64.media.tumblr.com/c81b84c9d9b7f972ed0d26b30e9c8809/tumblr_inline_n6tbzefUoM1qapiqu.gif" />
          </div>
          <div className="offer-card-route-user-info-text">
            <h2>{offer.korisnik?.firstName} {offer.korisnik?.lastName}</h2>
            <p>Govori: <span>{offer.korisnik?.languages?.length > 0 ? offer.korisnik.languages.join(', ') : ''}</span></p>
          </div>
          <div className="offer-card-route-user-info-contact">
            <p>Tel: <span>{offer.korisnik?.phoneNumber}</span></p>
            <p>Mail: <span>{offer.korisnik?.email}</span></p>
          </div>
        </div>
      </div>
      <div className="offer-card-route-load">
        <h3>Podaci o ponudi</h3>
        <div className="offer-card-route-load-text">
          <div className="load-dimensions" style={{ marginLeft: "1%" }}>
            <h4>Duzina tereta</h4>
            <p>{offer.duzina}m</p>
            <h4>Tezina tereta</h4>
            <p>{offer.tezina}t</p>
            <h4>Vrsta robe</h4>
            <p>{offer.vrstaTereta}</p>
          </div>
          <div className="load-route">
            <h4>{offer.drzavaU} {offer.mestoU} --- {offer.drzavaI} {offer.mestoI}</h4>
            <p>Utovar: {new Date(offer.utovar).toLocaleDateString()}</p>
            <p>Istovar: {new Date(offer.istovar).toLocaleDateString()}</p>
            <h4>Cena prevoza</h4>
            <p>{offer.cena === 0 ? 'Na upit' : offer.cena}€</p>
            <h4>Udaljenost</h4>
            <p>{distance !== null ? `${distance} km` : "Loading distance..."}</p>
          </div>
          <div className="load-type" style={{ marginRight: "1%" }}>
            <h4>Tip vozila</h4>
            <p>{offer.tipKamiona}</p>
            <h4>Vrsta nadogradnje</h4>
            <p>{offer.tipNadogradnje}</p>
            <h4>Zamena paleta</h4>
            <p>{offer.zamenaPaleta}</p>
          </div>
        </div>
      </div>
      <div className="offer-card-route-map">
        {routeCoordinates.length === 2 ? (
          <MapContainer
            key={routeCoordinates.toString()}
            center={routeCoordinates[0]}
            zoom={5}
            style={{ height: "30vh", width: "100%", marginTop: "1%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <RoutingMachine waypoints={routeCoordinates} onRouteFound={updateDistance} />
          </MapContainer>
        ) : (
          <div>Loading map...</div>
        )}
      </div>
    </div>
  );
}
