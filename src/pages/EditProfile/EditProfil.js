import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./EditProfil.css";
import { Api_url } from "../../apiurl";
import { Button } from "@mui/material";
import HowToRegTwoToneIcon from '@mui/icons-material/HowToRegTwoTone';
import { useNavigate } from "react-router-dom";


export default function EditProfil() {
  const { id } = useParams(); 
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    number: "",
    role: "",
    languages: []
  });
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const languages = [
    "Albanski", "Baskijski", "Beloruski", "Bosanski", "Bugarski", "Češki",
    "Danski", "Engleski", "Estonski", "Farski", "Finski", "Flamanski",
    "Francuski", "Frizijski", "Galicijski", "Grčki", "Holandski", "Hrvatski",
    "Irski", "Islandaski", "Italijanski", "Katalonski", "Ladin", "Letonski",
    "Litvanski", "Mađarski", "Makedonski", "Malteški", "Nemački", "Norveški",
    "Poljski", "Portugalski", "Romi", "Rumunski", "Ruski", "Sardinski",
    "Škotski galski", "Slovenački", "Slovački", "Srpski", "Španski",
    "Švedski", "Turski", "Ukrajinski", "Velški"
  ];

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedLanguages((prev) => [...prev, value]);
    } else {
      setSelectedLanguages((prev) => prev.filter((lang) => lang !== value));
    }
  };


    const navigate = useNavigate();
 
  useEffect(() => {
    axios
      .get(`${Api_url}/api/Auth/user/${id}`)
      .then((response) => {
        console.log("Fetched user data:", response.data);
        const data = response.data;
        setUserData({
          firstname: data.firstName || "", 
          lastname: data.lastName || "",
          email: data.email || "",
          number: data.phoneNumber || "",
          role: (data.roles && data.roles[0]) || "", 
          languages: data.languages || []
        });
        setSelectedLanguages(data.languages || []);
        console.log("Updated userData:", {
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
          number: data.phoneNumber,
          role: (data.roles && data.roles[0]),
          languages: data.languages
        });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [id]);
  
  

 
  const handleUpdate = () => {

    const updatedUser = {
      FirstName: userData.firstname,
      LastName: userData.lastname,
      Email: userData.email,
      PhoneNumber: userData.number,
      Languages: selectedLanguages.join(",") 
    };

    axios
      .put(`${Api_url}/api/Auth/user/${id}`, updatedUser)
      .then((response) => {
        alert("Profil je uspešno izmenjen!");
      })
      .catch((error) => console.error("Error updating user data:", error));
      navigate("/profil")
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="edit-profil">
      <h2>Unesite izmene Vaseg profila</h2>
      <div className="edit-profil-into">
        <h3>Ime</h3>
        <input
          type="text"
          name="firstname"
          value={userData.firstname}
          onChange={handleChange}
        />
        <h3>Prezime</h3>
        <input
          type="text"
          name="lastname"
          value={userData.lastname}
          onChange={handleChange}
        />
        <h3>Mail</h3>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <h3>Br. telefona</h3>
        <input
          type="tel"
          name="number"
          value={userData.number}
          onChange={handleChange}
        />
        <h3>Jezici</h3>
        <div className="dropdown" style={{ position: "relative" }}>
          <button type="button" onClick={toggleDropdown}>
            {selectedLanguages.length > 0
              ? `Govorite ${selectedLanguages.length} jezika`
              : "Odaberite jezike"}
          </button>
          {dropdownOpen && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                background: "#fff",
                border: "1px solid #ccc",
                padding: "10px",
                zIndex: 1
              }}
            >
              {languages.map((language) => (
                <label
                  key={language}
                  style={{ display: "block", marginBottom: "5px" }}
                >
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
      <Button endIcon={<HowToRegTwoToneIcon />} sx={{marginTop:"2%"}} variant="contained" color="primary" onClick={handleUpdate}>
        Izmenite
      </Button>
    </div>
  );
}
