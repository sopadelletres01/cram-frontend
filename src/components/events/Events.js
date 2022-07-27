import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Collapse } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import EventosService from '../../services/events.service';
import { AuthContext, useAuth } from '../context/AuthContext';
import Filters from './Filters';
import CardEvent from './CardEvent';
import EventsService from '../../services/events.service'

//En esta pagina se mostraran todos los events de la aplicacion, por orden alfabetico o proximidad,
//por defecto, la lista mostrará primero los events a los que estas inscrito y los diferenciará de los otros
//con una etiqueta verde de "inscrito"
//Además, se podrá filtrar por inscritos o no inscritos, para que la busqueda sea mas sencilla

export default function Events() {
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
      {listFreeEvents.map(element => {
        return <CardEvent element={element} />;
      })}
    </div>
  );
}
