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
import UsuariosService from '../../services/users.service';
import { useGlobalState } from '../context/GlobalContext';

export default function Comercios() {
  const [form, setForm] = useState([]);
  const [long, setLong] = useState();
  const [lat, setLat] = useState();
const {setError} = useGlobalState()
const [loading, setLoading] = useState(false);
  const [commerce, setComercio] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [listComercio, setListComercio] = useState([]);
  const [complet, setComplet] = useState(false);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let cat = await ApiCrudService.index('categorias');
        setCategorias(cat.data);
        let comerNif = await ComerciosService.index('commerces');
        setListComercio(comerNif.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const handleSubmitAlone = async e => {
    e.preventDefault();

    try {
      let res = await UsuariosService.createComercial(form);
      if (res.status === 200) {
        setDatos({ ...datos, idUser: res.data.id });
        alert('Se ha creado el user correctamente');
      }
      //tengo que pasarle el id del commerce y el id del user
      setLoading(false);
      let userComer = await ApiCrudService.create('usuario_comercios', { comercio_id: commerce.id, idUser: res.data.id });
      window.alert('Ya se ha creado el el commerce y se ha vinculado al user.');
      setComercio({});
    } catch (e) {
      setError(e);
      alert('Ha habido un error al crear el user');

    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      var succes = function (position) {
        setLat(position.coords.latitude * 1);
        setLong(position.coords.longitude * 1);
      };
      navigator.geolocation.getCurrentPosition(succes, function (msg) {
        console.error(msg);
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(false);
    try {
      let elem = document.getElementById('form');
      let formData = new FormData(elem);
      let repetido = listComercio.find(commerce => commerce.nif === formData.get('nif'));
      if (repetido) {
        window.alert('Este NIF ya esta registrado en nuestra Base de datos.');
      } else {
        let res = await ApiCrudService.create('commerces', formData);
        if (res.status === 200) {
          setComercio(res.data);
          setDatos({ ...datos, comercio_id: res.data.id });

        }
      }
    } catch (err) {
    } finally {
      setComplet(true);
      setLoading(false);
    }
  };
  return (
    <>
      <MenusAuxiliar>
        <Link className="btn btn-warning" to={'/commerce/modificaciones'} title={'Modicar user'}>
          {' '}
          Buscar Comercio
        </Link>
      </MenusAuxiliar>

      <div className="container__cruds">
        {!complet ? (
          <Form id="form" onSubmit={handleSubmit}>
            <Button onClick={handleLocation}>Añadir localizacion</Button>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="name" type="text" required />
              <Form.Label>Poblacón</Form.Label>
              <Form.Control name="town" type="text" required />
              <Form.Label>Emial</Form.Label>
              <Form.Control name="email" type="email" required />
              <Form.Label>Latitud</Form.Label>
              <Form.Control name="latitud" value={lat} readOnly />
              <Form.Label>Longitud</Form.Label>
              <Form.Control name="longitud" value={long} readOnly />
              <Form.Label>Dni</Form.Label>
              <Form.Control name="nif" minLength="9" maxLength="9" type="text" required />
              {/* hacer un select */}
              <Form.Label>Escoge una categoria</Form.Label>
              <Form.Select
                name="categoria_id"
                aria-label="Escoge una categoria"
                onChange={e => setComercio({ ...commerce, categoria_id: e.target.value })}
                required
              >
                {
                  <>
                    <option selected hidden>
                      Seleccion una categoria para tu commerce
                    </option>
                    {categorias.map(categoria => {
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
            <Button type="submit">Enviar</Button>
          </Form>
        ) : (
          <div className="container__dos">
            <Form id="from_user" onSubmit={handleSubmitAlone}>
              <h3>Dar de alta un user</h3>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  onChange={e => {
                    setForm({ ...form, name: e.target.value });
                  }}
                />
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  onChange={e => {
                    setForm({ ...form, apellidos: e.target.value });
                  }}
                />
                <Form.Label>Nif Comercio</Form.Label>
                <Form.Control onChange={e => setForm({ ...form, dni: e.target.value })} type="text" maxLength="9" minLength="9" />
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="9"
                  onChange={e => {
                    setForm({ ...form, telefono: e.target.value });
                  }}
                />
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={e => {
                    setForm({ ...form, email: e.target.value });
                  }}
                />
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="AAAA/MM/DD"
                  onChange={e => {
                    setForm({ ...form, fecha_nacimiento: e.target.value });
                  }}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </div>
        )}
      </div>

      {/* DAR DE ALTA SOLAMENTE A UN USUARIO */}
      <div className="container__dos"></div>
    </>
  );
}
