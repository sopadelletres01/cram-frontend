import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function CardPromotion({ element }) {
  
  const { user } = useAuth();
  return (
    <Link to={`/promotions/${element.id}`} className='card__promotion'>
      <div className='card__content_promotion'>
        <img src={element.photo} alt={`${element.name}`} />
        <span className='card__promotion_description'>{element.description}</span>
      </div>
    </Link>   
  )
}

export default CardPromotion