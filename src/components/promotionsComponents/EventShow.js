import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PromotionsService from '../../services/promotions.service';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function EventShow() {
  const { user } = useAuth();
  const { id } = useParams();
  console.log('id del use params', id);
  // toda la informacion de lusuario, evento y promocion y comercio
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    const getPromo = async () => {
      try {
        console.log("entra")
        let promo = await PromotionsService.getPromoShow(Number(id));
        console.log(promo.data[0]);
        setPromo(promo.data[0]);
        
      } catch (err) {
        console.log("Err",err)
      }
    };
    getPromo();
  }, []);

  return (
    <>
    </>
    
  );
}


export default EventShow;
