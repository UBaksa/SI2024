import React from "react";
import { Routes, Route } from "react-router-dom";
import CreatePonudaVozila from "./CreatePonudaVozila";
import OfferVehicleList from "./OfferVehicleList"
import MyVehiclePonude from "./MyVehiclePonude";
import VehicleOffer from "./VehicleOffer";
export default function PonudeVozila() {
    return (
        <div className="ponude-page">
            <Routes>
                <Route path="/" element={<OfferVehicleList />} />
                <Route path="/vehicleoffer" element={<VehicleOffer />} />
                <Route path="/create-ponuda-vozila" element={<CreatePonudaVozila />} />
                <Route path="/preduzeceponudevozila" element={<MyVehiclePonude />} />
                {/* <Route path="/editoffer/:id" element={<EditOffer />} /> */}
            </Routes>
        </div>
    );
}