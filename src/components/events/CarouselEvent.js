import React from 'react';
import { Link } from 'react-router-dom';

function CarouselEvent({ event }) {
  return (
    <Link to={`/events/${event.id}`} className="carouselEvent">
      <b className="startDate">{event.start_date}</b>
      <div className="imgWrapper">
        <img src={event?.photo}></img>
      </div>
      <div className="eventInfo">
        <h5>{event?.name}</h5>
        <p>{event.adress}</p>
        <p className="description">{event?.description || 'No hay descripcion para este evento'}</p>
      </div>
    </Link>
  );
}

export default CarouselEvent;
