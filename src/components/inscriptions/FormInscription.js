import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ApiCrudService from '../../services/crud.service';
import { Button } from 'react-bootstrap';
import { set } from 'animejs';

export default function FormInscription() {
  const location = useLocation();
  const { id } = useParams();
  const { user } = useAuth();
  const [date, setDate]=useState('');

  const event = location.state.event;

  
  const handlSubmit = async (e) => { 

    e.preventDefault();
    const inscription = { user, event,date } 

    if (verifyDate()) { 
      let inscriptionUser = await ApiCrudService.create('inscriptions', inscription) 
      console.log(inscriptionUser)

    }
    // console.log(date)
    // console.log('eventoTaget', e.target.value)
    
    
    
  }

  const verifyDate = () => { 
    if (date >= event.start_date && date <= event.final_date) return true
    return false
  }

  return (
    <diV className="container__form">
      <form onSubmit={handlSubmit} className="form__inscription" action={'/inscriptions'} method={'POST'}>
        <div className="form__inscription_information">
          <div className="event__info_form">
            <span className="form__inscription_title">Inscripción al Evento</span>
            <label>
              <span className="label__inscription ">Nombre del Evento</span>
            </label>
            <span className="label__inscription date_form"> {event.name}</span>
            <label>
              <span className="label__inscription">Fecha Inicio: </span>
              {event.start_date}
            </label>
            <label>
              <span className="label__inscription">Fecha Finalizacion:</span> {event.final_date}
            </label>
            <label className="label__inscription">Selecciona tu fecha para la incripción</label>
            <input name='date' className="label__inscription date_form" type="date" onChange={(e)=>setDate(e.target.value)}  defaultValue={event.final_date } />
            <p className="label__inscription">Descripción del evento</p>
            <p>{event.description}</p>
            <p className="label__inscription">Dirección</p>

            <p className='out_margin'>{event.adress}</p>
            <p className='out_margin'>{event.town}</p>
            <div className="form__inscription_user">
            

                <p className='out_margin form__inscription_title'>Información del usuario que se va incribir:</p>
                <label>Email del usuario</label>
                <input name='email' value={user.mail} placeholder={ user.email } readOnly />
        
              </div>
          </div>
          <img className="photo_inscription" src={event.photo} alt={event.name} />
        </div>
        <div className='button_decoration_inscriptionform'>

        <Button type="submit" className="button form_button">
          Enviar
        </Button>

        </div>
      </form>
    </diV>
  );
}
