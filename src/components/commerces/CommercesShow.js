import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAuth } from '../context/AuthContext';

import PromotionsService from '../../services/promotions.service'
import CardCommercePromo from './CardCommercePromo';
import CardPromotion from '../promotionsComponents/CardPromotion';
import ApiCrudService from '../../services/crud.service';
import { useGlobalState } from '../context/GlobalContext';


function CommercesShow() {

    const { id } = useParams();
    const { user } = useAuth()
    const { setLoading , setError } = useGlobalState()
    const [promos, setPromos] = useState([])
    const [commerce, setCommerce]=useState([])
    
    useEffect(() => { 

        const getPromosByCommerce = async() => {
            try {
                setLoading(true)
                const promos= await PromotionsService.getPromotionsByComercio(Number(id))
                setPromos(promos.data)
            
            } catch (error) {
                setError(error)    
            }
            finally{
                setLoading(false)
            }
        }

        getPromosByCommerce();

    }, [])

    useEffect(() => {

        const getCommerce = async () => { 
            const commerce = await ApiCrudService.show('commerces',Number(id))
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