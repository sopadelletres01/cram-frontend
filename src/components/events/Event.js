import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import ListPromotions from '../promotionsComponents/ListPromotions'


function Event() {
  const { id } = useParams();
  const {user }=useAuth();
// Cogeremos las promociones de este evento gratuitos y las mostraremos
    



  return (
      <div>
        Promociones
      <ListPromotions id={id}>
        </ListPromotions>
      </div>
  )
}

export default Event