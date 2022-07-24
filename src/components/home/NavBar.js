import React, { useState } from 'react';
//import '../css/estilosGrid'
import { Button } from 'react-bootstrap';

export function NavBar() {
  return (
    <>
      <div className="container__navbar">
        <div className="navbar__logo">
          <h1>Logo</h1>
        </div>
        <div className="navbar__buttons">
          <Button>Usuarios</Button>
          <Button>Eventos</Button>
          <Button>Comercios</Button>
          <Button>dgdfgdg</Button>
          <Button> logOut</Button>
        </div>
        <div>
          <h3>imgane del usuario</h3>
        </div>
      </div>
    </>
  );
}
