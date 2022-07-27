import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MenusAuxiliar from './MenuAux';
import EventosService from '../../services/events.service';
import ComerciosService from '../../services/commerces.service';
import ApiCrudService from '../../services/crud.service';
import { useGlobalState } from '../context/GlobalContext';
import Promotions from '../../services/promotions.service';
import PromotionsService from '../../services/promotions.service';
import { AuthContext, useAuth } from '../context/AuthContext';

export default function ValidarPromo() {
  const { user } = useAuth();
const {setError, loading, setLoading} = useGlobalState()
const [users, setUsers] = useState([]);
  const [promoUser, setPromoUser] = useState({});
  const [promosUsed, setPromosUsed] = useState([]);
  const [encontrado, setEncontrado] = useState(false);

  useEffect(() => {
    console.log('ENCONTRADO', encontrado);
    //AQUI SALE
    console.log(promoUser);
  }, [promoUser, users, encontrado]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      let promotions = await ComerciosService.searchPromoAndUser(users.dni, user.comercio_id);
      console.log('PROMOS', promotions);
      setPromoUser(promotions.data);
      setUsers({ ...users, id: promoUser[0].id });
      console.log('INFORMACION DEL USUARIO', users);
    } catch (e) {
      setError(e);
      console.log(e);
    } finally {
      setLoading(false);
      setEncontrado(true);
    }
  };
  const handleValid = async (e, promo) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log('informacion de la promo', promo.id, promo.id_Promotion);
    //enviar el id_usuario y el
    // id_promo a la APi para hacer insercción a la tabla user-Promotion
    try {
      let res = await PromotionsService.existThisPromo(promo.id, promo.id_Promotion);
      console.log('RESPUSTA DE LA CONSULTA', res);
      if (res.data === '') {
        let preg = window.confirm('¿¿estas  seguro que quires validar esta Promotion??');
        if (preg === true) {
          let insert = await ApiCrudService.create('user_promo/Promotions', {
            id_usuario: promo.id,
            id_Promotion: promo.id_Promotion,
          });
          if (insert.status === 200) {
            setEncontrado(false);
          }
        }
        console.log('no esxiste');
      } else {
        console.log('existe');
        window.alert('Esta Promotion ya la han usado anteniormente.');
        setEncontrado(false);
      }
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };

  return (
    <>
      <MenusAuxiliar>
        {user.rol === 2 && (
          <>
            <Link className="btn btn-warning" to={'/commerce/modificaciones'} title={'Buscar commerce'}>
              Buscar Comercio
            </Link>
            <Link className="btn btn-warning" to={'/commerce'} title={'Dar de alta commerce'}>
              Alta Comercio
            </Link>
          </>
        )}
        <Link className="btn btn-warning" to={'/commerce/validar'} title={'Validar Promotion del commerce'} onClick={() => setEncontrado(false)}>
          Validar Promoción
        </Link>
      </MenusAuxiliar>
      {!encontrado ? (
        <div className="container__dos-modificaciones">
          <Form onSubmit={handleSubmit}>
            <h3> Introduce los datos para validar la promoción</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Introduce el numero DNI del cliente</Form.Label>
              <Form.Control
                onChange={e => setUsers({ ...users, dni: e.target.value })}
                placeholder="000000000R"
                minLength="9"
                maxLength="9"
                type="text"
                required
              />
              <Form.Label>Telefono</Form.Label>
              <Form.Control minLength="9" maxLength="9" type="text" onChange={e => setUsers({ ...users, telefono: e.target.value })} />
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" onChange={e => setUsers({ ...users, email: e.target.value })} />
            </Form.Group>
            <Button type="submit">Buscar Promotions</Button>
          </Form>
        </div>
      ) : (
        <div>
          <Table>
            <thead>
              <tr>
                <th>nº</th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Edicion</th>
                <th>Titulo</th>
                <th>Validar</th>
              </tr>
            </thead>
            <tbody>
              {promoUser.map((promo, e) => {
                return (
                  <tr key={promo.id}>
                    <td>{e + 1}</td>
                    <td>{promo.id_Promotion}</td>
                    <td>{promo.name}</td>
                    <td>{promo.edicion}</td>
                    <td>{promo.title}</td>
                    <td>
                      <Button onClick={e => handleValid(e, promo)}>Validar</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}
