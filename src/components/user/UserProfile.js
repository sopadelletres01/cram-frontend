import React, { useState, useEffect, useRef, useContext } from 'react';
import { Col, Form, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import UsuariosService from '../../services/users.service';
import { useAuth } from '../context/AuthContext';
import { useGlobalState } from '../context/GlobalContext';

export default function UserProfile() {
  const { setError } = useGlobalState();
  const { user, logout } = useAuth();
  const { loading, setLoading } = useGlobalState();
  const [selectedFile, setSelectedFile] = useState();
  const [rolName, setRolName] = useState('');
  const [form, setForm] = useState({});
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
  }, [rolName]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let res = await UsuariosService.getRolByUser(user.idRole);
        if (res.status === 200) {
          setRolName(res.data.name);
        }
        let userRes = await UsuariosService.show('users', user.id);
        setUserData(userRes.data);
      } catch (e) {
        setError(e);
        if (e?.response?.status === 404) {
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleFileChange = e => {
    setSelectedFile(e.target.files[0]);
  };
  const handleFileUpload = async e => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Selecciona una imagen antes...');
      return;
    }
    // Create an object of formData
    const formData = new FormData();

    formData.append('image', selectedFile, selectedFile.name);
    // Details of the uploaded file

    // Request made to the backend api
    // Send formData object
    try {
      let res = await UsuariosService.updateAvatar(formData, user.id);
      if (res.status === 200) {
        setUserData({ ...userData, photo: res.data.photo });
      }
    } catch (e) {
      setError(e);
      if (e?.response?.status === 500) {
      }
    }
  };

  const handleRedirect = e => {
    e.preventDefault();
    logout();
    navigate('/forgot');
  };

  const handleUpdateProfile = async e => {
    //Hacer fecha nacimiento tipo date
    //Comprobar que los valores no esten vacios
    e.preventDefault();
    try {
      let res = await UsuariosService.update('users', user.id, form);
      if (res.status === 200) {
        setUserData({ ...userData, ...form });
      }
    } catch (e) {
      setError(e);
      if (e?.response?.status === 500) {
        alert('Ha habido un problema al actualizar el user');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className={'bg-light rounded p-4 w-100'}>
        {userData && (
          <Form className='profile__form'>
            <h1>Perfil de Usuario</h1>
            {rolName && <h5 style={{ textTransform: 'capitalize' }}>Rol: {rolName}</h5>}
            <fieldset className="customLegend">
              <legend>Avatar</legend>
              <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                <div className="avatar__form">
                  <Image src={userData?.photo || 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png'} roundedCircle></Image>
                </div>
                <Form.Group controlId="formFile">
                  <Form.Label>Selecciona un nuevo avatar:</Form.Label>
                  <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
                <button onClick={handleFileUpload} className="button__profile">
                  Cambiar avatar
                </button>
              </Form.Group>
            </fieldset>
            <fieldset className="flex-wrap customLegend mobile__column">
              <legend>Datos</legend>
              <Col>
                <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column>Nombre</Form.Label>
                  <Col sm="10">
                    <Form.Control value={form.name} placeholder={userData.name} />
                  </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label>Apellidos</Form.Label>
                  <Col sm="10">
                    <Form.Control placeholder={userData.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} value={form.last_name} />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} className="mb-3" controlId="formPlaintextEmail">
                  <Form.Label column>Email</Form.Label>
                  <Col sm="10">
                    <Form.Control readOnly defaultValue={userData.email} />
                  </Col>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column>Telefono</Form.Label>
                  <Col sm="10">
                    <Form.Control onChange={e => setForm({ ...form, phone: e.target.value })} placeholder={userData.phone} value={form.phone} />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} className="mb-3" controlId="formPlaintextEmail">
                  <Form.Label column>DNI</Form.Label>
                  <Col sm="10">
                    <Form.Control readOnly defaultValue={userData.dni} />
                  </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="formPlaintextEmail">
                  <Form.Label column>Fecha nacimiento</Form.Label>
                  <Col sm="10">
                    <Form.Control type="date" onChange={e => setForm({ ...form, date_of_birth: e.target.value })} value={userData.date_of_birth} />
                  </Col>
                </Form.Group>
              </Col>
              <button onClick={handleUpdateProfile} className="button__profile">
                Actualizar perfil
              </button>
            </fieldset>
          </Form>
        )}

        <h5 className=" profile__forgot rounded">
          <span className="text-secondary ">¿Olvidaste la contraseña?   </span>
          <Link className='color' onClick={handleRedirect} to="/forgot">
            Recuperar
          </Link>
        </h5>
      </div>
    </div>
  );
}
