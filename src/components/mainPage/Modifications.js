import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { AuthContext, useAuth } from '../context/AuthContext';
import ApiCrudService from '../../services/crud.service';
import UsuariosService from '../../services/users.service';
import { useGlobalState } from '../context/GlobalContext';
import EventosService from '../../services/events.service';
import MenusAuxiliar from './MenuAux';
import { Link } from 'react-router-dom';

export default function Modificaciones({ tabla }) {
  const { user } = useAuth();
const {setError, loading, setLoading} = useGlobalState()
const [userForm, setUserForm] = useState([]);
  const [search, setSearch] = useState(false);
  const [events, setEventos] = useState([]);
  const [formState, setFormState] = useState('search');
  /* search , editar(bloque de DNI), eliminar */
  /* search :[search]  => Visualizamos los datos 2 opciones 1 EDITAR 2 BORRAR
    EDITAR => todos los campos se desbloquean menos el DNI que se bloquea y lo botones que aparecen son Guardar o Cancelar.
        GUARDAR => te guarda los cambios del user
        CANCELAR=> te deja los valores que tenia antes/
    BORRAR=> te borrar el user pero antes borrar las incripciones
        promp  de confirmacion cuando le des a borrar

    */

  const handleDelete = async () => {
    try {
      if (events.length === 0) {
        let res = await UsuariosService.delete('users', userForm.id);
        console.log(res.data);
        alert('Se ha eliminado el user...');
        if (res.status === 200) {
          console.log(res.data.message);
          setFormState('search');
          setSearch(false);
          setUserForm({});
        }
        return;
      }
      let res = await UsuariosService.deleteInscriptionsByUser(userForm.id);
      alert('Se han eliminado las Inscriptions del user...');
      console.log(res.data);
      if (res.status === 200) {
        console.log(res.data.message);
        let delRes = await UsuariosService.delete('users', userForm.id);
        alert('Se ha eliminado el user...');
        console.log(delRes.data);
        setFormState('search');
        setSearch(false);
        setUserForm({});
      }
    } catch (e) {
      setError(e);
      console.log(e);
    }
    /* let res = await  */
  };

  const renderButtons = () => {
    switch (formState) {
      case 'search':
        return (
          <Button variant="primary" type="submit">
            search
          </Button>
        );
      case 'opciones':
        return (
          <>
            <Button variant="primary" type="submit">
              search
            </Button>
            <Button onClick={e => setFormState('editar')} variant="warning" type="button">
              Editar
            </Button>
            <Button onClick={e => setFormState('eliminar')} variant="danger" type="button">
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
            <Button onClick={e => setFormState('opciones')} variant="secondary" type="button">
              Cancelar
            </Button>
          </>
        );
      case 'eliminar':
        let respuesta = window.confirm('Esta seguro de que quieres eliminar a este user? ');
        console.log(respuesta);
        if (!respuesta) {
          setFormState('opciones');
          return;
        }
        handleDelete();

      default:
        setFormState('opciones');
        break;
    }
  };

  const handleBlur = async e => {
    console.log(e);
    e.preventDefault();
    /* setLoading(true); */

    try {
      let res = await UsuariosService.searchUser(e.target.value);
      console.log(res.data);
      setUserForm(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    /* setLoading(true); */
    setSearch(true);
    try {
      setLoading(true);
      if (formState === 'editar') {
        let res = await UsuariosService.update('users', userForm.id, userForm);
        console.log(res);
        if (res.status === 200) {
          setFormState('opciones');
        }
        console.log('RESSSSSSSSSSSSSSSSSSSSSss', res);
        return;
      }
      let res = await UsuariosService.searchUser(userForm.dni);

      let ev = await EventosService.getEventsByUser(res.data.id);
      console.log(ev.data);
      setEventos(ev.data);
      setFormState('opciones');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <MenusAuxiliar>
        <Link className="btn btn-warning" to={'/Inscriptions'} title={'Modicar user'}>
          Dar de alta user
        </Link>
      </MenusAuxiliar>
      <div className="flex-wrap container__dos-modificaciones">
        <Form onSubmit={handleSubmit}>
          <h3>Introduce los datos del user</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              value={userForm.name || ''}
              onChange={e => {
                setUserForm({ ...userForm, name: e.target.value });
              }}
              readOnly={formState !== 'editar'}
            />
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              value={userForm.last_name || ''}
              onChange={e => {
                setUserForm({ ...userForm, last_name: e.target.value });
              }}
              readOnly={formState !== 'editar'}
            />
            <Form.Label>Dni</Form.Label>
            <Form.Control
              value={userForm.dni || ''}
              onBlur={handleBlur}
              type="text"
              maxLength="9"
              minLength="9"
              onChange={e => {
                setUserForm({ ...userForm, dni: e.target.value.toUpperCase() });
              }}
              readOnly={formState === 'editar'}
            />
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              value={userForm.phone || ''}
              type="text"
              maxLength="9"
              onChange={e => {
                setUserForm({ ...userForm, phone: e.target.value });
              }}
              readOnly={formState !== 'editar'}
            />
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={userForm.email || ''}
              type="email"
              onChange={e => {
                setUserForm({ ...userForm, email: e.target.value });
              }}
              readOnly={formState !== 'editar'}
            />
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              value={userForm.date_of_birth || ''}
              type="date"
              placeholder="AAAA/MM/DD"
              onChange={e => {
                setUserForm({ ...userForm, date_of_birth: e.target.value });
              }}
              readOnly={formState !== 'editar'}
            />
          </Form.Group>
          {renderButtons()}
        </Form>
        {search ? (
          <div>
            <h3>Eventos del user</h3>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>nº</th>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Edicion</th>
                  <th>Fecha</th>
                  <th>Lugar</th>
                </tr>
              </thead>
              <tbody>
                {events.map((evento, e) => {
                  return (
                    <tr key={evento.id}>
                      <td>{e + 1}</td>
                      <td>{evento.idEvent}</td>
                      <td>{evento.name}</td>
                      <td>{evento.edition}</td>
                      <td>{evento.start_date} - {evento.final_date} </td>
                      <td>{evento.adress}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : null}
      </div>
    </>
  );
}
