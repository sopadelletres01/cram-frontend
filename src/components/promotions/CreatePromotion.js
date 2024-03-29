import React, { CSSProperties, useState, useEffect, useContext, useRef } from 'react';
import { AuthContext, useAuth } from '../context/AuthContext';
import mapboxgl from 'mapbox-gl';
import Papa from 'papaparse';
import { Form, Button } from 'react-bootstrap';
import ApiCrudService from '../../services/crud.service';
import { useGlobalState } from '../context/GlobalContext';
import EventosService from '../../services/events.service';
import ComerciosService from '../../services/commerces.service';
import { Link } from 'react-router-dom';
import PromotionsService from '../../services/promotions.service';

export default function PromotionsC() {
  const { user } = useAuth();
  const [listEventos, setListEventos] = useState([]);
  const [listCategorias, setListCategorias] = useState([]);
const {setError} = useGlobalState()
const [commerce, setComercio] = useState([]);
  const [formComer, setFormComer] = useState([]);

  //esto se va a renderizar una vez cuando se monte el componente
  useEffect(() => {
    (async () => {
      try {
        let events = await EventosService.index('events');
        setListEventos(events.data);
      } catch (e) {
        setError(e);
      }
    })();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const elem = document.getElementById('form');
    const formData = new FormData(elem);
    formData.append('comercio_id', user.comercio_id);
    const res = await PromotionsService.create('Promotions', formData);
  };

  return (
    <>
      <div className="container__cruds">
        <Form id="form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <h3>Crea una nueva Promotion: </h3>
            <Form.Label>Titulo</Form.Label>
            <Form.Control name="title" type="text" required />
            <Form.Label>Fecha Inicio</Form.Label>
            <Form.Control name="fecha_inicio" type="date" />
            <Form.Label>Fecha Expiracion</Form.Label>
            <Form.Control name="fecha_expiracion" type="date" />
            <Form.Label>Descripcion</Form.Label>
            <Form.Control name="descripcion" />
            {/* hacer un select */}
            <Form.Label>Escoge un evento</Form.Label>
            <Form.Select name="evento_id" aria-label="Escoge un evento">
              {listEventos.map(evento => {
                return <option value={evento.id}> {evento.name + ' ' + evento.edicion}</option>;
              })}
            </Form.Select>

            <Form.Label>Selecciona una foto para este evento</Form.Label>
            <Form.Control name="image" required type="file" placeholder="Sube una foro para tu Promotion" />
            <Button variant="primary" type="submit">
              Crear promo
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
