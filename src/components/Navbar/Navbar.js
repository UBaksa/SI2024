import React from "react";
import "./Navbar.css";

export default function Navbar(){

    return (
        <header className="navbar">
            <div className="links">
                <h3>CarGoo</h3>
                <h3>Usluge</h3>
                <h3>Vesti</h3>
                <h3>Obavestenja</h3>
                <h3>Podrska</h3>
            </div>
            <div className="login">
                <h3>Srpski</h3>
                <button>Prijava</button>
            </div>
        </header>
    )
}