import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import './commons/css/estilosGrid.scss';
import './App.css';
import mapboxgl from 'mapbox-gl';
/* import 'mapbox-gl/dist/mapbox-gl.css'; */
import { Login } from './components/auth/Login';
import MainPage from './components/mainPage/MainPage';
import { Register } from './components/auth/Register';
import { Button, Modal } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ForgotPassword from './components/auth/ForgotPassword';
import EmailVerification from './components/auth/EmailVerification';
import ResetPassword from './components/auth/ResetPassword';
import NotFound from './components/NotFound';
import Layout from './components/layout/default';
import Home from './components/home/Home';
import { AuthContext, useAuth } from './components/context/AuthContext';
import HomeLayout from './components/layout/home';
import MockComponent from './components/MockComponent';
import Events from './components/events/Events';
import Promotions from './components/promotions/Promotions';
import UserProfile from './components/user/UserProfile';
import Inscriptions from './components/mainPage/Inscription';
import Modificaciones from './components/mainPage/Modifications';
import EventosC from './components/mainPage/EventsC';
import ModificacionesE from './components/mainPage/ModificationsEvents';
import Comercios from './components/mainPage/Commerces';
import Promo from './components/promotions/Promotion';
import ModificacionesCo from './components/mainPage/ModificationsCommerce';
import ValidarPromo from './components/mainPage/ValidatePromo';
import Event from './components/events/Event';
import Promotion from './components/mainPage/Promotions';
import PromotionsC from './components/promotions/CreatePromotion';
import Noticias from './components/Noticias';

//el token del mapbox
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

function App() {
  const { isLoggedIn, user } = useAuth();
  console.log('ISAUTH', isLoggedIn);
  return (
    <>
      {isLoggedIn ? (
        <HomeLayout>
          <Routes>
            {/* adminitrador */}
            {user.rol === 2 && (
              <>
                <Route path="Inscriptions" element={<Inscriptions />} />
                <Route path="user/Promotions" element={<Promotions />} />
                <Route path="user/events" element={<Events />} />
                <Route path="user/promotions/:id" element={<Promo />} />
                <Route path="Inscriptions/modificaciones" element={<Modificaciones tabla={'users'} />} />
                <Route path="/events/create" element={<EventosC />} />
                <Route path="/events/modificaciones" element={<ModificacionesE />} />
                <Route path="/commerce" element={<Comercios />} />
                <Route path="/commerce/modificaciones" element={<ModificacionesCo />} />
                <Route path="/commerce/validar" element={<ValidarPromo />} />
              </>
            )}
            {/* comercial */}
            {user.rol === 4 && (
              <>
                <Route path="/commerce/Promotions" element={<Promotions />} />
                <Route path="/promotions/create" element={<PromotionsC />} />
                <Route path="/commerce/modificaciones" element={<ModificacionesCo />} />
                <Route path="/commerce/validar" element={<ValidarPromo />} />
                <Route path="user/events" element={<Events />} />
                <Route path="user/events/:id" element={<Event />} />
              </>
            )}
            {/* participantes */}
            {user.rol === 1 && (
              <>
                <Route path="/user/events/:id" element={<Event />} />
                <Route path="/user/events" element={<Events />} />
                <Route path="user/Promotions" element={<Promotions />} />
                <Route path="user/promotions/:id" element={<Promo />} />
              </>
            )}
            <Route path="/" element={<MainPage />} />
            <Route path="/user" element={<MainPage />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/user/profile" element={<UserProfile />} />

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          </HomeLayout>
      ) : (
        <HomeLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/forgot/email-verification" element={<EmailVerification />} />
            <Route path="/forgot/email-verification/:email" element={<EmailVerification />} />
            <Route path="/forgot/reset/:id/:token" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </HomeLayout>
      )}
    </>
  );
}

export default App;
