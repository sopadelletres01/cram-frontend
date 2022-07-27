import React, { useEffect, useState } from 'react';
import {Button, Offcanvas} from 'react-bootstrap';
import { useGlobalState } from './context/GlobalContext';

function Error({ ...props }) {
  const { error } = useGlobalState();
  const [show, setShow] = useState(false);

  useEffect(()=>{
    setShow(error ? true : false)
  },[error])

  const handleClose = () => setShow(false);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Error!!</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <b>
            Ha habido un error:
            </b>
            <br />
            <br />
          {error && error}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Error;