import React, { useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header({ className, showSidebar, ...rest }) {
  const headerRef = useRef()
  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        headerRef.current.style.top = "0";
      } else {
        headerRef.current.style.top = "-90px";
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);

  return (
    <header ref={headerRef} className={className ? className : ""}>
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
