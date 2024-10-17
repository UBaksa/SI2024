import React from "react";
import "./Navbar.css";
import { Button } from "@mui/material";
import Login from "../../pages/Login/Login";
import { Link } from "react-router-dom";
import Homepage from "../../pages/Homepage"
export default function Navbar(){

    return (
        <header className="navbar">
            <ul className="links">
                <li><Link to={"/"}>CarGoo</Link></li>
                <li>Usluge</li>
                <li>Vesti</li>
                <li>Obavestenja</li>
                <li>Podrska</li>
            </ul>
            <ul className="login">
                <li>Srpski</li>
                <li><Link to={"/login"}><Button variant="contained">Prijava</Button></Link></li>
            </ul>
        </header>
    )
}