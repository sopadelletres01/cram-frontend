import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import ListPromotions from '../promotionsComponents/ListPromotions'
import EventsService from '../../services/events.service'
import ShowEvent from '../events/ShowEvent';
import { useGlobalState } from '../context/GlobalContext';


function Event() {
  const { id } = useParams();
  const { user } = useAuth();
  const { setLoading, setError } = useGlobalState();
  const [promos, setPromos] = useState([]);
  const [event, setEvent]=useState([]);
// Cogeremos las promociones de este evento gratuitos y las mostraremos
  useEffect(() => {
      
    const getPromos = async() => {
      setLoading(true)
      try{
        const listPromos = await EventsService.getPromotions(id)
        console.log(listPromos.data)
      }catch(e){
        setError(e)
      }
      finally{
        setLoading(false)
      }
    }
    getPromos();
    },[])

  useEffect(() => {
    const getEvent = async () => {
      console.log('entra aquiiiiii')
      const event = await EventsService.show('events', id)
      console.log('evento',event.data)
      setEvent(event.data)
      
    }
    getEvent();
  },[])
  
console.log(event)

  return (
    <div className='show__event'>
      <h2 className='title__detail_event'> Detalles del evento</h2>
        <ShowEvent event={event} />
        <h1  className='title__show_event'>Promociones asociadas al evento</h1>
        <ListPromotions id={id}>
        </ListPromotions>
      </div>
  )
}

export default Event