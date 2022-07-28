import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ApiCrudService from '../../services/crud.service'
import CardCommerce from './CardCommerce'


function Commerces() {

  const { user } = useAuth()
  const [listCommerce, setListCommerce] = useState([]);
  useEffect (() => { 
// cogeremos todos los comercios
    const getAllCommerce = async () => { 

      const commerces = await ApiCrudService.index('commerces')
      console.log(commerces)
     setListCommerce(commerces.data)
    }
    getAllCommerce();
  },[])

  return (
    <div className='container__list_commerce'>
      <div className='listCard_commerce'>
        {
          listCommerce.map((element) => { 
            return <CardCommerce element={element} />
          })
        }

      </div>


    </div>

  )
}

export default Commerces
