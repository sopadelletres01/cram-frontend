import React from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header({ className, showSidebar, ...rest }) {
  return (
    <header className={className ? className : ""}>
      <Link to="/login">Iniciar Sesion</Link>

      <button id="showSidebarBtn" onClick={showSidebar}>
        <FaBars />
      </button>

      {rest.children}
    </header>
  );
}
