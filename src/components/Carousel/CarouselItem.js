import React from 'react';
import { Link } from 'react-router-dom';

function CarouselItem({ element, type="event" }) {
  const isEvent = type === "event";
  const url = `/${isEvent ? 'events' : 'promotions' }/${element.id}` 
  return (
    <Link to={url} className="carouselEvent">
      <b className="startDate">{element.start_date}</b>
      <div className="imgWrapper">
        <img src={element?.photo}></img>
      </div>
      <div className="eventInfo">
        <h5>{element?.name}</h5>
        <p>{element.adress}</p>
        <p className="description">{element?.description || `No hay descripcion para ${ isEvent ? 'este evento' : 'esta promoción' }`}</p>
      </div>
    </Link>
  );
}

export default CarouselItem;
