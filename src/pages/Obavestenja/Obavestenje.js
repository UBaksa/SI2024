import React from "react";
import "./Obavestenje.css"
import { Routes, Route } from "react-router-dom";
import CreateObavestenje from "./CreateObavestenje"
import ObavestenjeList from "./ObavestenjeList"
export default function Obavestenje(){
    return(
        <div className="obavestenje-page">
            <Routes>
                <Route path="/" element={<ObavestenjeList />} />
                <Route path="/create-obavestenje" element={<CreateObavestenje />} />
            </Routes>
        </div>
    )
}