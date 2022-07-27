import React from 'react';
import * as yup from 'yup';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import YupPassword from 'yup-password';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalContext';
YupPassword(yup);
/* no son integers son NUMBER */
const schema = yup.object().shape({
  name: yup.string().required('Es obligatorio saber tu nombre.'),
  last_name: yup.string(),
  date_of_birth: yup.date().required('Introduce tu fecha de nacimiento para saber si eres mayor de edad'),
  email: yup.string().email('El formato del email no es válido').max(255).required('es necesario tu email'),

  adress: yup.string(),
  cp: yup.string().min(4).max(4),
  town: yup.string(),
  country: yup.string(),
  password: yup.string().password().required('Tienes que poner una contraseña'),
  rep_password: yup
    .string()
    .password()
    .oneOf([yup.ref('password'), null], 'Las contaseñas tiene que coincidir.'),
  dni: yup.string().matches(/^(\d{8})([-]?)()[A-Z]{1}$/),
  terms: yup.bool().required().oneOf([true], 'tienes que aceptar los términos'),
});

export function GeneralInscription() {
  let navigate = useNavigate();
  const {setError} = useGlobalState()

  const HandleRedirect = () => {
    navigate('/login', { replace: true });
  };
  return (
    <div className="container w-50 mt-5 bg-light rounded p-3">
      <div className="row justify-content-center">
        <h3 className="componente__titulo">Registro</h3>
        <Formik
          validationSchema={schema}
          initialValues={{
            name: '',
            last_name: '',
            date_of_birth: '',
            email: '',
            adress: '',
            cp: '',
            town: '',
            country: '',
            password: '',
            rep_password: '',
            dni: '',
            terms: false,
          }}
          onSubmit={async values => {
            console.log(values);
            const { name, last_name, date_of_birth, email, adress, cp, town, country, password, rep_password, dni } = values;
            let formData = {
              name,
              last_name,
              date_of_birth,
              email,
              adress,
              cp,
              town,
              country,
              password,
              rep_password,
              dni,
            };
            let registro = null;
            try {
              registro = await AuthService.register(formData);
              console.log('registro', registro);
              if (registro.status === 201) {
                navigate('/login');
              }
            } catch (e) {
              setError(e);
              console.log('ERROR', e);
              if (e.response.status === 400) {
                alert('El usuario con este dni ya ha sido añadido a nuestra app');
              }
              console.log(e);
            }
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              {/* NOMBRE */}
              <Row>
                <Form.Group as={Col} controlId="validationFormikPassword">
                  <Form.Label>
                    Nombre <span className="importante">**</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      aria-describedby="inputGroupPrepend"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Text className="text-muted">Nos encataria saber tu nombre</Form.Text>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.name}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              {/* APELLIDOS */}

              <Row>
                <Form.Group as={Col} controlId="validationFormikPassword">
                  <Form.Label>Apellidos </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="Apellidos"
                      aria-describedby="inputGroupPrepend"
                      name="last_name"
                      value={values.last_name}
                      onChange={handleChange}
                      isInvalid={!!errors.last_name}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.last_name}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              {/* FECHA NACIMINETO */}
              <Row>
                <Form.Group as={Col} controlId="validationFormikPassword">
                  <Form.Label>
                    fecha de nacimiento <span className="importante">**</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="date"
                      placeholder="2006-01-01"
                      aria-describedby="inputGroupPrepend"
                      name="date_of_birth"
                      value={values.date_of_birth}
                      onChange={handleChange}
                      isInvalid={!!errors.date_of_birth}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.date_of_birth}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              {/* EMAIL */}
              <Row>
                <Form.Group as={Col} controlId="validationFormikPassword">
                  <Form.Label>
                    email <span className="importante">**</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="email"
                      placeholder="email@email.com"
                      aria-describedby="inputGroupPrepend"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Text className="text-muted">Introduce un email válido.</Form.Text>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.email}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              {/* TELEFONO */}
              <Row>
                <Form.Group as={Col} controlId="validationFormikPassword">
                  <Form.Label>phone </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="number"
                      placeholder="phone"
                      aria-describedby="inputGroupPrepend"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                    />
                    <Form.Text className="text-muted">Introduce la contraseña para autenticarte en nuestra aplicacion</Form.Text>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.phone}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>

              {/* CONTRASEÑA */}
              <Row>
                <Form.Group as={Col} controlId="validationFormikPassword">
                  <Form.Label>
                    Contraseña <span className="importante">**</span>
                  </Form.Label>
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
                    <Form.Text className="text-muted">Introduce la contraseña para autenticarte en nuestra aplicacion</Form.Text>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              {/* Repite CONTRASEÑA */}
              <Row>
                <Form.Group as={Col} controlId="validationFormikPassword2">
                  <Form.Label>
                    Repite la contraseña <span className="importante">**</span>
                  </Form.Label>
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
                </Form.Group>
              </Row>
              <Row>
                {/* DNI */}
                <Form.Group as={Col} controlId="validationFormik103">
                  <Form.Label>
                    DNI <span className="importante">**</span>
                  </Form.Label>
                  <Form.Control type="text" placeholder="DNI **" name="dni" value={values.dni} onChange={handleChange} isInvalid={!!errors.dni} />

                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.dni}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* CHECK */}
              <Form.Group className="position-relative mb-3">
                <Form.Check
                  required
                  name="terms"
                  label="Agree to terms and conditions"
                  onChange={handleChange}
                  isInvalid={!!errors.terms}
                  feedback={errors.terms}
                  feedbackType="invalid"
                  id="validationFormik106"
                  feedbackTooltip
                />
              </Form.Group>
              <Button className="botones__registrate" variant="primary" type="submit">
                Registrate
              </Button>
              <Button className="botones__login" variant="secondary" onClick={() => HandleRedirect()}>
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
