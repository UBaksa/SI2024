import React, { useState } from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Api_url } from "../../apiurl";
import { useAppContext } from "../../context/AppContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailMistake, setEmailMistake] = useState("");
    const [passwordMistake, setPasswordMistake] = useState("");
    const { setUserId } = useAppContext();
    const { setUserCompanyID } = useAppContext();
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailMistake("");
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordMistake("");
    };

    const handleLogin = () => {
        setPasswordMistake("");
        setEmailMistake("");

        const emailTemplate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            setEmailMistake("Unesite email adresu");
            return;
        }
        if (!emailTemplate.test(email)) {
            setEmailMistake("Email nije validan.");
            return;
        }
        if (password === "") {
            setPasswordMistake("Unesite lozinku!");
            return;
        }

        const loginData = {
            emailAddress: email,
            password: password,
        };

        axios
            .post(Api_url + "/api/Auth/Login", loginData)
            .then((result) => {
                const { userId, companyId, roles } = result.data; 
                if (userId) {
                    localStorage.setItem("id", userId);
                    localStorage.setItem("companyID", companyId);
                    localStorage.setItem("roles", JSON.stringify(roles)); // Čuvamo role
                    setUserId(userId);
                    setUserCompanyID(companyId);
                    navigate("/");
                }
            })
            .catch((error) => {
                console.error(error);
                if (error.response && error.response.data && error.response.data.Message) {
                    alert(error.response.data.Message);
                } else {
                    alert("Došlo je do greške. Pokušajte ponovo.");
                }
            });
    };

    return (
        <>
            <div className="login-form">
                <h2>Prijava</h2>
                <form>
                    <label>Unesite Vašu email adresu</label>
                    <br />
                    <input onChange={handleEmailChange} type="email" id="email-input" /><br></br>
                    <label>Unesite Vašu lozinku</label>
                    <br />
                    <input onChange={handlePasswordChange} type="password" id="password-input" />
                    <br/>
                    <Button size="large" onClick={handleLogin} variant="contained">Prijava</Button>
                </form>
                <Link to={"/register"}>
                    <p>Želite da postanete novi korisnik? Kliknite za registraciju</p>
                </Link>
            </div>
        </>
    );
}
