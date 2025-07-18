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
import { Blocks } from 'react-loader-spinner'

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
  const {userRoles, setUserRoles} = useAppContext();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        const response = await axios.get(`${Api_url}/api/PonudaVozilas/${id}`);
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

  if (loading) return <div style={{margin:"auto",marginBottom:"18%"}}><Blocks
  height="300"
  width="300"
  color="#1976d2"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  visible={true}
  /></div>;
  if (error) return <div>Error: {error}</div>;
  if (!offer) return <div>Nismo uspeli pronaci odabranu ponudu vozila !</div>;

  const companyId = localStorage.getItem("companyID");
  const mineOffer = offer?.idPreduzeca?.toLowerCase() === companyId?.toLowerCase();

  const handleEdit = () => {
    navigate(`/ponudevozila/editvehicleoffer/${offer.id}`);
  };
  
  const handleDelete = async () => {
    try {
      await axios.delete(`${Api_url}/api/PonudaVozilas/${offer.id}`);
      navigate('/ponudevozila'); 
    } catch (err) {
      console.error("Error deleting offer:", err);
    }
  };
  
  const isController = userRoles.includes("Kontroler"); 
  return (
    <div style={{marginBottom:"2%"}}>
     {(mineOffer || isController) && (
      <div className="edit-button">
        <Button size="medium" variant="contained" startIcon={<EditNoteIcon/>}  onClick={handleEdit}>Izmenite ponudu</Button>
        <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>Izbrisite ponudu</Button>
      </div>
    )}
    <div className="offer-card">
      <div className="offer-card-route-tittle">
        <h3>{offer.drzavaU} {offer.mestoU} --- {offer.drzavaI} {offer.mestoI}</h3>
      </div>
      <div className="offer-card-route-company">
        <div className="offer-card-route-company-img">
          <img alt="Company" src={!offer.preduzece.companyPhoto ? "https://cdn-icons-png.freepik.com/256/15368/15368439.png?semt=ais_hybrid" : offer.preduzece.companyPhoto} />
        </div>
        <div className="offer-card-route-company-text">
          <h3>{offer.preduzece?.companyName}</h3>
          <h5>{offer.preduzece?.companyState}, {offer.preduzece?.companyCity}</h5>
          <h5>Fax:{offer.preduzece?.companyPhone}, Mail:{offer.preduzece?.companyMail}</h5>
          <h5>PIB:{offer.preduzece?.companyPhone}</h5>
        </div>
      </div>
      <div className="offer-card-route-user">
        <h3>Kontakt osoba</h3>
        <div className="offer-card-route-user-info">
          <div className="offer-card-route-user-info-img">
            <img alt="User" src={!offer.korisnik.profileImagePath? "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" : offer.korisnik.profileImagePath} />
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
          </div>
          <div className="load-route">
            <h4>{offer.drzavaU} {offer.mestoU} --- {offer.drzavaI} {offer.mestoI}</h4>
            <p>Utovar: {new Date(offer.utovar).toLocaleDateString()}</p>
            <p>Istovar: {new Date(offer.istovar).toLocaleDateString()}</p>
            <h4>Udaljenost</h4>
            <p>{distance !== null ? `${distance} km` : "Ucitavanje razdaljine..."}</p>
            <h4>Radius istovara</h4>
            <p>{offer.radiusI} km</p>
          </div>
          <div className="load-type" style={{ marginRight: "1%" }}>
            <h4>Tip vozila</h4>
            <p>{offer.tipKamiona}</p>
            <h4>Vrsta nadogradnje</h4>
            <p>{offer.tipNadogradnje}</p>
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
          <div style={{margin:"auto",marginBottom:"18%"}}><Blocks
          height="300"
          width="300"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
          />
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
