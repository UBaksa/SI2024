import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const UpdateOffer = () => {
  const { id } = useParams(); // ID ponude iz URL-a
  const history = useHistory();

  // Držanje stanja za podatke ponude
  const [offerData, setOfferData] = useState({
    DrzavaU: '',
    DrzavaI: '',
    MestoU: '',
    MestoI: '',
    RadiusI: '',
    Utovar: '',
    Istovar: '',
    Duzina: '',
    Tezina: '',
    TipNadogradnje: '',
    TipKamiona: '',
  });

  // Funkcija za preuzimanje podataka ponude
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`/api/PonudaVozilas/${id}`);
        setOfferData(response.data);
      } catch (error) {
        console.error('Error fetching offer data:', error);
      }
    };
    fetchOffer();
  }, [id]);

  // Funkcija za ažuriranje ponude
  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`/api/PonudaVozilas/${id}`, offerData);
      alert('Ponuda uspešno ažurirana!');
      history.push('/offers'); // Preusmeravanje na listu ponuda nakon uspešnog ažuriranja
    } catch (error) {
      console.error('Error updating offer:', error);
      alert('Došlo je do greške prilikom ažuriranja ponude.');
    }
  };

  // Funkcija za promenu vrednosti inputa
  const handleChange = (event) => {
    const { name, value } = event.target;
    setOfferData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Ažuriraj Ponudu Vozila</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="DrzavaU">Država Odlaska:</label>
          <input
            type="text"
            id="DrzavaU"
            name="DrzavaU"
            value={offerData.DrzavaU}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="DrzavaI">Država Dolaska:</label>
          <input
            type="text"
            id="DrzavaI"
            name="DrzavaI"
            value={offerData.DrzavaI}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="MestoU">Mesto Odlaska:</label>
          <input
            type="text"
            id="MestoU"
            name="MestoU"
            value={offerData.MestoU}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="MestoI">Mesto Dolaska:</label>
          <input
            type="text"
            id="MestoI"
            name="MestoI"
            value={offerData.MestoI}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="RadiusI">Radius Dolaska:</label>
          <input
            type="text"
            id="RadiusI"
            name="RadiusI"
            value={offerData.RadiusI}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Utovar">Utovar:</label>
          <input
            type="text"
            id="Utovar"
            name="Utovar"
            value={offerData.Utovar}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Istovar">Istovar:</label>
          <input
            type="text"
            id="Istovar"
            name="Istovar"
            value={offerData.Istovar}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Duzina">Dužina:</label>
          <input
            type="text"
            id="Duzina"
            name="Duzina"
            value={offerData.Duzina}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Tezina">Težina:</label>
          <input
            type="text"
            id="Tezina"
            name="Tezina"
            value={offerData.Tezina}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="TipNadogradnje">Tip Nadogradnje:</label>
          <input
            type="text"
            id="TipNadogradnje"
            name="TipNadogradnje"
            value={offerData.TipNadogradnje}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="TipKamiona">Tip Kamiona:</label>
          <input
            type="text"
            id="TipKamiona"
            name="TipKamiona"
            value={offerData.TipKamiona}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Ažuriraj Ponudu</button>
      </form>
    </div>
  );
};

export default UpdateOffer;
