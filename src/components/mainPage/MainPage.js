import React, { useState, useEffect,  } from 'react';
import { useAuth } from '../context/AuthContext';
import EventsService from '../../services/events.service';
import ListCard from './ListCard'


export default function MainPage() {
  // eventos gratuitos y activos
  const [listFreeEvents, setListFreeEvents] = useState([]);
  // cogemos los eventos gratuitos
  useEffect(() => {
    const getEventsFree = async () => {
      let freeEvents = await EventsService.getEventsActiveFree();
      console.log('eventos gratuitos', freeEvents.data);
      setListFreeEvents(freeEvents.data);
    };

    getEventsFree();
  }, []);
  // cogemos los eventos del usuario
  // cogemos las promociones del usuario

  const { user } = useAuth();
  console.log('informacion del usuario', user);
  // coger todos los eventos gratuitos y mostrarlos.
  return (
    
    <div className="container__list ">
      <ListCard list={listFreeEvents} />
      
    </div>
  );
}
