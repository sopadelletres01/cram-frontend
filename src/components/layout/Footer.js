import React from 'react';
import { FaFacebook, FaInstagram, FaMapMarkedAlt, FaMailBulk } from 'react-icons/fa';

export default function Footer({ accio }) {
  return (
    <footer>
      <div className="contact">
        <p>Contacta con nosotros</p>
      </div>
      <div className="icons__rows">
        <a href="www.faceboock.com">
          <FaFacebook size="60px" color="white" title="icono de facebook"></FaFacebook>
        </a>
        <a>
          <FaInstagram size="60px" color="white" title="icono de instagram"></FaInstagram>
        </a>
        <a onClick={() => accio()}>
          <FaMapMarkedAlt size="60px" color="white" title="icono de situacion"></FaMapMarkedAlt>
        </a>
        <a href="www.instagram.com">
          <FaMailBulk size="60px" color="white" title="icono de email"></FaMailBulk>
        </a>
      </div>
    </footer>
  );
}
