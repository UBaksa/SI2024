import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_url } from "../../apiurl";
import "./NewKorisnik.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function NewKorisnik() {
    const [preduzeca, setPreduzeca] = useState([]);
    const [selectedPreduzeceId, setSelectedPreduzeceId] = useState(null);
    const navigate = useNavigate();
    const [korisnikData, setKorisnikData] = useState({
        firstName: "",
        lastName: "",
        mail: "",
        phoneNumber: "",
        password: "Pass12345", 
        roles: "",
        languages: ["Engleski"], 
    });

   
    useEffect(() => {
        const fetchPreduzeca = async () => {
            try {
                const response = await axios.get(`${Api_url}/api/Preduzeces`);
                setPreduzeca(response.data);
            } catch (error) {
                console.error("Greška pri dobavljanju preduzeća:", error);
            }
        };

        fetchPreduzeca();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setKorisnikData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectPreduzece = (e) => {
        setSelectedPreduzeceId(e.target.value);
        console.log("Odabrano preduzeće ID:", e.target.value);
    };

    const handleCreateKorisnik = async () => {
        if (!selectedPreduzeceId) {
            alert("Morate odabrati preduzeće!");
            return;
        }

        if (!korisnikData.roles) {
            alert("Morate odabrati ulogu korisnika!");
            return;
        }

        try {
            const newKorisnik = {
                ...korisnikData,
                preduzeceId: selectedPreduzeceId,
                roles: [korisnikData.roles], 
            };

            const response = await axios.post(`${Api_url}/api/Auth/Register`, newKorisnik);
            alert("Korisnik uspešno kreiran!");
            console.log(response.data);
        } catch (error) {
            console.error("Greška pri kreiranju korisnika:", error);
            if (error.response) {
                console.error("Odgovor servera:", error.response.data);
                alert(`Greška: ${error.response.data.title || "Neuspešno kreiranje korisnika."}`);
            }
        }
        navigate("/"); 
    };

    return (
        <div className="new-korisnik">
            <h3>Dodavanje novog korisnika</h3>
            <div className="korisnik-inputs">
                <p>Ime</p>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Ime"
                    value={korisnikData.firstName}
                    onChange={handleInputChange}
                />
                <p>Prezime</p>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Prezime"
                    value={korisnikData.lastName}
                    onChange={handleInputChange}
                />
                <p>Mail</p>
                <input
                    type="email"
                    name="mail"
                    placeholder="E-mail"
                    value={korisnikData.mail}
                    onChange={handleInputChange}
                />
                <p>Broj telefona</p>
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Broj Telefona"
                    value={korisnikData.phoneNumber}
                    onChange={handleInputChange}
                />
                <p>Odabir Uloge</p>
                <select
                    name="roles"
                    value={korisnikData.roles}
                    onChange={handleInputChange}
                >
                    <option value="">---</option>
                    <option value="Kontroler">Kontroler</option>
                    <option value="Dispecer">Dispecer</option>
                    <option value="Prevoznik">Prevoznik</option>
                </select>
            </div>
            <p>Odabir Preduzeća</p>
            <select
                value={selectedPreduzeceId}
                onChange={handleSelectPreduzece}
            >
                <option value="">---</option>
                {preduzeca.map((preduzece) => (
                    <option key={preduzece.id} value={preduzece.id}>
                        {preduzece.companyName} - {preduzece.companyCity}, {preduzece.companyState}
                    </option>
                ))}
            </select>
            <br/>
            <Button sx={{marginTop:"1%"}} variant="contained" onClick={handleCreateKorisnik}>Kreirajte</Button>
        </div>
    );
}
