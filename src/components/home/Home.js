import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "../Carousel";
import Carrousel from "./Carrousel";
import Intro from "./Intro";
import { FaChevronDown } from "react-icons/fa";
//import '../css/estilosGrid.scss'

//import '../css/estilosGrid.scss'
// FALT EL LOADING ❌❌
export default function Home() {
  const data = [
    <h2 data-testid="carousel-item-1">
      <img src="https://via.placeholder.com/300x200"></img>
    </h2>,
    <h2 data-testid="carousel-item-2">Item 2</h2>,
    <h2 data-testid="carousel-item-3">Item 3</h2>,
    <h2 data-testid="carousel-item-1">Item 1</h2>,
    <h2 data-testid="carousel-item-2">Item 2</h2>,
    <h2 data-testid="carousel-item-3">Item 3</h2>,
    <h2 data-testid="carousel-item-1">Item 1</h2>,
    <h2 data-testid="carousel-item-2">Item 2</h2>,
    <h2 data-testid="carousel-item-3">Item 3</h2>,
    <h2 data-testid="carousel-item-1">Item 1</h2>,
    <h2 data-testid="carousel-item-2">Item 2</h2>,
    <h2 data-testid="carousel-item-3">Item 3</h2>,
    <h2 data-testid="carousel-item-1">Item 1</h2>,
    <h2 data-testid="carousel-item-2">Item 2</h2>,
    <h2 data-testid="carousel-item-3">Item 3</h2>,
  ];
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
        <div className="carouselsWrapper">
          <Carousel
            title="Próximos eventos"
            show={4}
            infiniteLoop
            withIndicator
          >
            {data}
          </Carousel>
          <Carousel
            title="Próximos eventos"
            show={4}
            infiniteLoop
            withIndicator
          >
            {data}
          </Carousel>
          <Carousel
            title="Próximos eventos"
            show={4}
            infiniteLoop
            withIndicator
          >
            {data}
          </Carousel>
        </div>
      </article>
    </div>
  );
}
//<img src="https://img.europapress.es/fotoweb/fotonoticia_20211003143235_1200.jpg"/>
