import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api_url } from "../../apiurl";
import { Button } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

export default function RegisterPreduzece() {
    const [companyName, setCompanyName] = useState("");
    const [companyState, setCompanyState] = useState("");
    const [companyCity, setCompanyCity] = useState("");
    const [companyMail, setCompanyMail] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    const [companyPIB, setCompanyPIB] = useState("");

    const navigate = useNavigate();
    const { userId } = useAppContext();

    const europeanCountries = [
        { code: "AL", name: "Albanija" },
        { code: "AD", name: "Andora" },
        { code: "AT", name: "Austrija" },
        { code: "BA", name: "Bosna i Hercegovina" },
        { code: "BG", name: "Bugarska" },
        { code: "HR", name: "Hrvatska" },
        { code: "CZ", name: "Češka" },
        { code: "DK", name: "Danska" },
        { code: "EE", name: "Estonija" },
        { code: "FI", name: "Finska" },
        { code: "FR", name: "Francuska" },
        { code: "DE", name: "Nemačka" },
        { code: "GR", name: "Grčka" },
        { code: "HU", name: "Mađarska" },
        { code: "IE", name: "Irska" },
        { code: "IT", name: "Italija" },
        { code: "LV", name: "Letonija" },
        { code: "LT", name: "Litvanija" },
        { code: "LU", name: "Luksemburg" },
        { code: "NL", name: "Holandija" },
        { code: "NO", name: "Norveška" },
        { code: "PL", name: "Poljska" },
        { code: "PT", name: "Portugalija" },
        { code: "RO", name: "Rumunija" },
        { code: "RS", name: "Srbija" },
        { code: "SK", name: "Slovačka" },
        { code: "SI", name: "Slovenija" },
        { code: "ES", name: "Španija" },
        { code: "SE", name: "Švedska" },
        { code: "CH", name: "Švajcarska" },
        { code: "GB", name: "Velika Britanija" },
    ];

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
        const pibRegex = /^\d{8,10}$/;

        if (!companyName) {
            toast.error("Ime preduzeća je obavezno!");
            return false;
        }
        if (!companyState) {
            toast.error("Molimo odaberite državu!");
            return false;
        }
        if (!companyCity) {
            toast.error("Grad preduzeća je obavezan!");
            return false;
        }
        if (!emailRegex.test(companyMail)) {
            toast.error("Molimo unesite ispravnu email adresu!");
            return false;
        }
        if (!phoneRegex.test(companyPhone)) {
            toast.error("Molimo unesite ispravan broj telefona!");
            return false;
        }
        if (!pibRegex.test(companyPIB)) {
            toast.error("PIB mora sadržati između 8 i 10 cifara!");
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (validateInputs()) {
            const data = {
                CompanyName: companyName,
                CompanyState: companyState,
                CompanyMail: companyMail,
                CompanyCity: companyCity,
                CompanyPIB: companyPIB,
                CompanyPhone: companyPhone,
                KorisnikIds: [localStorage.getItem("id")],
            };

            axios
                .post(Api_url + "/api/Preduzeces", data)
                .then((result) => {
                    toast.success("Kreirano preduzeće! Korisnik je uspešno dodat preduzeću.");
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                })
                .catch((error) => {
                    toast.error("Došlo je do greške prilikom registracije preduzeća.");
                    console.error(error);
                });
        }
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="registerForm">
                <h2>Registracija preduzeća</h2>
                <p>Poštovani, potrebno je nakon ulogovanja dopuniti podatke o preduzeću.</p>
                <label>Unesite ime preduzeća</label>
                <br />
                <input type="text" onChange={(e) => setCompanyName(e.target.value)} />
                <br />
                <label>Odaberite državu u kojoj se nalazi preduzeće</label>
                <br />
                <select value={companyState} onChange={(e) => setCompanyState(e.target.value)}>
                    <option value="">Odaberite državu</option>
                    {europeanCountries.map((country) => (
                        <option key={country.code} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
                <br />
                <label>Unesite grad u kojem se nalazi preduzeće</label>
                <br />
                <input type="text" onChange={(e) => setCompanyCity(e.target.value)} />
                <br />
                <label>Unesite email adresu preduzeća</label>
                <br />
                <input type="email" onChange={(e) => setCompanyMail(e.target.value)} />
                <br />
                <label>Unesite broj telefona preduzeća</label>
                <br />
                <input type="tel" onChange={(e) => setCompanyPhone(e.target.value)} />
                <br />
                <label>Unesite PIB (poreski broj preduzeća)</label>
                <br />
                <input type="number" onChange={(e) => setCompanyPIB(e.target.value)} />
                <br />
                <Button sx={{ marginTop: "1%" }} variant="contained" onClick={handleSubmit}>
                    Registrujte se
                </Button>
            </div>
        </>
    );
}
