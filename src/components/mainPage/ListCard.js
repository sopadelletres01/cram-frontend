import React, {useEffect, useState} from 'react';
import EventsService from '../services/events.service'
import CardEvent from '../events/CardEvent';
import { useAuth } from '../context/AuthContext';
function ListCard({ list }) {
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
  return (
    <div className="listCard">
      <br />
      {list && list.map(element => {
        return <CardEvent element={element} />;
      })}
    </div>
  );
}

export default ListCard;
