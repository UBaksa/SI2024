import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./EditProfile.css"
import { Api_url } from "../../apiurl";
import { Button } from "@mui/material";
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import { Link } from "react-router-dom";


export default function EditProfile() {
    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem("id");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${Api_url}/api/Auth/user/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    return(
        <>
        <div className="edit-button">
            <Link to={`/editprofil/${userId}`}><Button variant="contained" color="success" startIcon={<ManageAccountsTwoToneIcon />}>Uredite profil</Button></Link>
        </div>
        <div className="edit-profile">
            <h2>Vas profil</h2>
            <div className="edit-profile-info">
                <div className="edit-profile-info-left">
                    <h3>Ime i Prezime</h3>
                    <p>{userData?.firstName} {userData?.lastName}</p>
                    <h3>Broj telefona</h3>
                    <p>{userData?.phoneNumber}</p>
                    <h3>Mail</h3>
                    <p>{userData?.email}</p>
                    <h3>Zaposlen kao</h3>
                    <p>{userData?.roles?.join(', ')}</p>
                    <h3>Jezici</h3>
                    <p style={{width:"50%"}}>{userData?.languages?.join(', ') || 'Nije navedeno'}</p>
                </div>
                <div className="edit-profile-info-mid">
                    <p>Slika</p>
                </div>
                <div className="edit-profile-info-right">
                    <h3>Preduzece</h3>
                    <p>{userData?.company?.companyName}</p>
                    <h3>Drzava</h3>
                    <p>{userData?.company?.companyState}</p>
                    <h3>Grad</h3>
                    <p>{userData?.company?.companyCity}</p>
                    <h3>Telefon preduzeca</h3>
                    <p>{userData?.company?.companyPhone}</p>
                    <h3>Mail preduzeca</h3>
                    <p>{userData?.company?.companyMail}</p>
                </div>
            </div>
        </div>
        </>
    )
}
