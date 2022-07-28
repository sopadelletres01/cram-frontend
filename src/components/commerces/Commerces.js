import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ApiCrudService from '../../services/crud.service'
import CardEvent from '../events/CardEvent';


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
    <div className='conatiner__list'>
      <div className='listCard'>
        {
          listCommerce.map((element) => { 
            return <CardEvent element={element} />
          })
        }

      </div>


    </div>

  )
}

export default Commerces
