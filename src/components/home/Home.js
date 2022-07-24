import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
//import '../css/estilosGrid.scss'

export default function Home() {
  return (
    <div>
      Home Page
      <Link to="/login">Iniciar Sesion</Link>
    </div>
  );
}
//<img src="https://img.europapress.es/fotoweb/fotonoticia_20211003143235_1200.jpg"/>
