import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ObavestenjeId.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Blocks } from 'react-loader-spinner'

const NotificationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  const isKontroler = roles.includes("Kontroler");

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(`/api/Obavestenjas/${id}`);
        setNotification(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNotification();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Da li ste sigurni da želite da obrišete obaveštenje?")) {
      try {
        await axios.delete(`/api/Obavestenjas/${id}`);
        toast.success("Obavestenje obrisano !");
        setTimeout(() => {
          navigate("/obavestenja");
        }, 2000);
      } catch (err) {
        alert("Greška prilikom brisanja: " + err.message);
      }
    }
  };

  if (loading) return <div style={{margin:"auto",marginBottom:"18%"}}><Blocks
    height="300"
    width="300"
    color="#1976d2"
    ariaLabel="blocks-loading"
    wrapperStyle={{}}
    wrapperClass="blocks-wrapper"
    visible={true}
    /></div>;
    if (error) return <div>Error: {error}</div>;

  if (!notification) {
    return (
      <div>
        <p>Obaveštenje nije pronađeno.</p>
        <button onClick={() => navigate(-1)}>Nazad</button>
      </div>
    );
  }

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    {isKontroler && (
        <div style={{ marginTop: "1rem" }}>
          <Button 
            variant='contained' 
            color='success' 
            onClick={() => navigate(`/obavestenja/izmeni/${id}`)} 
            style={{ marginRight: "10px" }}
          >
            <EditNoteIcon/>Izmeni
          </Button>
          <Button 
            variant='contained' 
            color='error' 
            onClick={handleDelete}
          >
            <DeleteIcon/>Obriši
          </Button>
        </div>
      )}

      <div className='obavestenje-id'>
        <h2 className='obavestenje-id-tittle'>{notification.naziv}</h2>
        {notification.representImagePath && (
          <img src={notification.representImagePath} alt={notification.naziv} />
        )}
        <p className='obavestenje-id-content'>{notification.sadrzaj}</p>
        <p className='obavestenje-id-time'>
          Okačeno {new Date(notification.vremeKreiranja).toLocaleString()}
        </p>
      </div>

      <Button 
        style={{ marginBottom: "5%" }} 
        variant='contained' 
        onClick={() => navigate(-1)}
      >
        Nazad na obaveštenja
      </Button>
    </>
  );
};

export default NotificationDetails;
