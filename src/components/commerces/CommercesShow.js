import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAuth } from '../context/AuthContext';
import ListPromotions from '../promotionsComponents/ListPromotions';
import PromotionsService from '../../services/promotions.service'


function CommercesShow() {

    const { id } = useParams();
    const { user } = useAuth()
    const [promos, setPromos] = useState([])
    
    useEffect(() => { 

        const getPromosByCommerce = async() => {
            
            const promos= await PromotionsService.getPromotionsByComercio(id)
            console.log(promos.data)
            setPromos(promos.data)
        }

        getPromosByCommerce();

    }, [])

    useEffect(() => {


    })
    

    return (
      
    
  )
}

export default CommercesShow