import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventsService from '../../services/events.service';
import Card from './Card';

export default function MainPage() {
  return (
    <div className="container h-100  ">
      <div className="mainPageTitle">
        <h1>Panel de Usuario</h1>
        <h4>Gestiona tus eventos y promociones</h4>
      </div>
      <div className="cardsContainer mainPage">
        <div className=" row">
          <div className="card__wrapper col-lg-4 col-md-6">
            <div className="card__box">
              <Card
                path={'/events'}
                src={'https://s1.eestatic.com/2022/04/01/alicante/economia/turismo/661694541_223190313_1024x576.jpg'}
                alt={'eventos'}
                title={'Eventos'}
                subtitle={'Consulta tus eventos y los eventos disponibles'}
              />
              {/* Al hacer click aqui te irias a una página donde estaria todos los eventos que hay disponibles. */}
            </div>
          </div>
          <div className="card__wrapper col-lg-4 col-md-6">
            <div className="card__box">
              <Card
                path={'/promotions'}
                src={'https://d2f0ora2gkri0g.cloudfront.net/9d/d5/9dd59804-f004-491c-911e-cc7e1dc3f2a4.png'}
                alt={'descuento'}
                title={'Promociones'}
                subtitle={'Promociones de tus eventos'}
              />
              {/* Al hacer click aqui te irias a una página donde estaria todos las PRMOCIONES que hay disponibles. */}
            </div>
          </div>
          <div className="card__wrapper col-lg-4 col-md-12">
            <div className="card__box">
              <>
                <Card
                  path={'/commerces'}
                  src={'https://img.freepik.com/vector-premium/icono-tienda_24911-1362.jpg'}
                  alt={'newspaper'}
                  title={'Comercios'}
                  subtitle={' Comercio Participantes'}
                />
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
