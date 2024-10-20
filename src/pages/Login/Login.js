import React from "react";
import "./Login.css"
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
export default function Login(){
    return (
    <>
        <div className="login-form">
                    <h1>Logo</h1>
                    <h2>Prijava</h2>
                    <form>
                        <label>Unesite Vasu email adresu</label>
                        <br></br>
                        <input id="email-input"></input>
                        <p id="error-email">da li je tacno</p>
                        <label>Unesive Vasu lozinku</label>
                        <br></br>
                        <input type="password" id="password-input"></input>
                        <p id="error-password">da li je tacno</p>
                        <Button variant="contained">Prijava</Button>
                    </form>
                    <Link to={"/register"}><p>Zelite da postanete novi korisnik? Kliknite za registraciju</p></Link>
        </div>
    </>
    )
}