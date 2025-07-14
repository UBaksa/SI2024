import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProfil.css";
import { Api_url } from "../../apiurl";
import { Button } from "@mui/material";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function EditProfil() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    number: "",
    languages: [],
    
  });

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

  const [dropdownOpen, setDropdownOpen] = useState(false);

const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

const handleCheckboxChange = (e) => {
  const { value, checked } = e.target;
  if (checked) {
    setSelectedLanguages((prev) => [...prev, value]);
  } else {
    setSelectedLanguages((prev) => prev.filter((lang) => lang !== value));
  }
};

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    axios.get(`${Api_url}/api/Auth/user/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((response) => {
      const data = response.data;
      setUserData({
        firstname: data.firstName || "",
        lastname: data.lastName || "",
        email: data.email || "",
        number: data.phoneNumber || "",
        languages: data.languages || [],
        password: "",
      });
      setSelectedLanguages(data.languages || []);
      setPreview(data.userPicture || "");
    })
    .catch((error) => console.error("Error fetching user data:", error));
  }, [id]);

  const handleUpdate = async () => {
    try {
      const payload = {
        FirstName: userData.firstname,
        LastName: userData.lastname,
        Email: userData.email,
        PhoneNumber: userData.number,
        Languages: selectedLanguages.join(","), 
        Password: userData.password || null     
      };
  
      const response = await axios.put(`${Api_url}/api/Auth/user/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
  
      alert("Profil je uspešno izmenjen!");
      navigate("/profil");
    } catch (error) {
      console.error("Error updating user data:", error.response?.data);
      alert("Došlo je do greške pri ažuriranju profila.");
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


  return (
    <div className="edit-profil">
      <h2>Unesite izmene Vašeg profila</h2>
      <div className="edit-profil-into">
        {/* <h3>Profilna slika</h3>
        {preview && <img src={preview} alt="Profilna slika" className="profile-preview" style={{ width: "10rem", height: "10rem" }} />}<br />
        <input type="file" accept="image/*" onChange={handleFileChange} /> */}
        <h3>Ime</h3>
        <input type="text" name="firstname" value={userData.firstname} onChange={handleChange} />
        <h3>Prezime</h3>
        <input type="text" name="lastname" value={userData.lastname} onChange={handleChange} />
        <h3>Email</h3>
        <input type="email" name="email" value={userData.email} onChange={handleChange} />
        <h3>Br. telefona</h3>
        <input type="tel" name="number" value={userData.number} onChange={handleChange} />
        <h3>Jezici koje govorite</h3>
        <div className="dropdown" style={{ position: "relative", marginBottom: "1rem" }}>
          <button type="button" onClick={toggleDropdown}>
            {selectedLanguages.length > 0
              ? `Govorite ${selectedLanguages.length} jezika`
              : "Odaberite jezike"}
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu" style={{ position: "absolute", background: "#fff", border: "1px solid #ccc", padding: "10px", zIndex: 1, maxHeight: "200px", overflowY: "auto" }}>
              {languages.map((language) => (
                <label key={language} style={{ display: "block", marginBottom: "5px" }}>
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
        <h3>Lozinka</h3>
        <div style={{ position: "relative" }}>
          <input type={passwordVisible ? "text" : "password"} name="password" value={userData.password} onChange={handleChange} />
          <div style={{ position: "absolute", left: "66%", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        </div>
      </div>
      <Button endIcon={<HowToRegTwoToneIcon />} sx={{ marginTop: "2%" }} variant="contained" color="primary" onClick={handleUpdate}>
        Izmenite
      </Button>
    </div>
  );
}
