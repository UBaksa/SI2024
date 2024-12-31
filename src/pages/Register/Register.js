import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { Api_url } from "../../apiurl";
import axios from "axios";
import { Button } from "@mui/material";
import { useAppContext } from "../../context/AppContext";

const languages = [
    "Albanski", "Baskijski", "Beloruski", "Bosanski", "Bugarski", "Češki", 
    "Danski", "Engleski", "Estonski", "Farski", "Finski", "Flamanski", 
    "Francuski", "Frizijski", "Galicijski", "Grčki", "Holandski", "Hrvatski", 
    "Irski", "Islandaski", "Italijanski", "Katalonski", "Ladin", "Letonski", 
    "Litvanski", "Mađarski", "Makedonski", "Malteški", "Nemački", "Norveški", 
    "Poljski", "Portugalski", "Romi", "Rumunski", "Ruski", "Sardinski", 
    "Škotski galski", "Slovenački", "Slovački", "Srpski", "Španski", 
    "Švedski", "Turski", "Ukrajinski", "Velški"
];

export default function Register() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [role, setRole] = useState("");
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const { setUserId } = useAppContext();

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedLanguages((prev) => [...prev, value]);
        } else {
            setSelectedLanguages((prev) => prev.filter((lang) => lang !== value));
        }
    };

    const handleRegister = () => {
        if (firstname !== "" && lastname !== "" && email !== "" && password !== "" && number !== "") {
            const emailtemplate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const numbertemplate = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

            if (!emailtemplate.test(email)) {
                console.log("Ukucajte pravilno mail adresu!");
                return;
            }
            if (!numbertemplate.test(number)) {
                console.log("Ukucajte pravilno broj telefona!");
                return;
            }

            const data = {
                firstName: firstname,
                lastName: lastname,
                mail: email,
                password: password,
                phoneNumber: number,
                preduzeceId: "c2bb1d8b-490f-49ca-b2b4-0ade03f48919",
                roles: [role],
                languages: selectedLanguages,
            };

            axios
                .post(Api_url + "/api/Auth/Register", data)
                .then((result) => {
                    const userId = result.data.id;
                    if (userId) {
                        localStorage.setItem("id", userId);
                        setUserId(userId);
                        navigate("/registerPreduzece");
                    }
                })
                .catch((error) => console.log(error));
        } else {
            console.log("Sva polja moraju biti popunjena!");
        }
    };

    return (
        <div className="registerForm">
            <h1>Logo</h1>
            <h2>Registracija</h2>
            <label>Unesite Vase ime</label>
            <br />
            <input type="text" onChange={(e) => setFirstname(e.target.value)} />
            <br />
            <label>Unesite Vase prezime</label>
            <br />
            <input type="text" onChange={(e) => setLastname(e.target.value)} />
            <br />
            <label>Unesite Vasu email adresu</label>
            <br />
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label>Unesite Vasu lozinku</label>
            <br />
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <label>Unesite Vas broj telefona</label>
            <br />
            <input type="tel" onChange={(e) => setNumber(e.target.value)} />
            <br />
            <label>Odaberite koji tip korisnika ste</label>
            <br />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">---</option>
                <option value="Prevoznik">Prevoznik</option>
                <option value="Dispecer">Dispecer</option>
            </select>
            <br />
            <label>Odaberite jezike koje govorite</label>
            <br />
            <div className="dropdown" style={{ position: "relative" }}>
                <button type="button" onClick={toggleDropdown}>
                    {selectedLanguages.length > 0
                        ? `Govorite ${selectedLanguages.length} jezika`
                        : "Odaberite jezike"}
                </button>
                {dropdownOpen && (
                    <div className="dropdown-menu" style={{ position: "absolute", background: "#fff", border: "1px solid #ccc", padding: "10px", zIndex: 1 }}>
                        {languages.map((language) => (
                            <label key={language} style={{ display: "block", marginBottom: "5px" }}>
                                <input
                                    type="checkbox"
                                    value={language}
                                    checked={selectedLanguages.includes(language)}
                                    onChange={handleCheckboxChange}
                                />
                                {language}
                            </label>
                        ))}
                    </div>
                )}
            </div>
            <br />
            <Button variant="contained" onClick={handleRegister}>
                Registrujte se
            </Button>
        </div>
    );
}
