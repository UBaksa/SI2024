import React from "react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api_url } from "../../apiurl";
import { Button } from "@mui/material";
import axios from "axios";
import { useAppContext } from "../../context/AppContext"; 


export default function RegisterPreduzece(){
    const [companyName,setCompanyName] = useState("");
    const [companyState,setCompanyState] = useState("");
    const [companyCity,setCompanyCity] = useState("");
    const [companyMail,setCompanyMail] = useState("");
    const [companyPhone,setCompanyPhone] = useState("");
    const [companyPIB,setCompanyPIB] = useState("");

    const navigate = useNavigate();
    const { userId } = useAppContext();

    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
    };

    const handleCompanyPIBChange = (event) => {
        setCompanyPIB(event.target.value);
    };

    const handleCompanyStateChange = (event) => {
        setCompanyState(event.target.value);
    };

    const handleCompanyCityChange = (event) => {
        setCompanyCity(event.target.value);
    };

    const handleCompanyMailChange = (event) => {
        setCompanyMail(event.target.value);
    };

    const handleCompanyPhoneChange = (event) => {
        setCompanyPhone(event.target.value);
    };

    

    const handleSubmit = () => {
        if (companyName !== "" && companyCity !== "" && companyMail !== "" && companyPhone !== "" && companyState !== "" && companyPIB !== "") {
            const emailtemplate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const numbertemplate = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
            // Validacija emaila.
            if (!emailtemplate.test(companyMail)) {
                console.log("Ukucajte pravilno mail adresu!");
                return; 
            }
            else if(!numbertemplate.test(companyPhone)){
                console.log("Ukucajte pravilno broj telefona!");
                return; 
            }
    }
        const data = {
            CompanyName:companyName,
            CompanyState:companyState,
            CompanyMail:companyMail,
            CompanyCity:companyCity,
            CompanyPIB:companyPIB,
            CompanyPhone:companyPhone,
            KorisnikIds:[localStorage.getItem("id")]
        };
        console.log(data);
        axios
                .post(Api_url + "/api/Preduzeces", data)
                .then((result) => {
                    console.log(result.data);
                    console.log("Kreirano preduzece,i korisnik je uspesno dodat preduzecu.");
                    navigate("/login");
                })
                .catch((error) => console.log(error));
        
}


    return (
        <>
            <div className="registerForm">
                    <h1>Logo</h1>
                    <h2>Registracija preduzeca</h2>
                    <p>Postovani,potrebno je nakon ulogovanja dopuniti podatke o preduzecu.</p>
                <label for>Unesite ime preduzeca</label>
                <br></br>
                <input type="text" onChange={handleCompanyNameChange}></input>
                <br></br>
                <label for>Unesite drzavu u kojoj se nalazi preduzece</label>
                <br></br>
                <input type="text" onChange={handleCompanyStateChange}></input>
                <br></br>
                <label for>Unesite grad u kojoj se nalazi preduzece</label>
                <br></br>
                <input type="text" onChange={handleCompanyCityChange}></input>
                <br></br>
                <label for>Unesite mail od preduzeca</label>
                <br></br>
                <input type="email" onChange={handleCompanyMailChange}></input>
                <br></br>
                <label for>Unesite broj telefona od preduzeca </label>
                <br></br>
                <input type="tel" onChange={handleCompanyPhoneChange} ></input>
                <br></br>
                <label for>Unesite PIB(poreski broj preduzeca)</label>
                <br></br>
                <input type="number" onChange={handleCompanyPIBChange} ></input>
                <br></br>
                <Button variant="contained" onClick={handleSubmit}>Registrujte se</Button>
            </div>
        </>
    )
}