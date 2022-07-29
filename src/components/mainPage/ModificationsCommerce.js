import React, { CSSProperties, useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import mapboxgl from 'mapbox-gl';
import Papa from 'papaparse';
import { Form, Button } from 'react-bootstrap';
import ApiCrudService from '../../services/crud.service';
import EventosService from '../../services/events.service';
import ComerciosService from '../../services/commerces.service';
import MenusAuxiliar from './MenuAux';
import { Link } from 'react-router-dom';

export default function ModificacionesCo() {
  const [listEventos, setListEventos] = useState([]);
  const [listCategorias, setListCategorias] = useState([]);
  const [commerce, setComercio] = useState([]);
  const [formComer, setFormComer] = useState([]);

  //esto se va a renderizar una vez cuando se monte el componente
  useEffect(() => {
    async function getData() {
      let events = await EventosService.getEventosCurrent();
      setListEventos(events.data);
      let categos = await ApiCrudService.index('categorias');
      setListCategorias(categos.data);
    }
    getData();
  }, []);

  const handleBlur = async e => {
    e.preventDefault();
    /* setLoading(true); */

    try {
      let res = await ComerciosService.serachComercio(e.target.value);
      setComercio(res.data);
    } catch (error) {
    }
  };
  const renderButtons = () => {
    switch (formComer) {
      case 'buscar':
        return (
          <Button variant="primary" type="submit">
            Buscar
          </Button>
        );
      case 'opciones':
        return (
          <>
            <Button variant="primary" type="submit">
              Buscar
            </Button>
            <Button onClick={e => setFormComer('editar')} variant="warning" type="button">
              Editar
            </Button>
            <Button onClick={e => setFormComer('eliminar')} variant="danger" type="button">
              Eliminar
            </Button>
          </>
        );
      case 'editar':
        return (
          <>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
            <Button onClick={e => setFormComer('opciones')} variant="secondary" type="button">
              Cancelar
            </Button>
          </>
        );
      case 'eliminar':
        let respuesta = window.confirm('Esta seguro de que quieres eliminar a este user? ');
        if (!respuesta) {
          setFormComer('opciones');
          return;
        }
      /*             handleDelete() */

      default:
        setFormComer('opciones');
        break;
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    let updateComer = await ApiCrudService.update('commerces');
  };

  return (
    <>
      <MenusAuxiliar>
        <Link className="btn btn-warning" to={'/commerce'} title={'busvar commerce'}>
          {' '}
          Buscar Comercio
        </Link>
        <Link className="btn btn-warning" to={'/commerce'} title={'Dar de alta commerce'}>
          Alta Comercio
        </Link>
      </MenusAuxiliar>
      <div className="container__cruds">
        <Form id="form" onSubmit={handleSubmit}>
          <Button>Añadir localizacion</Button>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <h3>Busca el commerce por el numero de NIF</h3>
            <Form.Label>Nif</Form.Label>
            <Form.Control onBlur={handleBlur} name="nif" minLength="9" maxLength="9" type="text" required />
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="name" type="text" readOnly />
            <Form.Label>Poblacón</Form.Label>
            <Form.Control name="town" type="text" readOnly />
            <Form.Label>Emial</Form.Label>
            <Form.Control name="email" type="email" readOnly />
            <Form.Label>Latitud</Form.Label>
            <Form.Control name="latitud" readOnly />
            <Form.Label>Longitud</Form.Label>
            <Form.Control name="longitud" readOnly />
            {/* hacer un select */}
            <Form.Label>Escoge una categoria</Form.Label>
            <Form.Select
              name="categoria_id"
              aria-label="Escoge una categoria"
              onChange={e => setComercio({ ...commerce, categoria_id: e.target.value })}
              readOnly
            >
              {
                <>
                  <option selected hidden>
                    Seleccion una categoria
                  </option>
                  {listCategorias.map(categoria => {
                    return <option value={categoria.id}>{categoria.categoria}</option>;
                  })}
                </>
              }
            </Form.Select>

            <Form.Label>Selecciona una foto para este evento</Form.Label>
            <Form.Control
              name="image"
              required
              type="file"
              placeholder="Sube una foro para tu evento"
              onChange={e => {
                setComercio({ ...commerce, file: e.target.files[0] });
              }}
            />
          </Form.Group>
          {renderButtons()}
        </Form>
      </div>
    </>
  );
}
