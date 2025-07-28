import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Blocks } from 'react-loader-spinner'
import { Button } from "@mui/material";
import './ObavestenjeList.css';

const ObavestenjeList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/Obavestenjas');
        setNotifications(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === notifications.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? notifications.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (loading) return <div style={{margin:"auto",marginBottom:"18%"}}><Blocks
      height="300"
      width="300"
      color="#4fa94d"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      visible={true}
      /></div>;
    if (error) return <p>Greska: {error}</p>;

  if (notifications.length === 0) {
    return <div className="alert alert-info mx-3">No notifications available</div>;
  }

  return (
    <div className="improved-carousel-container">
      <h2 className="text-center mb-4">Obaveštenja</h2>
      
      <div className="carousel-wrapper">
        <button className="nav-button prev" onClick={prevSlide}>
          <FaChevronLeft size={24} />
        </button>
        
        <div className="carousel-track">
          <div 
            className="carousel-slides"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {notifications.map((notification) => (
              <div key={notification.id} className="carousel-slide">
                <Card className="notification-card">
                  {notification.representImagePath && (
                    <Card.Img 
                      variant="top" 
                      src={notification.representImagePath} 
                      alt={notification.naziv}
                      className="card-image"
                    />
                  )}
                  <Card.Body>
                    <Card.Title style={{color:"rgb(25,118,210)",fontSize:"1.2rem"}}>{notification.naziv}</Card.Title>
                    <Card.Text style={{fontSize:"1rem"}}>
                      {notification.sadrzaj.length > 100 
                        ? `${notification.sadrzaj.substring(0, 100)}...` 
                        : notification.sadrzaj}
                    </Card.Text>
                    <Button 
                      onClick={() => navigate(`/obavestenje/${notification.id}`)}
                      variant="contained"
                    >
                      Pročitaj više
                    </Button>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      {new Date(notification.vremeKreiranja).toLocaleDateString()}
                    </small>
                  </Card.Footer>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        <button className="nav-button next" onClick={nextSlide}>
          <FaChevronRight size={24} />
        </button>
      </div>

      <div className="carousel-dots">
        {notifications.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ObavestenjeList;