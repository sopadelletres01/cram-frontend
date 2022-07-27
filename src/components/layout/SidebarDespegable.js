import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaPercent, FaTheaterMasks, FaPowerOff, FaColumns, FaDoorOpen } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function SidebarDespegable({ show, setShow }) {
  const domeNode = useRef();
  const { logout, isLoggedIn, user } = useAuth();
  console.log('USER', user);
  const handleLogout = () => {
    setShow(false);
    logout();
  };

  return (
    <>
      <div className={`sidebar ${show ? 'active' : ''}`} ref={domeNode}>
        {isLoggedIn ? (
          <>
          <div className="userLogged">
            <div className="userLeft">
              <img src={user.photo}/>
            </div>
            <div className="userRight">
              <span>Logged In as <b>{user.name}</b></span>
              <Link onClick={handleLogout} to="/login" className="sidebar__link logout">
                <FaPowerOff />
                <span>Logout</span>
              </Link>
            </div>
          </div>
            <hr/>
          </>
        ):
        <Link onClick={() => setShow(false)} to="/login" className="sidebar__link">
          <FaDoorOpen />
          <span>Login</span>
        </Link>
        }
        <Link onClick={() => setShow(false)} to="/user" className="sidebar__link">
          <FaColumns />
          <span>User Page</span>
        </Link>
        <Link onClick={() => setShow(false)} className="sidebar__link" to="/profile">
          <FaUser />
          <span>Profile</span>
        </Link>
        {/* Mostrar los eventos gratis si no estas logeado */}
        <Link onClick={() => setShow(false)} className="sidebar__link" to="/events">
          <FaTheaterMasks />
          <span>Eventos</span>
        </Link>

        <Link onClick={() => setShow(false)} className="sidebar__link" to="/promotions">
          <FaPercent />
          <span>Promociones</span>
        </Link>
        {/* si estas logeado que aparezca el logout */}

        {/* link que abrace a un emoticotono narajna  y a las letras */}
      </div>
    </>
  );
}

export default SidebarDespegable;
