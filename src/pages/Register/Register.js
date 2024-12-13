import React from "react";
import { useState } from "react";
import "./Register.css"
import { useNavigate } from "react-router-dom";
import { Api_url } from "../../apiurl";
import axios from "axios";
import { Button } from "@mui/material";
import { useAppContext } from "../../context/AppContext";



export default function Register(){
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [number,setNumber] = useState("");
    const [role,setRole] = useState("");

    const navigate = useNavigate();
    const { setUserId } = useAppContext();

    const handleFirstname= (e) => {
        setFirstname(e.target.value)
    }
    const handleLastname = (e) => {
        setLastname(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleNumber = (e) => {
        setNumber(e.target.value)
    }
    const handleRole = (e) => {
        setRole(e.target.value)
    }

    const handleRegister = () => {
        if (firstname !== "" && lastname !== "" && email !== "" && password !== "" && number !== "") {
            const emailtemplate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const numbertemplate = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
            if (!emailtemplate.test(email)) {
                console.log("Ukucajte pravilno mail adresu!");
                return; 
            }
            else if(!numbertemplate.test(number)){
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
                roles:[role],
            };
            console.log(data);
            axios
                .post(Api_url + "/api/Auth/Register", data)
                .then((result) => {
                    console.log(result.data);
                    const userId = result.data.id;
                if (userId) {
                    localStorage.setItem("id", userId);
                }

                setUserId(userId)
                    navigate("/registerPreduzece");
                })
                .catch((error) => console.log(error));
        } else {
            console.log("Sva polja moraju biti popunjena!"); 
        }
    };
    


    return (
        <>
            <div className="registerForm">
                    <h1>Logo</h1>
                    <h2>Registracija</h2>
                <label for>Unesite Vase ime</label>
                <br></br>
                <input type="text" onChange={handleFirstname}></input>
                <br></br>
                <label for>Unesite Vase prezime</label>
                <br></br>
                <input type="text" onChange={handleLastname}></input>
                <br></br>
                <label for>Unesite Vasu email adresu</label>
                <br></br>
                <input type="email" onChange={handleEmail}></input>
                <br></br>
                <label for>Unesite Vasu lozinku</label>
                <br></br>
                <input type="password" onChange={handlePassword}></input>
                <br></br>
                <label for>Unesite Vas broj telefona</label>
                <br></br>
                <input type="tel" onChange={handleNumber} ></input>
                <br></br>
                <label for>Odaberite koji tip korisnika ste</label>
                <br></br>
                <select value={role} onChange={handleRole}>
                    <option selected value="">---</option>
                    <option value="Prevoznik">Prevoznik</option>
                    <option value="Dispecer">Dispecer</option>
                </select>
                <br></br>
                <Button variant="contained" onClick={handleRegister}>Registrujte se</Button>
            </div>
        </>
    )
}