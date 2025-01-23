import React from "react";
import { Routes, Route } from "react-router-dom";
import CreatePonudaVozila from "./CreatePonudaVozila";
import OfferVehicleList from "./OfferVehicleList"
export default function PonudeVozila() {
    return (
        <div className="ponude-page">
            <Routes>
                <Route path="/" element={<OfferVehicleList />} />
                {/* <Route path="/vehicleoffer" element={<OfferCard />} /> */}
                <Route path="/create-ponuda-vozila" element={<CreatePonudaVozila />} />
                {/* <Route path="/preduzeceponude" element={<MyPonude />} /> */}
                {/* <Route path="/editoffer/:id" element={<EditOffer />} /> */}
            </Routes>
        </div>
    );
}