import React from "react";
import "./Navbar.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
export default function Navbar(){

    return (
        <header className="navbar">
            <ul className="links">
                <li><Link 
                style={{ textDecoration: 'none', color: 'white' }}
                to={"/"}
                >CarGoo</Link></li>
                <li>Usluge</li>
                <li>Obavestenja</li>
                <li>Podrska</li>
                <li id="ponude"><Link 
                style={{ textDecoration: 'none', color: 'white' }}
                to={"/ponude"}>Ponude</Link></li>
            </ul>
            <ul className="login">
                <li>Srpski</li>
                <li><Link to={"/login"}><Button variant="contained">Prijava</Button></Link></li>
            </ul>
        </header>
    )
}