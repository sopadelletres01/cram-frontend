import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import React, { useState, useEffect } from "react";
import EventsService from "../../services/events.service"
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carrousel from '../home/Carrousel'


//import '../css/estilosGrid.scss'
// FALT EL LOADING ❌❌
export default function Home() {
  const [freeEvents, setFreeEvents] = useState([]);
  
  useEffect(() => {
    
    async function getEventFree() {
      try {
        let events = await EventsService.getEventActiveFree('events')
        console.log('eventos gratuitos', events.data)
        setFreeEvents(events.data)
      }
      catch (e) {
        console.log('error al mostrar los eventos gratis activos', e)
    
      }
    }
    getEventFree()
  }, [])

  

  return (
    <section>
      {/* <Link to="/login">Iniciar Sesion</Link> */}
      <Carrousel listEvents={ freeEvents} />
    </section>    
    
  );
}
//<img src="https://img.europapress.es/fotoweb/fotonoticia_20211003143235_1200.jpg"/>
