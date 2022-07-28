import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAuth } from '../context/AuthContext';

import PromotionsService from '../../services/promotions.service'
import CardCommercePromo from './CardCommercePromo';
import CardPromotion from '../promotionsComponents/CardPromotion';
import ApiCrudService from '../../services/crud.service';


function CommercesShow() {

    const { id } = useParams();
    console.log('este id es del comercio',Number(id))
    const { user } = useAuth()
    const [promos, setPromos] = useState([])
    const [commerce, setCommerce]=useState([])
    
    useEffect(() => { 

        const getPromosByCommerce = async() => {
            
            const promos= await PromotionsService.getPromotionsByComercio(Number(id))
            console.log(promos.data)
            setPromos(promos.data)
        }

        getPromosByCommerce();

    }, [])

    useEffect(() => {

        const getCommerce = async () => { 
            const commerce = await ApiCrudService.show('commerces',Number(id))
        console.log(commerce)
        setCommerce(commerce.data)

        }
        getCommerce();

    },[])
    

    return (
       <div className='commerce__show_and_promos'>
            
            <div className='center__all'>
            <p className='title_promos_comer'>Comercio </p>
                <CardCommercePromo element={commerce}/>
            
                    <p className='title_promos_comer'>Promociones asociadas al comercio </p>
                <div className='list_promotion_promos'>
                    {promos.map((element) => { 
                        return <CardPromotion element={element } />
                    })} 
                </div>
            </div> 
        </div> 
            
      
    
  )
}

export default CommercesShow