import { Button, Card, Badges, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function FinalPromotion({ onClick, expired, used, name, commerce, evento, description, start, photo, final }) {
  return (
        <div onClick={onClick} style={{height:"unset"}} className="card__event_card">
          <div className="card__content">
            <img src={photo} alt={`${name}`} />
            <span className="card__title">{name}</span>
            <div className="card__info">
              <p>
                <b>Fecha </b>
                {start}
              </p>
              <p>
                <b>Fecha finalizacion: </b>
                {final}
              </p>
              <p>
                <b>Comercio Asignado: </b>
                {commerce}
              </p>
              <p>
                <b>Evento Asignado: </b>
                {evento}
              </p>
              <p>{description}</p>
              <p>
                La promoción estará disponible desde : <b>{start}</b>
              </p>
              <p>
                La promoción expirará: <b>{final}</b>
              </p>
            </div>
            <div className="m-0 categoria">Estado:</div>
          </div>
          <div className="card__subcription">
            {expired ? <Badge bg="danger">Usada</Badge> : <Badge bg="success">Canjeable</Badge>}
            {expired ? <Badge bg="danger">Expirada</Badge> : <Badge bg="success">Vigente</Badge>}
            {/* <div to={`/events/${id}`} className="button">Inscríbete</div> */}
          </div>
        </div>
  );
}
