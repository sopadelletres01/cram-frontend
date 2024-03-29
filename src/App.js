import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
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
import { useAuth } from './components/context/AuthContext';
import FormInscription from './components/inscriptions/FormInscription';
import HomeLayout from './components/layout/home';
import MockComponent from './components/MockComponent';
import Events from './components/events/Events';
import Promotions from './components/promotions/Promotions';
import UserProfile from './components/user/UserProfile';
import Inscriptions from './components/mainPage/Inscription';
import Modifications from './components/mainPage/Modifications';
import EventosC from './components/mainPage/EventsC';
import ModificacionesE from './components/mainPage/ModificationsEvents';
import Comercios from './components/mainPage/Commerces';
import ModificacionesCo from './components/mainPage/ModificationsCommerce';
import ValidarPromo from './components/mainPage/ValidatePromo';
import Event from './components/events/Event';
import Promo from './components/promotions/Promotion';
import PromotionsC from './components/promotions/CreatePromotion';
import Commerces from './components/commerces/Commerces';
import PrivateRoute from './components/routes/PrivateRoute';
import AnonRoute from './components/routes/AnonRoute';
import ShowEvent from './components/events/ShowEvent';
import CommercesShow from './components/commerces/CommercesShow';

//el token del mapbox
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

function App() {
  const { isLoggedIn, user } = useAuth();
  return (
    <>
      <HomeLayout>
        <Routes>
          {/* Home Routes */}

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/register"
            element={
              <AnonRoute>
                <Register />
              </AnonRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AnonRoute>
                <Login />
              </AnonRoute>
            }
          />
          <Route
            path="/forgot"
            element={
              <AnonRoute>
                <ForgotPassword />
              </AnonRoute>
            }
          />
          <Route
            path="/forgot/email-verification"
            element={
              <AnonRoute>
                <EmailVerification />
              </AnonRoute>
            }
          />
          <Route
            path="/forgot/email-verification/:email"
            element={
              <AnonRoute>
                <EmailVerification />
              </AnonRoute>
            }
          />
          <Route
            path="/forgot/reset/:id/:token"
            element={
              <AnonRoute>
                <ResetPassword />
              </AnonRoute>
            }
          />

          {/* users */}

          <Route
            path="/events/:id"
            element={
              <PrivateRoute>
                <Event />
              </PrivateRoute>
            }
          />
          <Route
            path="/events"
            element={
              <PrivateRoute>
                <Events />
              </PrivateRoute>
            }
          />
          <Route
            path="/promotions"
            element={
              <PrivateRoute>
                <Promotions />
              </PrivateRoute>
            }
          />
          <Route
            path="/promotions/:id"
            element={
              <PrivateRoute>
                <Promo />
              </PrivateRoute>
            }
          />
          <Route
            path="/events/:id"
            element={
              <PrivateRoute>
                <ShowEvent />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/commerces"
            element={
              <PrivateRoute>
                <Commerces />
              </PrivateRoute>
            }
          />
           <Route
            path="/commerces/:id"
            element={
              <PrivateRoute>
                <CommercesShow />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/inscriptions"
            element={
              <PrivateRoute>
                <FormInscription />
              </PrivateRoute>
            }
          />

          {/* adminitrador */}

          <Route
            path="/admin"
            element={
              <PrivateRoute roleRestricted>
                <MainPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <PrivateRoute roleRestricted>
                <Inscriptions />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users/edit"
            element={
              <PrivateRoute roleRestricted>
                <Modifications tabla={'users'} />
              </PrivateRoute>
            }
          />
          

          {/* <Route path="/inscriptions" element={<Inscriptions />} /> */}
          {/* <Route path="/inscriptions/modificaciones" element={<Modificaciones tabla={'users'} />} /> */}
          <Route path="/events/create" element={<EventosC />} />
          <Route path="/events/modificaciones" element={<ModificacionesE />} />
          <Route path="/commerce" element={<Comercios />} />
          <Route path="/commerce/modificaciones" element={<ModificacionesCo />} />
          <Route path="/commerce/validar" element={<ValidarPromo />} />

          {/* comercial */}

          <Route path="/commerce/Promotions" element={<Promotions />} />
          <Route path="/promotions/create" element={<PromotionsC />} />
          <Route path="/commerce/modificaciones" element={<ModificacionesCo />} />
          <Route path="/commerce/validar" element={<ValidarPromo />} />
          <Route path="/commerce/events" element={<Events />} />
          <Route path="/commerce/events/:id" element={<Event />} />

          {/* Not Found */}

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </HomeLayout>
    </>
  );
}

export default App;
