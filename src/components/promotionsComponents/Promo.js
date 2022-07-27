import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import PromotionsService  from '../../services/promotions.service'
import { useParams } from 'react-router-dom';
import {Button} from 'react-bootstrap'

function Promo() {
    const { user } = useAuth();
    const { id} = useParams();
    console.log('id del use params',id)
    // toda la informacion de lusuario, evento y promocion y comercio
    const [promo, setPromo] = useState([]);

    useEffect(() => {


        const getPromo = async () => {

            let promo = await PromotionsService.getPromo(user.id, id)
            console.log(promo.data)
            setPromo(promo.data)
        }
    getPromo();
    },[])


    return (
      
        <div className='container'>
            <div className='container__promo'>
                <img src={promo.photo_promotion} alt={ promo.id} />
                <span>{ promo.description}</span>   

            </div>
            <div className='container__commerce'>
                <img src={promo.photo_commerce} alt={promo.id} />
            </div>



            <form action='' method=''>

                <Button className='button__promotion' type='submit'>Utilizar</Button>
            </form>

        </div>
   
  )
}

Promo.propTypes = {}

export default Promo
