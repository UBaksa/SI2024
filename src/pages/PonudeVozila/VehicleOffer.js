import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./VehicleOffer.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import RoutingMachine from "../../components/Cards/routingmachine";
import { Api_url } from "../../apiurl";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useAppContext } from "../../context/AppContext";
import { Blocks } from 'react-loader-spinner';

const config = {
  apiKey: "vnKDiOTm02HEdCGVxNizow==oDxWmEko8XXQko6X",
  url: "https://api.api-ninjas.com/v1/geocoding",
};

export default function VehicleOffer() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distance, setDistance] = useState(null);
  const { userRoles, setUserRoles } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        const response = await axios.get(`${Api_url}/api/PonudaVozilas/${id}`);
        setOffer(response.data);
        const { MestoU, MestoI } = response.data;
        const coordsU = await fetchCoordinates(MestoU);
        const coordsI = await fetchCoordinates(MestoI);

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
      return response.data?.[0]; 
    } catch (err) {
      console.error(`Error fetching coordinates for ${location}:`, err);
      return null;
    }
  };

  const updateDistance = (e) => {
    const routes = e.routes;
    if (routes?.[0]?.summary) {
      const summary = routes[0].summary;
      setDistance(Math.round(summary.totalDistance / 1000)); 
    }
  };

  if (loading) return <div style={{ margin: "auto", marginBottom: "18%" }}><Blocks height="300" width="300" color="#1976d2" ariaLabel="blocks-loading" visible={true} /></div>;
  if (error) return <div>Error: {error}</div>;
  if (!offer) return <div>Offer not found!</div>;

  const companyId = localStorage.getItem("companyID");
  const mineOffer = offer?.IdPreduzeca?.toLowerCase() === companyId?.toLowerCase();

  const handleEdit = () => {
    navigate(`/offers/edit/${offer.Id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${Api_url}/api/PonudaVozilas/${offer.Id}`);
      navigate('/offers'); 
    } catch (err) {
      console.error("Error deleting offer:", err);
    }
  };

  const isController = userRoles.includes("Kontroler"); 

  return (
    <div style={{ marginBottom: "2%" }}>
      {(mineOffer || isController) && (
        <div className="edit-button">
          <Button size="medium" variant="contained" startIcon={<EditNoteIcon />} onClick={handleEdit}>Edit Offer</Button>
          <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>Delete Offer</Button>
        </div>
      )}
      <div className="offer-card">
        <div className="offer-card-route-tittle">
          <h3>{offer.DrzavaU} {offer.MestoU} --- {offer.DrzavaI} {offer.MestoI}</h3>
        </div>
        <div className="offer-card-route-company">
          <div className="offer-card-route-company-img">
            <img alt="Company" src="https://64.media.tumblr.com/c81b84c9d9b7f972ed0d26b30e9c8809/tumblr_inline_n6tbzefUoM1qapiqu.gif" />
          </div>
          <div className="offer-card-route-company-text">
            <h3>{offer.Preduzece?.companyName}</h3>
            <h5>{offer.Preduzece?.companyState}, {offer.Preduzece?.companyCity}</h5>
            <h5>Fax: {offer.Preduzece?.companyPhone}, Mail: {offer.Preduzece?.companyMail}</h5>
            <h5>PIB: {offer.Preduzece?.companyPhone}</h5>
          </div>
        </div>
        <div className="offer-card-route-user">
          <h3>Contact Person</h3>
          <div className="offer-card-route-user-info">
            <div className="offer-card-route-user-info-img">
              <img alt="User" src="https://64.media.tumblr.com/c81b84c9d9b7f972ed0d26b30e9c8809/tumblr_inline_n6tbzefUoM1qapiqu.gif" />
            </div>
            <div className="offer-card-route-user-info-text">
              <h2>{offer.Korisnik?.firstName} {offer.Korisnik?.lastName}</h2>
              <p>Speaks: <span>{offer.Korisnik?.languages?.length > 0 ? offer.Korisnik.languages.join(', ') : ''}</span></p>
            </div>
            <div className="offer-card-route-user-info-contact">
              <p>Tel: <span>{offer.Korisnik?.phoneNumber}</span></p>
              <p>Email: <span>{offer.Korisnik?.email}</span></p>
            </div>
          </div>
        </div>
        <div className="offer-card-route-load">
          <h3>Offer Details</h3>
          <div className="offer-card-route-load-text">
            <div className="load-dimensions" style={{ marginLeft: "1%" }}>
              <h4>Length of Cargo</h4>
              <p>{offer.Duzina}m</p>
              <h4>Weight of Cargo</h4>
              <p>{offer.Tezina}t</p>
              <h4>Cargo Type</h4>
              <p>{offer.TipNadogradnje}</p>
            </div>
            <div className="load-route">
              <h4>{offer.DrzavaU} {offer.MestoU} --- {offer.DrzavaI} {offer.MestoI}</h4>
              <p>Loading: {new Date(offer.Utovar).toLocaleDateString()}</p>
              <p>Unloading: {new Date(offer.Istovar).toLocaleDateString()}</p>
              <h4>Price</h4>
              <p>{offer.Cena === 0 ? 'On Request' : offer.Cena + "€"}</p>
              <h4>Distance</h4>
              <p>{distance !== null ? `${distance} km` : "Loading distance..."}</p>
            </div>
            <div className="load-type" style={{ marginRight: "1%" }}>
              <h4>Vehicle Type</h4>
              <p>{offer.TipKamiona}</p>
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
            <div style={{ margin: "auto", marginBottom: "18%" }}><Blocks height="300" width="300" color="#4fa94d" ariaLabel="blocks-loading" visible={true} /></div>
          )}
        </div>
      </div>
    </div>
  );
}

