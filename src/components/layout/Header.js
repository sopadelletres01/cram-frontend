import React from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header({ className, showSidebar, ...rest }) {
  return (
    <header className={className ? className : ""}>
      <div className="logoWrapper">
        <Link to="/login">Iniciar Sesion</Link>
      </div>
      <div className="headerButtonsWrapper">
        <Link to="/about">Sobre Nosotros</Link>
        <Link to="/register">Sign Up</Link>
        <Link to="/login">Login</Link>
        <button id="showSidebarBtn" onClick={showSidebar}>
          <FaBars />
        </button>
      </div>

      {rest.children}
    </header>
  );
}
