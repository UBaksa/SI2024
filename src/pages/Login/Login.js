import React, { useState } from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Api_url } from "../../apiurl";
import { useAppContext } from "../../context/AppContext";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUserId, setUserCompanyID } = useAppContext();
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        const emailTemplate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            toast.error("Unesite email adresu!");
            return;
        }
        if (!emailTemplate.test(email)) {
            toast.error("Email adresa nije validna.");
            return;
        }
        if (!password) {
            toast.error("Unesite lozinku!");
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
                localStorage.clear();
                
                if (userId) {
                    localStorage.setItem("id", userId);
                    localStorage.setItem("companyID", companyId);
                    localStorage.setItem("roles", JSON.stringify(roles)); 
                    localStorage.setItem("token", result.data.jwtToken); 
                    setUserId(userId);
                    setUserCompanyID(companyId);

                    toast.success("Uspešno ste prijavljeni!");
                    
                    setTimeout(() => {
                        if (companyId === "3fa85f64-5717-4562-b3fc-2c963f66afa6") {
                            navigate("/registerPreduzece");
                        } else {
                            navigate("/");
                        }
                    }, 2000); 
                }
            })
            .catch((error) => {
                if (error.response?.status === 401 && error.response.data?.requiresEmailConfirmation) {
                    toast.error("Email nije potvrđen. Proverite svoj email za link za potvrdu.");
                    return;
                }
                
                if (error.response?.data?.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Došlo je do greške. Pokušajte ponovo.");
                }
                
                
                localStorage.clear();
                setUserId(null);
                setUserCompanyID(null);
            });
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="login-form">
                <h2>Prijava</h2>
                <form>
                    <label>Unesite Vašu email adresu</label>
                    <br />
                    <input onChange={handleEmailChange} type="email" id="email-input" />
                    <br />
                    <label>Unesite Vašu lozinku</label>
                    <br />
                    <input onChange={handlePasswordChange} type="password" id="password-input" />
                    <br />
                    <Button size="large" onClick={handleLogin} variant="contained">
                        Prijava
                    </Button>
                </form>
                <Link to={"/register"}>
                    <p>Želite da postanete novi korisnik? Kliknite za registraciju</p>
                </Link>
            </div>
        </>
    );
}
