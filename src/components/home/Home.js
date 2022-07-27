import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Intro from "./Intro";
import { FaChevronDown } from "react-icons/fa";
import CarouselWrapper from "./CarouselWrapper"
//import '../css/estilosGrid.scss'

//import '../css/estilosGrid.scss'
// FALT EL LOADING ❌❌
export default function Home() {
  
  const mainSectionRef = useRef(null);
  const executeScroll = () => mainSectionRef.current.scrollIntoView();
  return (
    <div className="home">
      {/* <Link to="/login">Iniciar Sesion</Link> */}
      <article className="intro">
        <Intro />
        <button onClick={() => executeScroll()} className="arrowDown">
          <FaChevronDown />
        </button>
      </article>
      <article ref={mainSectionRef} className="mainSection container">
        <h3>
          Con Cram Events podrás acceder y gestionar facilmente a los eventos
          que te inscribas y disfrutar de grandes promociones en comercios
          locales
        </h3>
        <CarouselWrapper/>
      </article>
    </div>
  );
}
//<img src="https://img.europapress.es/fotoweb/fotonoticia_20211003143235_1200.jpg"/>
