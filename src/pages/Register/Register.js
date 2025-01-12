import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { Api_url } from "../../apiurl";
import axios from "axios";
import { Button } from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { Toaster, toast } from "react-hot-toast";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";

const languages = [
    "Albanski", "Baskijski", "Beloruski", "Bosanski", "Bugarski", "Češki",
    "Danski", "Engleski", "Estonski", "Farski", "Finski", "Flamanski",
    "Francuski", "Frizijski", "Galicijski", "Grčki", "Holandski", "Hrvatski",
    "Irski", "Islandaski", "Italijanski", "Katalonski", "Ladin", "Letonski",
    "Litvanski", "Mađarski", "Makedonski", "Malteški", "Nemački", "Norveški",
    "Poljski", "Portugalski", "Romi", "Rumunski", "Ruski", "Sardinski",
    "Škotski galski", "Slovenački", "Slovački", "Srpski", "Španski",
    "Švedski", "Turski", "Ukrajinski", "Velški",
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
        if (firstname === "" || lastname === "" || email === "" || password === "" || number === "") {
            toast.error("Sva polja moraju biti popunjena!");
            return;
        }

        const emailtemplate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const numbertemplate = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
        const isPasswordCapitalized = /^[A-Z]/.test(password);

        if (!emailtemplate.test(email)) {
            toast.error("Ukucajte pravilno email adresu!");
            return;
        }

        if (!numbertemplate.test(number)) {
            toast.error("Ukucajte pravilno broj telefona!");
            return;
        }

        if (!isPasswordCapitalized) {
            toast.error("Lozinka mora počinjati velikim slovom!");
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
                    toast.success("Uspešno ste registrovani!");
                    setTimeout(() => {
                          navigate("/registerPreduzece");
                    }, 2000);
                }
            })
            .catch((error) => {
                toast.error("Greška prilikom registracije!");
                console.error(error);
            });
    };

    return (
        <div className="registerForm">
            <h2>Registracija</h2>
            <div className="registerForm-info">
                <br />
                <label>Unesite Vase ime</label>
                <br />
                <input type="text" onChange={(e) => setFirstname(e.target.value)} />
                <br />
                <br />
                <label>Unesite Vase prezime</label>
                <br />
                <input type="text" onChange={(e) => setLastname(e.target.value)} />
                <br />
                <br />
                <label>Unesite Vasu email adresu</label>
                <br />
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
                <br />
                <br />
                <label>Unesite Vasu lozinku</label>
                <br />
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <br />
                <br />
                <label>Unesite Vas broj telefona</label>
                <br />
                <input type="tel" onChange={(e) => setNumber(e.target.value)} />
                <br />
                <br />
                <label>Odaberite koji tip korisnika ste</label>
                <br />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">---</option>
                    <option value="Prevoznik">Prevoznik</option>
                    <option value="Dispecer">Dispecer</option>
                </select>
                <br />
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
            </div>
            <br />
            <Button endIcon={<PersonAddAltTwoToneIcon />} size="small" variant="contained" onClick={handleRegister}>
                Registrujte se
            </Button>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
}
