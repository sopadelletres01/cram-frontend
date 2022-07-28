import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export function CardCommercePromo({ element }) {
    console.log(element)

    const { id}=useParams()
  
  return (
    <Link to={`/commerces/${id}`} className="card__event_card_promotions_comerce">
    <div className="card__content_commerce">
      <img src={element.photo} alt={`${element.name}`} />
      <span className="card__title_commerce">{element.name}</span>
      <div className="card__info_commerce">
        <p>
          <p className="date_commerce">Direccion </p>
          {element.adress}
        </p>
        <p>
          <p className="date_commerce">Email</p>
          {element.email}
                  </p>
                  <p>
          <p className="date_commerce">Telefono </p>
          {element.phone}
                  </p>
        <p>{element.description}</p>
      </div>
    </div>
    <div className="card__subcription_commerce">
      <div className="categoria_commerce">Comercio</div>
        {/* <Link to={`/events/${element.id}`} className="button">Inscríbete</Link> */}
    </div>
  </Link>
    
  )
}

export default CardCommercePromo