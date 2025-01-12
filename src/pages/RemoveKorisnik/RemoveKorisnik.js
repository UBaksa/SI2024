import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_url } from "../../apiurl";  
import { Button } from "@mui/material";
import "./RemoveKorisnik.css";
import { useNavigate } from "react-router-dom";



export default function RemoveKorisnik() {
  const [users, setUsers] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${Api_url}/api/Auth/GetAllUsers`);  
        setUsers(response.data);  
      } catch (error) {
        console.error("Greška prilikom učitavanja korisnika:", error);
      }
    };

    fetchUsers();
  }, []);  

  
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${Api_url}/api/Auth/DeleteUser/${id}`);  
      alert(response.data.Message);  
      
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Greška prilikom brisanja korisnika:", error);
    }
  };

  return (
    <div className="remove-korisnik">
      <h2>Lista korisnika</h2>
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
          {users.map((user) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
