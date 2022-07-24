import React, { CSSProperties, useState, useEffect, useContext } from 'react';
import { AuthContext, useAuth } from '../context/AuthContext';
import Papa from 'papaparse';
import { Form, Button } from 'react-bootstrap';
import ApiCrudService from '../../services/crud.service';
import EventosService from '../../services/eventos.service';
import MenusAuxiliar from './MenusAuxiliar';
import { Link } from 'react-router-dom';
export default function CSVReader() {
  const { user, loading, setLoading } = useAuth();
  const [inscripcion, setInscripcion] = useState([]);
  const [datos, setDatos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [idEvento, setIdEvento] = useState();

  const [form, setForm] = useState([]);

  useEffect(() => {
    if (eventos.length < 0) return;
    async function getEventos() {
      try {
        setLoading(true);
        const eventos = await EventosService.getEventosCurrent('eventos');
        setEventos(eventos.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    getEventos();
  }, []);

  const handleSubmitAlone = async e => {
    e.preventDefault();
    try {
      let res = await ApiCrudService.create('usuarios', form);
      setDatos(res.data.id);
      await ApiCrudService.create('inscripciones', { id_usuario: res.data.id, id_evento: idEvento });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let newIns = await Promise.all(
        inscripcion.map(async ins => {
          return await ApiCrudService.create('usuarios', ins);
        })
      );
      setDatos(newIns);

      await Promise.all(
        newIns.map(async part => {
          return await ApiCrudService.create('inscripciones', { id_usuario: part.data.id, id_evento: idEvento });
        })
      );
      alert('Se han inscrito los usuarios correctamente en la carrera .');
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelect = e => {
    let idEvento = e.target.value;
    setIdEvento(idEvento);
  };

  const handleFile = e => {
    const csv = e.target.files;
    if (csv) {
      Papa.parse(csv[0], {
        header: true,
        complete: function (ins) {
          const inscripciones = ins.data;
          setInscripcion(inscripciones);
        },
      });
    }
  };

  return (
    <>
      <MenusAuxiliar>
        <Link className="btn btn-warning" to={'/inscripciones/modificaciones'} title={'Modicar usuario'}>
          {' '}
          Buscar usuario
        </Link>
      </MenusAuxiliar>
      <div className="container__cruds">
        <div className="container__uno">
          <h3>Dar de alta usuarios (archivo CSV)</h3>

          <Form.Label>Escoge un evento para inscribir a los participantes</Form.Label>
          <Form.Select aria-label="Escoge un evento" onChange={e => handleSelect(e)}>
            {
              <>
                <option selected hidden>
                  Selecciona una opcion
                </option>
                {eventos.map(evento => {
                  return <option value={evento.id}> {evento.nombre + ' ' + evento.edicion}</option>;
                })}
              </>
            }
          </Form.Select>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Escoge un archivo</Form.Label>
              <Form.Control onChange={e => handleFile(e)} type="file" accept=".csv,.xlsx,.xls" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </div>

        {/* DAR DE ALTA SOLAMENTE A UN USUARIO */}
        <div className="container__dos">
          <Form onSubmit={handleSubmitAlone}>
            <h3>Dar de alta un usuario</h3>

            <Form.Label>Escoge un evento para inscribir a los participantes</Form.Label>
            <Form.Select aria-label="Escoge un evento" onChange={e => handleSelect(e)}>
              {eventos.map(evento => {
                return <option value={evento.id}> {evento.nombre + ' ' + evento.edicion}</option>;
              })}
            </Form.Select>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                onChange={e => {
                  setForm({ ...form, nombre: e.target.value });
                }}
              />
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                onChange={e => {
                  setForm({ ...form, apellidos: e.target.value });
                }}
              />
              <Form.Label>Dni</Form.Label>
              <Form.Control
                type="text"
                maxLength="9"
                minLength="9"
                onChange={e => {
                  setForm({ ...form, dni: e.target.value.toUpperCase() });
                }}
              />
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
      </div>
    </>
  );
}
