import React from "react";
import "./Homepage.css";
import Navbar from "../components/Navbar/Navbar";
import videoBG from "../assets/Logistic.mp4"
import trucksPhoto from "../assets/trucksPhoto.png"
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Button } from "@mui/material";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import logoBakiTrans from "../assets/1.jpg"
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Homepage(){
    return(
        <>
        <Navbar></Navbar>
        <div className="video-background">
            <div className="video-background-overlay"></div>
            <video src={videoBG} autoPlay loop muted/>
            <div className="video-background-content">
                <h1>CarGoo platforma</h1>
                <p>Revolucionarno trziste tereta i usluga za Evropu</p>
                <Button variant="contained">Registrujte se <GroupAddIcon/></Button>
            </div>
        </div>
        <div className="cards">
            <h2>Sta Vam platforma pruza?</h2>
            <div className="cards-in">
                <div className="card">
                    <h5><TimelineIcon color="primary" sx={{ fontSize: 100 }}/></h5>
                    <h3>Jednostavan, efikasan rad</h3>
                    <p>Platforma je napravljena tako da bude prilagodljiva za sve korisnike.Brzina koriscenja i pristupa su kljucne stvari radi ustede vremena.</p>
                </div>
                <div className="card">
                    <h5><PeopleOutlineIcon color="primary" sx={{ fontSize: 100 }}/></h5>
                    <h3>Pronalazenje partnera</h3>
                    <p>Mozete pronaci pravog poslovnog partnera,da li to bio prevoznik ili proizvodjac,zasnivanje poslovnog odnosa je neminovno.</p>
                </div>
                <div className="card">
                    <h5><CurrencyExchangeIcon color="primary" sx={{ fontSize: 100 }}/></h5>
                    <h3>Rad sa proverenim kompanijama</h3>
                    <p>Nasa platforma radi sa iskljucivo proverenim fabrikama i prevoznicima,jer cilj je da korisnici imaju sto sigurnije poslovanje.</p>
                </div>
            </div>
        </div>
        <div className="services">
                <div className="services-text">
                            <img src={trucksPhoto}></img>
                            <div className="text">
                                <h3>Zasto bas CarGoo?</h3>
                                <p><b>CarGoo</b> je digitalno tržište tereta koje pruža podršku proizvodnim i trgovinskim preduzećima, špediterskim kompanijama, i prevoznicima, omogućavajući posredovanje transportnih naloga u drumskom transportu robe. Naša misija je optimizacija logističkih procesa klijenata kako bi uštedeli vreme i novac, čime olakšavamo poslovanje i poboljšavamo efikasnost.</p>
                                <h2><HowToRegIcon color="primary" sx={{ fontSize: 60 }}/>Do 10.000 medjunarodnih ponuda tokom dana.</h2>
                                <h2><LocalShippingIcon color="primary" sx={{ fontSize: 60 }}/>Do 100.000 kamiona dnevno,spremnih za utovare.</h2>    
                            </div>
                </div>
        </div>
        <div className="companies">
            <h2>Više od 10.000 međunarodno umreženih kupaca već veruje CarGoo tržištu</h2>
            <div className="companies-showing-one">
                <div className="showing-one-text">
                        <p>,,CarGoo je već 2 godine sastavni deo naše svakodnevnice. Velik broj ponuda, sigurnost i provereni poslovni partneri su razlog zašto smo se odlučili na ovu berzu tereta".</p>
                        <h3>Bakir Ujkanovic - Transport and Vehicle Manager</h3>
                </div>
                <img src={logoBakiTrans}></img>
            </div>
            <div className="companies-supporting">
                    <h3>Neka od preduzeca koja podrzavaju nas rad</h3>
                    <div className="companies-photos">
                            <img src="https://majstorimargarita.rs/wp-content/uploads/2020/05/cocacola-300x300.png"></img>
                            <img src="https://www.pinoles.com/wp-content/uploads/2022/07/kronospan.png"></img>
                            <img src="https://www.nordusdecospan.com/media/img/logo-decospan.png"></img>
                            <img src="https://lyppune.com/wp-content/uploads/2024/02/140220241707924854.png"></img>
                            <img src="https://evolog.fi/layout/evolog_logo.png"></img>
                            <img src="https://kosovajob.com/admin/companyLogos/1582299680.png"></img>
                    </div>
            </div>
        </div>
        <footer>
            <h2>©CarGoo 2024 </h2>
            <a href="https://github.com/UBaksa" target="blank"><GitHubIcon/></a>
        </footer>
        </>
)
}