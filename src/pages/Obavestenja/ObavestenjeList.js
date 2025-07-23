import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger mx-3">Error: {error}</div>;
  }

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
                    <Card.Title>{notification.naziv}</Card.Title>
                    <Card.Text>
                      {notification.sadrzaj.length > 100 
                        ? `${notification.sadrzaj.substring(0, 100)}...` 
                        : notification.sadrzaj}
                    </Card.Text>
                    <Button 
                      variant="primary" 
                      onClick={() => navigate(`/obavestenje/${notification.id}`)}
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