import React from "react";
import { Routes, Route } from "react-router-dom";
import OfferCard from "../../components/Cards/OfferCard";
import CreateOffer from "../../components/CreateOffer/CreateOffer";

export default function Ponude() {
    return (
        <div className="ponude-page">            
            <Routes>
                <Route path="/" element={<h2>Lista ponuda</h2>} />
                <Route path="/offer" element={<OfferCard />} /> 
                <Route path="/createoffer" element={<CreateOffer />} /> 
            </Routes>
        </div>
    );
}
