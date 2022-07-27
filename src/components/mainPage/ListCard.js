import React, {useState} from 'react';
import Card from './Card';
import EventsService from '../services/events.service'
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
      {list.map(element => {
        return <Card element={element} />;
      })}
    </div>
  );
}

export default ListCard;
