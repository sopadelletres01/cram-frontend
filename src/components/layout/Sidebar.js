import React, { useContext, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaMapMarkedAlt, FaMailBulk } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthService from '../../services/auth.service';
//import '../../css/estilosGrid.scss'
import { AuthContext, useAuth } from '../context/AuthContext';

export default function Sidebar({ accio }) {
  const { user, logout } = useAuth();
  console.log('USER', user);
  const logoutSession = async () => {
    try {
      let res = await AuthService.signout();
      console.log('SIGNOUT', res);
      logout();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <aside>
      <div className="avatar">
        <img src={user.avatar_src || 'https://oneill.law.georgetown.edu/wp-content/uploads/2021/06/generic-profile.png'}></img>
      </div>
      {user.nombre && <h3 className="usuario__nombre">{user.nombre}</h3>}
      <ul>
        <li>
          <Link to="/user">User page</Link>
        </li>
        <li>
          <Link to="/login" onClick={logoutSession}>
            Logout
          </Link>
        </li>
        <li>
          <Link to="/user/profile">Profile</Link>
        </li>
      </ul>
    </aside>
  );
}
