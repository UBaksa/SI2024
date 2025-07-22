import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import "./CreateObavestenje.css";

const CreateNotification = () => {
  const [formData, setFormData] = useState({
    Naziv: '',
    Sadrzaj: '',
    imageFile: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Naziv.trim()) {
      newErrors.Naziv = 'Naziv je obavezan';
    }

    if (!formData.Sadrzaj.trim()) {
      newErrors.Sadrzaj = 'Sadržaj je obavezan';
    } else if (formData.Sadrzaj.trim().length < 10) {
      newErrors.Sadrzaj = 'Sadržaj mora imati najmanje 10 karaktera';
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('Naziv', formData.Naziv);
      formDataToSend.append('Sadrzaj', formData.Sadrzaj);
      if (formData.imageFile) {
        formDataToSend.append('imageFile', formData.imageFile);
      }

      const response = await axios.post('/api/Obavestenjas/upload-notification', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success("Obaveštenje uspešno kreirano!");
      // Reset form
      setFormData({
        Naziv: '',
        Sadrzaj: '',
        imageFile: null
      });
      setImagePreview(null);
    } catch (err) {
      toast.error(err.response?.data?.Message || 'Došlo je do greške pri kreiranju obaveštenja');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className='notification-container'>
        <div className='notification-card'>
          <h3 className='notification-title'>Kreiraj novo obaveštenje</h3>
          
          <form onSubmit={handleSubmit} className='notification-form'>
            <div className='form-group'>
              <label htmlFor="Naziv" className='form-label'>Naziv obaveštenja</label>
              <input
                type="text"
                id="Naziv"
                name="Naziv"
                value={formData.Naziv}
                onChange={handleInputChange}
                placeholder="Unesite naslov obaveštenja"
                className={`form-input ${errors.Naziv ? 'input-error' : ''}`}
              />
              {errors.Naziv && <div className='error-message'>{errors.Naziv}</div>}
            </div>

            <div className='form-group'>
              <label htmlFor="Sadrzaj" className='form-label'>Sadržaj</label>
              <textarea
                id="Sadrzaj"
                name="Sadrzaj"
                rows={6}
                value={formData.Sadrzaj}
                onChange={handleInputChange}
                placeholder="Unesite sadržaj obaveštenja..."
                className={`form-textarea ${errors.Sadrzaj ? 'input-error' : ''}`}
              />
              {errors.Sadrzaj && <div className='error-message'>{errors.Sadrzaj}</div>}
            </div>

            <div className='form-group'>
              <label htmlFor="imageFile" className='form-label'>Naslovna slika</label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept="image/*"
                onChange={handleFileChange}
                className='form-file-input'
                style={{textAlign:"center"}}
              />
              {imagePreview && (
                <div className='image-preview-container'>
                  <p className='image-preview-label'>Pregled naslovne slike:</p>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className='image-preview'
                  />
                </div>
              )}
            </div>

            <div className='form-actions'>
              <Button 
                type='submit' 
                variant="contained"
                className='submit-button'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Kreiranje obaveštenja' : 'Kreiraj obaveštenje'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNotification;