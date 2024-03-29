import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import AuthService from '../../services/auth.service';
import { useGlobalState } from '../context/GlobalContext';

export default function ForgotPassword() {
  const [form, setForm] = useState({ email: '' });
  let navigate = useNavigate();
  const {setError} = useGlobalState()
  const handleRedirect = () => {
    navigate('/login', { replace: true });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let res = await AuthService.forgotPassword(form);
      if (res.status === 200) {
        //Todo correcto pasamos al siguiente paso (esperar a la validacion del correo)
        navigate('/forgot/email-verification', {
          state: { email: form.email },
        });

        /* pasarle al Context el user  */
      }
    } catch (e) {
      setError(e);
      if (e.response.status === 400) {
        alert('CAGASTE, el email no existe');
      }
    }
  };

  return (
    <div className="container w-50 mt-5 bg-light rounded p-3">
      <Form className="justify-content-center " onSubmit={handleSubmit}>
        <h3 className="componente__titulo">Recuperacion contraseña</h3>
        <h4 className="componente__titulo peque">Introduce tu email para enviarte un email de verificacion</h4>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Dirección de email</Form.Label>
          <Form.Control name="email" size="sm" type="email" placeholder="introduce tu email" onChange={e => setForm({ ...form, email: e.target.value })} />
          <Form.Text className="text-muted">Estos datos no se van a compartir</Form.Text>
        </Form.Group>
        <Button className="botones__login" type="submit" variant="primary">
          Enviar email
        </Button>
        <Button onClick={handleRedirect} className="botones__login" type="button" variant="secondary">
          Volver atrás
        </Button>
      </Form>
    </div>
  );
}
