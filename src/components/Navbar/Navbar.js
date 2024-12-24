import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export default function Navbar() {
  const { userId, setUserId } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Proveri ako postoji "id" u localStorage pri svakom renderovanju
    const storedUserId = localStorage.getItem("id");
    if (storedUserId) {
      setUserId(storedUserId); // Ažuriraj Context
      setIsLoggedIn(true); // Postavi stanje prijave
    } else {
      setUserId(null); // Osiguraj da setUserId bude resetovan
      setIsLoggedIn(false);
    }
  }, [setUserId, userId]); // Dodaj `userId` u zavisnost da bi reagovao na promene

  const handleLogout = () => {
    localStorage.removeItem("id"); // Ukloni "id" iz localStorage
    setUserId(null); // Resetuj Context
    setIsLoggedIn(false); // Resetuj stanje prijave
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
