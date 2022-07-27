import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaPercent, FaTheaterMasks, FaPowerOff, FaColumns } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function SidebarDespegable({ show, setShow }) {
  const domeNode = useRef();
  const { logout, isLoggedIn } = useAuth();

  const handleLogout = () => {
    setShow(false);
    logout();
  };

  return (
    <>
      <div className={`sidebar ${show ? 'active' : ''}`} ref={domeNode}>
        <Link to="/user" className="sidebar__link">
          <FaColumns />
          <span>User Page</span>
        </Link>
        <Link className="sidebar__link" to="/profile">
          <FaUser />
          <span>Profile</span>
        </Link>
        {/* Mostrar los eventos gratis si no estas logeado */}
        <Link className="sidebar__link" to="/events">
          <FaTheaterMasks />
          <span>Eventos</span>
        </Link>

        <Link className="sidebar__link" to="/promotions">
          <FaPercent />
          <span>Promociones</span>
        </Link>
        {/* si estas logeado que aparezca el logout */}

        {isLoggedIn && (
          <Link onClick={handleLogout} to="/login" className="sidebar__link logout">
            <FaPowerOff />
            <span>Logout</span>
          </Link>
        )}

        {/* link que abrace a un emoticotono narajna  y a las letras */}
      </div>
    </>
  );
}

export default SidebarDespegable;
