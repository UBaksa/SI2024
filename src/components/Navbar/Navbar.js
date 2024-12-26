import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export default function Navbar() {
  const { userId, setUserId } = useAppContext();
  const { userCompanyID, setUserCompanyID } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Proveri ako postoji "id" u localStorage pri svakom renderovanju
    const storedUserId = localStorage.getItem("id");
    const storedCompanyId = localStorage.getItem("companyID");
    if (storedUserId) {
      setUserId(storedUserId);
      setUserCompanyID(storedCompanyId) 
      setIsLoggedIn(true); 
    } else {
      setUserId(null);
      setUserCompanyID(null)
      setIsLoggedIn(false);
    }
  }, [setUserId, userId, userCompanyID,setUserCompanyID]); 

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("companyID");
    setUserId(null); 
    setUserCompanyID(null); 
    setIsLoggedIn(false); 
  };

  return (
    <header className="navbar">
      <ul className="links">
        <li>
          <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
            CarGoo
          </Link>
        </li>
        <li>Usluge</li>
        <li>Obaveštenja</li>
        <li>Podrška</li>
        <li id="ponude">
          <Link style={{ textDecoration: "none", color: "white" }} to={"/ponude"}>
            Ponude
          </Link>
        </li>
      </ul>
      <ul className="login">
        {isLoggedIn ? (
          <>
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
