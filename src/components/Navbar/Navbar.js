import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import PersonRemoveTwoToneIcon from '@mui/icons-material/PersonRemoveTwoTone';

export default function Navbar() {
  const { userId, setUserId } = useAppContext();
  const { userCompanyID, setUserCompanyID } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {userRoles, setUserRoles} = useAppContext();

  const navigate = useNavigate()

  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    const storedCompanyId = localStorage.getItem("companyID");
    const storedUserRole = localStorage.getItem("roles");
    
    if (storedUserId) {
      setUserId(storedUserId);
      setUserCompanyID(storedCompanyId) 
      setUserRoles(storedUserRole)
      setIsLoggedIn(true); 
    } else {
      setUserId(null);
      setUserCompanyID(null)
      setUserRoles(null)
      setIsLoggedIn(false);
    }
  }, [setUserId, userId, userCompanyID,setUserCompanyID,userRoles, setUserRoles]); 

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("companyID");
    localStorage.removeItem("roles");
    setUserId(null); 
    setUserCompanyID(null); 
    setUserRoles(null)
    setIsLoggedIn(false); 
    navigate("/")
  };

  return (
    <header className="navbar">
      <ul className="links">
        <li>
          <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
            CarGoo
          </Link>
        </li>
        <li>Obaveštenja</li>
        <li>Podrška</li>
        {isLoggedIn && (
          <li id="ponude">
          <Link style={{ textDecoration: "none", color: "white" }} to={"/ponude"}>
            Ponude
          </Link>
        </li>
        )}
        {(userRoles && userRoles.includes("Kontroler")) && (
          <div style={{display:"flex",gap:"10%"}}>
          <Link style={{display:"flex",gap:"5%",color:"white",listStyleType:"none",textDecoration:"none"}} to={"/novikorisnik"}><li style={{display:"flex",gap:"5%"}}><PersonAddAltTwoToneIcon/> Korisnik</li></Link>
          <Link style={{display:"flex",gap:"5%",color:"white",listStyleType:"none",textDecoration:"none"}} to={"/izbrisikorisnika"}><li style={{display:"flex",gap:"5%"}}><PersonRemoveTwoToneIcon /> Korisnik</li></Link>
          </div>
        )}
      </ul>
      <ul className="login">
        {isLoggedIn ? (
          <> 
            <li>
            <Link style={{ textDecoration: "none", color: "white" }} to={"/profil"}>
              <PermIdentityTwoToneIcon style={{fontSize:"2rem"}}></PermIdentityTwoToneIcon>
            </Link>
            </li>
            <li>
              <Button
                variant="contained"
                onClick={handleLogout}
                style={{ backgroundColor: "#f44336" }}
              >
                Odjava
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/login"}>
                <Button variant="contained">Prijava</Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
