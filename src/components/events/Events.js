import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Collapse } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import EventosService from '../../services/events.service';
import { AuthContext, useAuth } from '../context/AuthContext';
import { useGlobalState } from '../context/GlobalContext';
import Filters from './Filters';
import CardEvent from './CardEvent';
import EventsService from '../../services/events.service';

//En esta pagina se mostraran todos los events de la aplicacion, por orden alfabetico o proximidad,
//por defecto, la lista mostrará primero los events a los que estas inscrito y los diferenciará de los otros
//con una etiqueta verde de "inscrito"
//Además, se podrá filtrar por inscritos o no inscritos, para que la busqueda sea mas sencilla

export default function Events() {
  const { user } = useAuth();
  const { loading, setLoading, setError } = useGlobalState();
  const [listFreeEvents, setListFreeEvents] = useState([]);
  // cogemos los eventos gratuitos
  useEffect(() => {
    const getEventsFree = async () => {
      try {
        setLoading(true);
        let freeEvents = await EventsService.getEventsActiveFree();
        console.log('eventos gratuitos', freeEvents.data);
        setListFreeEvents(freeEvents.data);
      } catch (e) {
        console.log(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    getEventsFree();
  }, []);
  // cogemos los eventos del usuario
  // cogemos las promociones del usuario

  console.log('informacion del usuario', user);
  return (
    <div className="container__list">
      <div className="listCard">
        {listFreeEvents.map(element => {
          return <CardEvent element={element} />;
        })}
      </div>
    </div>
  );
}
