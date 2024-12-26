import React from "react";
import "./OfferCard.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import RoutingMachine from "./routingmachine";

export default function OfferCard() {
    const routeCoordinates = [
        [51.505, -0.09],
        [51.5074, -0.1278],
        [51.7520, -1.2577],
        [52.2053, 0.1218]
    ];

    return (
        <div className="offer-card">
            <div className="offer-card-route-tittle">
                <h3>Flag Ljubljana --- Flag Pristina</h3>
            </div>
            <div className="offer-card-route-company">
                <div className="offer-card-route-company-img">
                    <img alt="Company" src="https://64.media.tumblr.com/c81b84c9d9b7f972ed0d26b30e9c8809/tumblr_inline_n6tbzefUoM1qapiqu.gif" />
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
                        <img alt="User" src="https://64.media.tumblr.com/c81b84c9d9b7f972ed0d26b30e9c8809/tumblr_inline_n6tbzefUoM1qapiqu.gif" />
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
            </div>
            <div className="offer-card-route-load">
                <h3>Podaci o ponudi</h3>
                <div className="offer-card-route-load-text">
                    <div className="load-dimensions" style={{marginLeft:"1%"}}>
                        <h4>Duzina tereta</h4>
                        <p>13.6m</p>
                        <h4>Tezina tereta</h4>
                        <p>24t</p>
                        <h4>Vrsta robe</h4>
                        <p>Normal</p>
                    </div>
                    <div className="load-route">
                        <h4>SI Ljubljana --- RS Pristina</h4>
                        <p>Utovar:06.12.2024-08.12.2024.</p>
                        <p>Istovar:08.12.2024-10.12.2024.</p>
                        <h4>Cena prevoza</h4>
                        <p>350e</p>
                    </div>
                    <div className="load-type" style={{marginRight:"1%"}}>
                        <h4>Tip vozila</h4>
                        <p>Sleper</p>
                        <h4>Vrsta nadogradnje</h4>
                        <p>Cerada</p>
                        <h4>Zamena paleta</h4>
                        <p>Ne</p>
                    </div>
                </div>
            </div>
            <div className="offer-card-route-map">
                <MapContainer
                    key={routeCoordinates.toString()}
                    center={[51.505, -0.09]}
                    zoom={7}
                    style={{ height: "30vh", width: "100%", marginTop: "1%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <RoutingMachine waypoints={routeCoordinates} />
                </MapContainer>
            </div>
        </div>
    );
}