import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "../Carousel";
import Carrousel from "./Carrousel";
import Intro from "./Intro";
import {FaChevronDown} from "react-icons/fa";
//import '../css/estilosGrid.scss'

export default function Home() {
  return (
    <div className="home">
      {/* <Link to="/login">Iniciar Sesion</Link> */}
      <div className="intro">
        <Intro/>
        <span className="arrowDown"><FaChevronDown/></span>
      </div>
      <Carousel title="Próximos eventos" show={4} infiniteLoop withIndicator >
        <h2 data-testid="carousel-item-1">
          <img src="https://via.placeholder.com/300x200"></img>
        </h2>
        <h2 data-testid="carousel-item-2">Item 2</h2>
        <h2 data-testid="carousel-item-3">Item 3</h2>
        <h2 data-testid="carousel-item-1">Item 1</h2>
        <h2 data-testid="carousel-item-2">Item 2</h2>
        <h2 data-testid="carousel-item-3">Item 3</h2>
        <h2 data-testid="carousel-item-1">Item 1</h2>
        <h2 data-testid="carousel-item-2">Item 2</h2>
        <h2 data-testid="carousel-item-3">Item 3</h2>
        <h2 data-testid="carousel-item-1">Item 1</h2>
        <h2 data-testid="carousel-item-2">Item 2</h2>
        <h2 data-testid="carousel-item-3">Item 3</h2>
        <h2 data-testid="carousel-item-1">Item 1</h2>
        <h2 data-testid="carousel-item-2">Item 2</h2>
        <h2 data-testid="carousel-item-3">Item 3</h2>
      </Carousel>
    </div>
  );
}
//<img src="https://img.europapress.es/fotoweb/fotonoticia_20211003143235_1200.jpg"/>
