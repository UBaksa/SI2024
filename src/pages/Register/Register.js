import React, { Fragment } from "react";
import { useState } from "react";


export default function Register(){

    const [ime,setIme] = useState("");
    const [adresa,setAdresa] = useState("");
    const [drzava,setDrzava] = useState("");
    const [pib,setPib] = useState("");
    const [oLice,setOLice] = useState("");
    const [mail,setMail] = useState("");
    const [sifra,setSifra] = useState("");

    function handleImeChange(value){
        setIme(value);
    }
    function handleAdresaChange(value){
        setAdresa(value);
    }
    function handleDrzavaChange(value){
        setDrzava(value);
    }
    function handlePibChange(value){
        setPib(value);
    }
    function handleOLiceChange(value){
        setOLice(value);
    }
    function handleMailChange(value){
        setMail(value);
    }
    function handleSifraChange(value){
        setSifra(value);
    }


    return (
        <Fragment>
            <div>
                <label>Ime Preduzeca</label>
                <input type="text" placeholder="Company name" id="imePreduzeca" onChange={(e) => handleImeChange(e.target.value)}></input><br></br>
                <label>Adresa</label>
                <input type="text" placeholder="Company Address" id="adresa" onChange={(e) => handleAdresaChange(e.target.value)}></input><br></br>
                <label>Drzava</label>
                <input type="text" placeholder="Company State" id="drzava" onChange={(e) => handleDrzavaChange(e.target.value)}></input><br></br>
                <label>Pib</label>
                <input type="numbers" placeholder="Company PIB" id="pib" onChange={(e) => handlePibChange(e.target.value)}></input><br></br>
                <label>Odgovorno lice</label>
                <input type="text" placeholder="Company Guy" id="oLice" onChange={(e) => handleOLiceChange(e.target.value)}></input><br></br>
                <label>Mail</label>
                <input type="text" placeholder="Company Mail" id="mail" onChange={(e) => handleMailChange(e.target.value)}></input><br></br>
                <label>Sifra</label>
                <input type="password" placeholder="Company password" id="password" onChange={(e) => handleSifraChange(e.target.value)}></input><br></br>
            </div>
        </Fragment>   

    )
}