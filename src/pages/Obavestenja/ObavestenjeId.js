import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Spinner, Container } from 'react-bootstrap';
import axios from 'axios';

const NotificationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <Container className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <div className="alert alert-danger">Error: {error}</div>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Nazad
        </Button>
      </Container>
    );
  }

  if (!notification) {
    return (
      <Container className="my-5">
        <div className="alert alert-warning">Obaveštenje nije pronađeno</div>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Nazad
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card>
        {notification.representImagePath && (
          <Card.Img 
            variant="top" 
            src={notification.representImagePath} 
            alt={notification.naziv}
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        )}
        <Card.Body>
          <Card.Title>{notification.naziv}</Card.Title>
          <Card.Text style={{ whiteSpace: 'pre-line' }}>
            {notification.sadrzaj}
          </Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              {new Date(notification.vremeKreiranja).toLocaleString()}
            </small>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Nazad na listu
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotificationDetails;