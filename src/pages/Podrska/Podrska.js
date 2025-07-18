import React, { useState } from 'react';
import "./Podrska.css"
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

export default function Podrska() {
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    email: '',
    nazivPitanja: '',
    poruka: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ime.trim()) {
      newErrors.ime = 'Ime je obavezno';
    }

    if (!formData.prezime.trim()) {
      newErrors.prezime = 'Prezime je obavezno';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email je obavezan';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Molimo unesite validan email';
    }

    if (!formData.nazivPitanja.trim()) {
      newErrors.nazivPitanja = 'Naziv pitanja je obavezan';
    }

    if (!formData.poruka.trim()) {
      newErrors.poruka = 'Poruka je obavezna';
    } else if (formData.poruka.trim().length < 10) {
      newErrors.poruka = 'Poruka mora imati najmanje 10 karaktera';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({
          ime: '',
          prezime: '',
          email: '',
          nazivPitanja: '',
          poruka: ''
        });
      } else {
        throw new Error('Greška pri slanju poruke');
      }
    } catch (error) {
      console.error('Greška:', error);
      toast.error("Doslo je do greske.");
      
    } 
  };

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <div className='podrska'>
      <h3>Podrška</h3>
      <p>Imate pitanje ili potrebnu podršku? Kontaktirajte nas.</p> 
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ime">Ime </label>
          <br />
          <input
            type="text"
            id="ime"
            name="ime"
            value={formData.ime}
            onChange={handleInputChange}
            placeholder="Unesite vaše ime"
          />
          {errors.ime && (
            <div style={{color: 'red', fontSize: '14px'}}>{errors.ime}</div>
          )}
        </div>
        <br />

        <div>
          <label htmlFor="prezime">Prezime </label>
          <br />
          <input
            type="text"
            id="prezime"
            name="prezime"
            value={formData.prezime}
            onChange={handleInputChange}
            placeholder="Unesite vaše prezime"
          />
          {errors.prezime && (
            <div style={{color: 'red', fontSize: '14px'}}>{errors.prezime}</div>
          )}
        </div>
        <br />

        <div>
          <label htmlFor="email">Email adresa </label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="petar.petrovic@gmail.com"
          />
          {errors.email && (
            <div style={{color: 'red', fontSize: '14px'}}>{errors.email}</div>
          )}
        </div>
        <br />

        <div>
          <label htmlFor="nazivPitanja">Naziv pitanja </label>
          <br />
          <input
            type="text"
            id="nazivPitanja"
            name="nazivPitanja"
            value={formData.nazivPitanja}
            onChange={handleInputChange}
            placeholder="Kratko opišite vaše pitanje"
          />
          {errors.nazivPitanja && (
            <div style={{color: 'red', fontSize: '14px'}}>{errors.nazivPitanja}</div>
          )}
        </div>
        <br />

        <div>
          <label htmlFor="poruka">Poruka </label>
          <br />
          <textarea
            id="poruka"
            name="poruka"
            rows={6}
            value={formData.poruka}
            onChange={handleInputChange}
            placeholder="Detaljno opišite vaše pitanje ili problem..."
          />
          {errors.poruka && (
            <div style={{color: 'red', fontSize: '14px'}}>{errors.poruka}</div>
          )}
        </div>
        <br />

        <Button type='submit' sx={{marginTop:"1%"}} variant="contained">Posaljite poruku</Button>
      </form>

      <div style={{marginTop: '20px'}}>
        <p style={{fontSize:"1rem"}}>
          Ili nas kontaktirajte direktno na:{' '}
          <a href="mailto:ujknaovicbakir@gmail.com">ujkanovicbakir@gmail.com</a>
        </p>
      </div>
    </div>
    </>
  );
}