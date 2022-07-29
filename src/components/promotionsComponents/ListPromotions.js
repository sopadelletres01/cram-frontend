import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventsService from '../../services/events.service';
import CardPromotion from './CardPromotion';

function ListPromotions({ id }) {
  const [listPromotions, setListPromotions] = useState([]);
  const { user } = useAuth();


  // cogeremos las promociones del evento y las mostraremos debajo del evento.
  useEffect(() => {
    const getPromotionsByEvent = async () => {
      let promotions = await EventsService.getPromotions(id);
      setListPromotions(promotions.data);
    };
    getPromotionsByEvent();
  }, []);
  return (
   
     
        <div className="list_promotion">
          {listPromotions.map(element => {
            return (
                <CardPromotion element={ element}/>
             
            );
          })}
        </div>
    
  
  );
}

export default ListPromotions;
