import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import ApiCrudService from '../../services/crud.service';

function ShowEvent({ event }) {
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    navigate('/inscriptions', { state: { event } });
  };

  return (
    <div className="container__shown_event">
      <div className="event__info_show">
        <img src={event.photo} alt={event.name} />
        <div className="event__info_more">
          <span className="event__title">Descripcion:</span>
          <p className="event_information">{event.description}</p>
          <span className="event__title">Dirección:</span>
          <p className="event_information">{event.adress}</p>
          <span className="event__title">Población:</span>
          <p className="event_information">{event.town}</p>
          <span className="event__title">Fecha de Inicio:</span>

          <p className="event_information">{event.start_date}</p>
          <span className="event__title">Fecha de finalización:</span>
          <p className="event_information">{event.final_date}</p>
        </div>
      </div>

      <div className="decoration__button">
        <Button className="form__show_event button" onClick={handleSubmit}>
          Inscribirse
        </Button>
      </div>
    </div>
  );
}

export default ShowEvent;
