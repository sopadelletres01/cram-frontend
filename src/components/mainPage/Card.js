import React from 'react'
import {Card as BSCard} from 'react-bootstrap'
import { useNavigate } from 'react-router'

export default function Card({src,alt, title, subtitle, path }) {

    /* haremos un map y mostraremos las fotos de forma random */
  let navigate = useNavigate()

  const handleNavigate = () => {
    navigate(path)
  }

  return (

    <BSCard className="card_prueba" onClick={handleNavigate}>
        <BSCard.Img className='card__image' variant="top" width="100%" height="225px" src={src} alt={alt}/>
        <BSCard.Body>
            <BSCard.Title>{title}</BSCard.Title>
            <BSCard.Text>
            {subtitle}
            </BSCard.Text>
        </BSCard.Body> 
    </BSCard>
  )
}