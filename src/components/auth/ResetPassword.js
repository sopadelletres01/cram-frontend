import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import AuthService from '../../services/auth.service';
//import '../css/estilosGrid.scss'
import YupPassword from 'yup-password';
import * as yup from 'yup';
import { Formik } from 'formik';
const bcrypt = require('bcryptjs');

const schema = yup.object().shape({
  password: yup.string().password().required('Tienes que poner una contraseña'),

  /* Que conincida la doble contraseña */
  rep_password: yup
    .string()
    .password()
    .oneOf([yup.ref('password'), null], 'Las contaseñas tiene que coincidir.'),
});

export default function ResetPassword() {
  const { id, token } = useParams();
  let navigate = useNavigate();
  const HandleSubmit = async values => {
    const { password } = values;
    let form = { id, token, password: bcrypt.hashSync(password, 8) };
    console.log('form', form);
    try {
      let res = await AuthService.resetPassword(form);
      console.log(res);
      if (res.status === 200) {
        //Todo correcto, volvemos al login
        console.log('ok', res.status);
        navigate('/login', { replace: true });

        /* pasarle al Context el usuario  */
      }
    } catch (e) {
      if (e.response.status === 400) {
        console.log('CAGASTE');
        alert('CAGASTE,no se ha podido actualizar la contraseña');
      }
      console.log(e);
    }
  };

  return (
    <div className="container w-25 mt-5 bg-light rounded p-3">
      <Formik
        validationSchema={schema}
        initialValues={{
          password: '',
          rep_password: '',
        }}
        onSubmit={HandleSubmit}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {/* CONTRASEÑA */}
            <Row>
              <Form.Group as={Col} controlId="validationFormikPassword">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    aria-describedby="inputGroupPrepend"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            {/* Repite CONTRASEÑA */}
            <Row>
              <Form.Group as={Col} controlId="validationFormikPassword2">
                <Form.Label>Repite la contraseña</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    aria-describedby="inputGroupPrepend"
                    name="rep_password"
                    value={values.rep_password}
                    onChange={handleChange}
                    isInvalid={!!errors.rep_password}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.rep_password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Button disabled={!!errors.rep_password} className="botones__login" type="submit">
              Guardar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
