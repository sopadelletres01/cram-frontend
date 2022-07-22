import React, { useState, useContext } from "react";

//import '../css/estilosGrid.scss'
import * as yup from "yup";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { Formik } from "formik";
import YupPassword from "yup-password";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
YupPassword(yup);

/* no son integers son NUMBER */
const schema = yup.object().shape({
  password: yup.string().password().required("Tienes que poner una contraseña"),
  rep_password: yup
    .string()
    .password()
    .oneOf([yup.ref("password"), null], "Las contaseñas tiene que coincidir."),
  dni: yup.string().matches(/^(\d{8})([-]?)()[A-Z]{1}$/),
  terms: yup.bool().required().oneOf([true], "tienes que aceptar los términos"),
});
export function Register() {
  let navigate = useNavigate();
  const HandleRedirect = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="container w-50 mt-5 bg-light rounded p-3">
      <div className="row justify-content-center">
        <h3 className="componente__titulo">Register</h3>
        <Formik
          validationSchema={schema}
          initialValues={{
            password: "",
            rep_password: "",
            dni: "",
            terms: false,
          }}
          onSubmit={async (values) => {
            console.log(values);
            const { password, rep_password, dni } = values;
            let formData = {
              password,
              rep_password,
              dni,
            };
            let registro = null;
            try {
              registro = await AuthService.signup(formData);
              console.log("registro", registro);
              if (registro.status === 201) {
                navigate("/login");
              }
            } catch (e) {
              console.log("ERROR", e);
              if (e.response.status === 400) {
                alert(
                  "El usuario con este dni ya ha sido añadido a nuestra app"
                );
              }
              console.log(e);
            }
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
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
                    <Form.Text className="text-muted">
                      Introduce la contraseña para autenticarte en nuestra
                      aplicacion
                    </Form.Text>
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
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="DNI"
                    name="dni"
                    value={values.dni}
                    onChange={handleChange}
                    isInvalid={!!errors.dni}
                  />
                  <Form.Text className="text-muted">
                    Introduce tu dni para que podamos verificar si estas
                    inscrito a alguna carrera
                  </Form.Text>
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
              <Button
                className="botones__login"
                variant="primary"
                type="submit"
              >
                Registrate
              </Button>
              <Button
                className="botones__login"
                variant="secondary"
                onClick={() => HandleRedirect()}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
