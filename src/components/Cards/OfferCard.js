import React from "react";
import "./OfferCard.css"
import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import "leaflet-routing-machine";


export default function OfferCard(){

    const routeCoordinates = [
        [51.505, -0.09],  
        [51.5074, -0.1278], 
        [51.7520, -1.2577], 
        [52.2053, 0.1218],   
        
    ];

    
    const polylineOptions = {
        color: "blue",
        weight: 5,
        opacity: 0.7,
    };

    return(
        <div className="offer-card">
            <div className="offer-card-route-tittle">
                    <h3>Flag Ljubljana --- Flag Pristina</h3>
            </div>
            <div className="offer-card-route-company">
                <div className="offer-card-route-company-img">
               <img src="https://64.media.tumblr.com/c81b84c9d9b7f972ed0d26b30e9c8809/tumblr_inline_n6tbzefUoM1qapiqu.gif"></img>
                </div>
                <div className="offer-card-route-company-text">
                <h3>Baki Trans 2017 DOO</h3>
                <h5>Country,Post code and City</h5>
                <p>CarGoo ID:{}</p>
                </div>
            </div>
            <div className="offer-card-route-user">
            <h3>Kontakt osoba</h3>
                <div className="offer-card-route-user-info">
                    <div className="offer-card-route-user-info-img">
                   <img src="https://64.media.tumblr.com/c81b84c9d9b7f972ed0d26b30e9c8809/tumblr_inline_n6tbzefUoM1qapiqu.gif"></img>
                   </div>
                   <div className="offer-card-route-user-info-text">
                    <h2>Bakir Ujkanovic</h2>
                    <p>Language:Srpski,Engleski,Hrvatski,Nemacki</p>
                    </div>
                    <div className="offer-card-route-user-info-contact">
                        <p>Tel: +381621780187</p>
                        <p>Mail:ujkanovicbakir@gmail.com</p>
                    </div>
                </div>
                <div className="offer-card-route-user-contact"></div>
            </div>
            <div className="offer-card-route-info">
            </div>
            <div className="offer-card-route-map">
            <MapContainer center={[51.505, -0.09]} zoom={7} style={{ height: "30vh", width: "100%",marginTop:"1%" }}>        
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Polyline positions={routeCoordinates} pathOptions={polylineOptions} />
        </MapContainer>
            </div>
        </div>
    )
};