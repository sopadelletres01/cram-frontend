import { Link } from "react-router-dom";

export function Card({ element }) {
  
    return (
      <Link to={`/events/${element.id}`} className="card">
      <div className="card__content">
        <img src={element.photo} alt={`${element.name}`} />
        <span className="card__title">{element.name}</span>
        <div className="card__info">
          <p>
            <span className="date">Fecha inicio: </span>
            {element.start_date}
          </p>
          <p>
            <span className="date">Fecha finalizacion: </span>
            {element.final_date}
          </p>
          <p>{element.description}</p>
        </div>
      </div>
      <div className="card__subcription">
        <div className="categoria">Grauito</div>
          <Link to={`/events/${element.id}`} className="button">Inscríbete</Link>
      </div>
    </Link>
      
    )
  }