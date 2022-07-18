import { Button, Card ,Badges, Badge} from "react-bootstrap";

export default function Evento({onClick,inscrito,nombre,edicion,descripcion,inicio,final,lugar,src}){
    
    return(
        <Card onClick={onClick}>
            
            <Card.Body>
                <div className='card__evento'>
                    <Card.Img className='imagen__card' variant="top" src={src} />
                    <div className='card__body'>
                        <Card.Title>{nombre}-{edicion}</Card.Title>
                        {
                            inscrito 
                            ? 
                            <Badge bg="success">
                                    INSCRITO
                                </Badge> 
                            :
                            <Badge bg="danger">
                                    NO INSCRITO
                                </Badge>
                        }
                        <Card.Text style={{display:"flex",gap:"8px",flexFlow:"column wrap"}}>
                        <li> {descripcion}</li>
                        <li>El evento se realizará en : <span className='card__styleInfo'>{lugar}</span></li>
                        <li>El evento se realizará el: <span className='card__styleInfo'>{inicio}</span></li>
                        <li> El evento finalizará el: <span className='card__styleInfo'>{final}</span></li>
                        <div style={{display:"flex",gap:"8px", justifyContent:"flex-end"}}>
                            <Button variant="primary">Ver Evento</Button>
                        </div>
                        </Card.Text>

                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}