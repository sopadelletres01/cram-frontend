import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export default function Tarjeta({ src, alt, title, subtitle, path }) {
  /* haremos un map y mostraremos las fotos de forma random */
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate(path);
  };

  return (
    <Card className="card_prueba" onClick={handleNavigate}>
      <Card.Img className="card__image" variant="top" width="100%" height="225px" src={src} alt={alt} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{subtitle}</Card.Text>
      </Card.Body>
    </Card>
  );
}
