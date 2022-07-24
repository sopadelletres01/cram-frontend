import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Image, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext, useAuth } from '../context/AuthContext';
import ApiCrudService from '../../services/crud.service';
import EventosService from '../../services/eventos.service';
import MenusAuxiliar from './MenusAuxiliar';
import axios from 'axios';

export default function EventosC() {
  const { user, loading, setLoading } = useAuth();
  const [evento, setEvento] = useState([]);
  const [datos, setDatos] = useState([]);
  const [listEventos, setListEventos] = useState([]);
  const [imagen, setImagen] = useState();
  const [formState, setFormState] = useState('buscar');

  useEffect(() => {}, [evento, imagen]);

  ////////////////////////////////---Formulario-----//////////////////////////////////////
  const handleSubmit = async e => {
    e.preventDefault();
    var todayDate = new Date().toISOString().slice(0, 10);
    try {
      if (todayDate < evento.fecha_inicio && evento.fecha_inicio <= evento.fecha_finalizacion) {
        const elem = document.getElementById('form');
        console.log('elem', elem);

        const formData = new FormData(elem);
        let res = await ApiCrudService.create('eventos', formData);
        //{eventdata,src}
        if (res.status === 200) {
          setEvento(res.data);
        }
        /*for (var pair of formData.entries()) {
                    console.log(pair[0]+ ', ' + pair[1]); 
                }
                console.log(todayDate, "fecha de inicio",evento.fecha_inicio);
                console.log('informacion del EVENTO',evento) */

        /* 
                let newEvento= await ApiCrudService.create('eventos',evento)
                setEvento({...evento,src:newEvento.src});
                console.log("informacion del nuevo EVENTO",newEvento.data) */
      } else {
        alert('Las fechas son más pequeñas que el día de hoy.');
      }
    } catch (e) {
      if (e?.response?.status === 500) {
        console.log('EL error esta en el servidor ', e);
      } else {
        console.log(e);
      }
    }
  };

  return (
    <>
      <MenusAuxiliar>
        <Link className="btn btn-warning" to={'/eventos/modificaciones'} title={'Modicar Evento'}>
          {' '}
          Buscar Evento
        </Link>
      </MenusAuxiliar>
      <div className="create__evento">
        <h3>Dar de alta un evento</h3>
        <fieldset className="customLegend">
          <legend>Imagen del evento</legend>

          <div className="avatar__form">
            <Image
              src={
                evento.src ||
                'https://res.cloudinary.com/dhdbik42m/image/upload/v1652897103/no-hay-icono-de-foto-estilo-contorno-delgado-la-colecci_C3_B3n-iconos-se_C3_B1as-del-centro-comercial-ning_C3_BAn-fotos-para-dise_C3_B1o-147583922_xe4gzv.jpg'
              }
              roundedCircle
            ></Image>
          </div>
        </fieldset>
        <Form id="form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {console.log(Date.now())}
            {/*                     <Image src={evento.src || "https://res.cloudinary.com/dhdbik42m/image/upload/v1652897103/no-hay-icono-de-foto-estilo-contorno-delgado-la-colecci_C3_B3n-iconos-se_C3_B1as-del-centro-comercial-ning_C3_BAn-fotos-para-dise_C3_B1o-147583922_xe4gzv.jpg" }/>
             */}{' '}
            <Form.Label>Nombre del Evento</Form.Label>
            <Form.Control
              name="nombre"
              value={evento.nombre}
              required
              onChange={e => {
                setEvento({ ...evento, nombre: e.target.value });
              }}
            />
            <Form.Label>Descripcion del Evento</Form.Label>
            <Form.Control
              name="descripcion"
              value={evento.descripcion}
              required
              onChange={e => {
                setEvento({ ...evento, descripcion: e.target.value });
              }}
            />
            <Form.Label>Edición</Form.Label>
            <Form.Control
              name="edicion"
              required
              type="text"
              onChange={e => {
                setEvento({ ...evento, edicion: e.target.value });
              }}
            />
            <Form.Label>Lugar</Form.Label>
            <Form.Control
              name="lugar"
              required
              type="text"
              onChange={e => {
                setEvento({ ...evento, lugar: e.target.value });
              }}
            />
            <Form.Label>Fecha de Inicio</Form.Label>
            <Form.Control
              name="fecha_inicio"
              required
              type="date"
              onChange={e => {
                setEvento({ ...evento, fecha_inicio: e.target.value });
              }}
            />
            <Form.Label>Fecha de Finalización</Form.Label>
            <Form.Control
              name="fecha_finalizacion"
              required
              type="date"
              onChange={e => {
                setEvento({ ...evento, fecha_finalizacion: e.target.value });
              }}
            />
            <Form.Label>Selecciona una foto para este evento</Form.Label>
            <Form.Control
              name="image"
              required
              type="file"
              placeholder="Sube una foro para tu evento"
              onChange={e => {
                setEvento({ ...evento, file: e.target.files[0] });
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {' '}
            Crear Evento
          </Button>
        </Form>
      </div>
    </>
  );
}
