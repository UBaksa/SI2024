import React, { useState } from 'react';
import "./Podrska.css"
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function Podrska() {
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    email: '',
    nazivPitanja: '',
    poruka: ''
  });
  const navigate = useNavigate();
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
        toast.success("Pitanje podrsci uspesno poslato!")
        setTimeout(() => {
          navigate("/");
        }, 2000);
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
      <div className='podrska-container'>
        <div className='podrska-card'>
          <h3 className='podrska-title'>Podrška</h3>
          <p className='podrska-subtitle'>Imate pitanje ili potrebnu podršku? Kontaktirajte nas.</p> 
          
          <form onSubmit={handleSubmit} className='podrska-form'>
            <div className='form-group'>
              <label htmlFor="ime" className='form-label'>Ime</label>
              <input
                type="text"
                id="ime"
                name="ime"
                value={formData.ime}
                onChange={handleInputChange}
                placeholder="Unesite vaše ime"
                className={`form-input ${errors.ime ? 'input-error' : ''}`}
              />
              {errors.ime && <div className='error-message'>{errors.ime}</div>}
            </div>

            <div className='form-group'>
              <label htmlFor="prezime" className='form-label'>Prezime</label>
              <input
                type="text"
                id="prezime"
                name="prezime"
                value={formData.prezime}
                onChange={handleInputChange}
                placeholder="Unesite vaše prezime"
                className={`form-input ${errors.prezime ? 'input-error' : ''}`}
              />
              {errors.prezime && <div className='error-message'>{errors.prezime}</div>}
            </div>

            <div className='form-group'>
              <label htmlFor="email" className='form-label'>Email adresa</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="petar.petrovic@gmail.com"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <div className='error-message'>{errors.email}</div>}
            </div>

            <div className='form-group'>
              <label htmlFor="nazivPitanja" className='form-label'>Naziv pitanja</label>
              <input
                type="text"
                id="nazivPitanja"
                name="nazivPitanja"
                value={formData.nazivPitanja}
                onChange={handleInputChange}
                placeholder="Kratko opišite vaše pitanje"
                className={`form-input ${errors.nazivPitanja ? 'input-error' : ''}`}
              />
              {errors.nazivPitanja && <div className='error-message'>{errors.nazivPitanja}</div>}
            </div>

            <div className='form-group'>
              <label htmlFor="poruka" className='form-label'>Poruka</label>
              <textarea
                id="poruka"
                name="poruka"
                rows={6}
                value={formData.poruka}
                onChange={handleInputChange}
                placeholder="Detaljno opišite vaše pitanje ili problem..."
                className={`form-textarea ${errors.poruka ? 'input-error' : ''}`}
              />
              {errors.poruka && <div className='error-message'>{errors.poruka}</div>}
            </div>

            <div className='form-actions'>
              <Button 
                type='submit' 
                variant="contained"
                className='submit-button'
              >
                Pošaljite poruku
              </Button>
            </div>
          </form>

          <div className='contact-alternative'>
            <p>
              Ili nas kontaktirajte direktno na:{' '}
              <a href="mailto:ujknaovicbakir@gmail.com" className='email-link'>ujkanovicbakir@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}