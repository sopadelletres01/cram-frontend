import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ApiCrudService from '../../services/crud.service'
import CardCommerce from './CardCommerce'
import { useGlobalState } from '../context/GlobalContext'


function Commerces() {

  const { user } = useAuth()
  const { setLoading, setError } = useGlobalState()
  const [listCommerce, setListCommerce] = useState([]);
  useEffect (() => { 
// cogeremos todos los comercios
    const getAllCommerce = async () => { 
      try{
        setLoading(true)
        const commerces = await ApiCrudService.index('commerces')
       setListCommerce(commerces.data)
      }catch(e){
        setError(e)
      }
      finally{
        setLoading(false)
      }
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
