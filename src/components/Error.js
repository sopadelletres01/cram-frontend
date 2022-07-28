import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGlobalState } from './context/GlobalContext';

function Error({ ...props }) {
  const { error } = useGlobalState();
  const [show, setShow] = useState(false);

  const handleError = err => {
    if (process.env.NODE_ENV === 'development') {
      if (err instanceof AxiosError) {
        return (err && err.response && err.response.data && err.response.data.message) || err.message;
      }
      if (typeof err === 'object') {
        return err.message;
      }
      return err;
    }
    return "Lo sentimos, ha habido un error, vuelve a intentarlo..."
  };

  useEffect(() => {
    setShow(error ? true : false);
  }, [error]);

  const handleClose = () => setShow(false);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Error!!</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <b>Ha habido un error:</b>
          <br />
          <br />
          {error && handleError(error)}
          <br/>
          <br/>
          <Link onClick={()=>setShow(false)} to="/" >Volver al inicio</Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Error;
