import React, { useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../commons/multimedia/CRAM.png';
import { useAuth } from '../context/AuthContext';

export default function Header({ className, showSidebar }) {
  const { user } = useAuth();
  const headerRef = useRef();
  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        headerRef.current.style.top = '0';
      } else {
        headerRef.current.style.top = '-90px';
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);

  return (
    <header ref={headerRef} className={className ? className : ''}>
      <Link to="/" className="logo">
        <img className="rounded-circle" src={logo} />
      </Link>
      {/* <div className="logo">
            <img className="rounded-circle" src={logo}></img>
      </div> */}
      <div className="headerButtonsWrapper">
        {user?.isAdmin && <Link to="/admin/users">Gestionar Usuarios</Link>}
        <Link to="/about">Sobre Nosotros</Link>
        <Link to="/register">Sign Up</Link>
        <Link to="/login">Login</Link>
        <button id="showSidebarBtn" onClick={showSidebar}>
          <FaBars />
        </button>
      </div>
    </header>
  );
}
