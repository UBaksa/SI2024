import React from "react";
import { Routes, Route } from "react-router-dom";
import OfferList from "./OfferList";
import OfferCard from "../../components/Cards/OfferCard";
import CreateOffer from "../../components/CreateOffer/CreateOffer";
import MyPonude from "./MyPonude"
export default function Ponude() {
    return (
        <div className="ponude-page">
            <Routes>
                <Route path="/" element={<OfferList />} />
                <Route path="/offer" element={<OfferCard />} />
                <Route path="/createoffer" element={<CreateOffer />} />
                <Route path="/preduzeceponude" element={<MyPonude />} />
            </Routes>
        </div>
    );
}
