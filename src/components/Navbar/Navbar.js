import React from "react";
import "./Navbar.css";
import { Button } from "@mui/material";


export default function Navbar(){

    return (
        <header className="navbar">
            <ul className="links">
                <li>CarGoo</li>
                <li>Usluge</li>
                <li>Vesti</li>
                <li>Obavestenja</li>
                <li>Podrska</li>
            </ul>
            <ul className="login">
                <li>Srpski</li>
                <li><Button variant="contained">Prijava</Button></li>
            </ul>
        </header>
    )
}