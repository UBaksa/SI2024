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

    const handleSubmit = () => {
        if (companyName && companyCity && companyMail && companyPhone && companyState && companyPIB) {
            const emailtemplate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const numbertemplate = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

            if (!emailtemplate.test(companyMail)) {
                toast.error("Ukucajte pravilno mail adresu!");
                return;
            }
            if (!numbertemplate.test(companyPhone)) {
                toast.error("Ukucajte pravilno broj telefona!");
                return;
            }

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
                    console.log(error);
                });
        } else {
            toast.error("Sva polja moraju biti popunjena!");
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
                <label>Unesite državu u kojoj se nalazi preduzeće</label>
                <br />
                <input type="text" onChange={(e) => setCompanyState(e.target.value)} />
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
