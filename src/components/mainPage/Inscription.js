import React, { CSSProperties, useState, useEffect, useContext } from 'react';
import { AuthContext, useAuth } from '../context/AuthContext';
import Papa from 'papaparse';
import { Form, Button } from 'react-bootstrap';
import ApiCrudService from '../../services/crud.service';
import EventsService from '../../services/events.service';
import { useGlobalState } from '../context/GlobalContext';
import MenusAuxiliar from './MenuAux';
import { Link } from 'react-router-dom';
export default function CSVReader() {
  const { user } = useAuth();
const {setError, loading, setLoading} = useGlobalState()
const [inscripcion, setInscripcion] = useState([]);
  const [datos, setDatos] = useState([]);
  const [events, setEventos] = useState([]);
  const [idEvento, setIdEvento] = useState();

  const [form, setForm] = useState([]);

  useEffect(() => {
    if (events.length < 0) return;
    async function getEventos() {
      try {
        setLoading(true);
        const events = await EventsService.getEventsActive();
        setEventos(events.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    getEventos();
  }, []);

  const handleSubmitAlone = async e => {
    e.preventDefault();
    try {
      setLoading(true)
      let res = await ApiCrudService.create('users', form);
      setDatos(res.data.id);
      let inscription = await ApiCrudService.create('inscriptions', { idUser: Number(res.data.id), idEvent: Number(idEvento) });
    } catch (e) {
      setError(e);
    }
    finally{
      setLoading(false)
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true)
      let newIns = await Promise.all(
        inscripcion.map(async ins => {
          return await ApiCrudService.create('users', ins);
        })
      );
      setDatos(newIns);

      await Promise.all(
        newIns.map(async part => {
          return await ApiCrudService.create('Inscriptions', { id_usuario: part.data.id, id_evento: idEvento });
        })
      );
      alert('Se han inscrito los users correctamente en la carrera .');
    } catch (e) {
      setError(e);
    }
    finally{
      setLoading(false)
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
          const Inscriptions = ins.data;
          setInscripcion(Inscriptions);
        },
      });
    }
  };

  return (
    <div className='userManagement container mt-5'>
      <MenusAuxiliar>
        <Link className="btn botones__login" to={'/admin/users/edit'} title={'Modicar user'}>
          {' '}
          Buscar user
        </Link>
      </MenusAuxiliar>
      <div className="container__cruds">
        <div className="container__uno">
          <h3>Dar de alta users (archivo CSV)</h3>

          <Form.Label>Escoge un evento para inscribir a los participantes</Form.Label>
          <Form.Select aria-label="Escoge un evento" onChange={e => handleSelect(e)}>
            {
              <>
                <option selected hidden>
                  Selecciona una opcion
                </option>
                {events.map(evento => {
                  return <option value={evento.id}> {evento.name + ' ' + evento.edicion}</option>;
                })}
              </>
            }
          </Form.Select>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Escoge un archivo</Form.Label>
              <Form.Control onChange={e => handleFile(e)} type="file" accept=".csv,.xlsx,.xls" />
            </Form.Group>
            <Button className="botones__login" variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </div>

        {/* DAR DE ALTA SOLAMENTE A UN USUARIO */}
        <div className="container__dos">
          <Form onSubmit={handleSubmitAlone}>
            <h3>Dar de alta un user</h3>

            <Form.Label>Escoge un evento para inscribir a los participantes</Form.Label>
            <Form.Select aria-label="Escoge un evento" onChange={e => handleSelect(e)}>
              {events.map(evento => {
                return <option value={evento.id}> {evento.name + ' ' + evento.edition}</option>;
              })}
            </Form.Select>
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
                  setForm({ ...form, last_name: e.target.value });
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
                  setForm({ ...form, phone: e.target.value });
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
                  setForm({ ...form, date_of_birth: e.target.value });
                }}
              />
            </Form.Group>
            <Button className="botones__login" variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
