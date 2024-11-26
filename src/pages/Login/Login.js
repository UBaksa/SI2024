import React from "react";
import { useState } from "react";
import "./Login.css"
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Api_url } from "../../apiurl";

export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [emailMistake,setEmailMistake] = useState("")
    const [passwordMistake,setPasswordMistake] = useState("")
    const navigate = useNavigate();
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailMistake("");
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordMistake("");
    }

    const handleLogin = () =>{
        setPasswordMistake("");
        setEmailMistake("");

        const emailTemplate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(email === ""){
            setEmailMistake("Unesite email adresu")
        }
        if(!emailTemplate.test(email)){
            setEmailMistake("Email nije validan.")
        }
        if(password === ""){
            setPasswordMistake("Unesite lozinku!")
        }

        const loginData = {
            emailAddress : email,
            password : password
        }

        axios
            .post(Api_url + "/api/Auth/Login", loginData)
            .then((result) => {
                console.log(result.loginData);
                navigate("/");
            })
            .catch((error) =>console.log(error))
    }



    return (
    <>
        <div className="login-form">
                    <h1>Logo</h1>
                    <h2>Prijava</h2>
                    <form>
                        <label>Unesite Vasu email adresu</label>
                        <br></br>
                        <input onChange={handleEmailChange} type="email" id="email-input"></input>
                        <p id="error-email">da li je tacno</p>
                        <label>Unesive Vasu lozinku</label>
                        <br></br>
                        <input onChange={handlePasswordChange} type="password" id="password-input" ></input>
                        <p id="error-password">da li je tacno</p>
                        <Button onClick={handleLogin} variant="contained">Prijava</Button>
                    </form>
                    <Link to={"/register"}><p>Zelite da postanete novi korisnik? Kliknite za registraciju</p></Link>
        </div>
    </>
    )
}