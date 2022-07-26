import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import MenusAuxiliar from "./MenusAuxiliar";
import EventsService from "../../services/events.service";
import ComerciosService from "../../services/comercios.service";
import ApiCrudService from "../../services/crud.service";
import Promociones from "../../services/promociones.service";
import PromocionesService from "../../services/promociones.service";
import { AuthContext } from "../context/AuthContext";

export default function ValidarPromo() {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [promoUser, setPromoUser] = useState({});
  const [promosUsed, setPromosUsed] = useState([]);
  const [encontrado, setEncontrado] = useState(false);

  useEffect(() => {
    console.log("ENCONTRADO", encontrado);
    //AQUI SALE
    console.log(promoUser);
  }, [promoUser, users, encontrado]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let promos = await ComerciosService.searchPromoAndUser(
        users.dni,
        user.comercio_id
      );
      console.log("PROMOS", promos);
      setPromoUser(promos.data);
      setUsers({ ...users, id: promoUser[0].id });
      console.log("INFORMACION DEL USUARIO", users);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setEncontrado(true);
    }
  };
  const handleValid = async (e, promo) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log("informacion de la promo", promo.id, promo.id_promocion);
    //enviar el id_usuario y el
    // id_promo a la APi para hacer insercción a la tabla usuario-promocion
    try {
      let res = await PromocionesService.existThisPromo(
        promo.id,
        promo.id_promocion
      );
      console.log("RESPUSTA DE LA CONSULTA", res);
      if (res.data === "") {
        let preg = window.confirm(
          "¿¿estas  seguro que quires validar esta promocion??"
        );
        if (preg === true) {
          let insert = await ApiCrudService.create("user_promo/promociones", {
            id_usuario: promo.id,
            id_promocion: promo.id_promocion,
          });
          if (insert.status === 200) {
            setEncontrado(false);
          }
        }
        console.log("no esxiste");
      } else {
        console.log("existe");
        window.alert("Esta promocion ya la han usado anteniormente.");
        setEncontrado(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MenusAuxiliar>
        {user.rol === 2 && (
          <>
            <Link
              className="btn btn-warning"
              to={"/comercio/modificaciones"}
              title={"Buscar comercio"}
            >
              Buscar Comercio
            </Link>
            <Link
              className="btn btn-warning"
              to={"/comercio"}
              title={"Dar de alta comercio"}
            >
              Alta Comercio
            </Link>
          </>
        )}
        <Link
          className="btn btn-warning"
          to={"/comercio/validar"}
          title={"Validar Promocion del comercio"}
          onClick={() => setEncontrado(false)}
        >
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
                onChange={(e) => setUsers({ ...users, dni: e.target.value })}
                placeholder="000000000R"
                minLength="9"
                maxLength="9"
                type="text"
                required
              />
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                minLength="9"
                maxLength="9"
                type="text"
                onChange={(e) =>
                  setUsers({ ...users, telefono: e.target.value })
                }
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setUsers({ ...users, email: e.target.value })}
              />
            </Form.Group>
            <Button type="submit">Buscar promociones</Button>
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
                    <td>{promo.id_promocion}</td>
                    <td>{promo.nombre}</td>
                    <td>{promo.edicion}</td>
                    <td>{promo.titulo}</td>
                    <td>
                      <Button onClick={(e) => handleValid(e, promo)}>
                        Validar
                      </Button>
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
