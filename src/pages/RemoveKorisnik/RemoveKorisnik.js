import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_url } from "../../apiurl";  
import { Button } from "@mui/material";
import "./RemoveKorisnik.css";
import { useNavigate } from "react-router-dom";
import PersonOffTwoToneIcon from '@mui/icons-material/PersonOffTwoTone';
export default function RemoveKorisnik() {
  const [users, setUsers] = useState([]); 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [filter, setFilter] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    preduzeceId: "",
    roles: "", 
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${Api_url}/api/Auth/GetAllUsers`);  
        setUsers(response.data);  
        setFilteredUsers(response.data); 
      } catch (error) {
        console.error("Greška prilikom učitavanja korisnika:", error);
      }
    };

    fetchUsers();
  }, []);  

  useEffect(() => {
    const applyFilter = () => {
      const filtered = users.filter((user) => {
        return (
          user.firstName.toLowerCase().includes(filter.firstName.toLowerCase()) &&
          user.lastName.toLowerCase().includes(filter.lastName.toLowerCase()) &&
          user.email.toLowerCase().includes(filter.email.toLowerCase()) &&
          user.phoneNumber.toLowerCase().includes(filter.phoneNumber.toLowerCase()) &&
          (filter.preduzeceId === "" || user.preduzeceId?.toString().includes(filter.preduzeceId)) &&
          (filter.roles === "" || user.roles.includes(filter.roles))
        );
      });
      setFilteredUsers(filtered);
    };

    applyFilter();
  }, [filter, users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${Api_url}/api/Auth/DeleteUser/${id}`);  
      alert(response.data.Message);  
      
      setUsers(users.filter(user => user.id !== id));
      setFilteredUsers(filteredUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error("Greška prilikom brisanja korisnika:", error);
    }
  };

  return (
    <div className="remove-korisnik">
      <h2>Lista korisnika</h2>
      <div className="search-korisnik-inputs">
        <input
          type="text"
          placeholder="Ime"
          name="firstName"
          value={filter.firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Prezime"
          name="lastName"
          value={filter.lastName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={filter.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Telefon"
          name="phoneNumber"
          value={filter.phoneNumber}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="ID Preduzeća"
          name="preduzeceId"
          value={filter.preduzeceId}
          onChange={handleInputChange}
        />
        <select
          name="roles"
          value={filter.roles}
          onChange={handleInputChange}
        >
          <option value="">Sve uloge</option>
          <option value="Kontroler">Kontroler</option>
          <option value="Prevoznik">Prevoznik</option>
          <option value="Dispecer">Dispečer</option>
        </select>
      </div>
      <table className="remove-korisnik-table">
        <thead>
          <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>ID Preduzeća</th>
            <th>Uloge</th>
            <th>Brisanje</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.preduzeceId}</td>
                <td>{user.roles.join(", ")}</td>
                <td>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteUser(user.id)}  
                  >
                    Obriši
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                <PersonOffTwoToneIcon style={{fontSize:"5rem",color:"red"}}/><br/>
                Nema korisnika koji odgovaraju pretrazi.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
