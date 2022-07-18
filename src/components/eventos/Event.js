import React, {useContext, useEffect, useRef, useState} from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PromocionesService from '../../servicios/promociones.service.js';
import { AuthContext } from '../context/AuthContext';
import {BsDownload} from 'react-icons/bs'
import EventosService from '../../servicios/eventos.service.js';

const Event = () =>{
    //Consultar comercios asignados a un evento
    const {user} = useContext(AuthContext)
    const {id} = useParams()
    const [eventData,setEventData] = useState([])
    const [comercios,setComercios] = useState([])
    const [promociones,setPromociones] = useState([])
    let navigate = useNavigate()

    const redirectPromo = (idPromo) => {
        navigate(`/user/promociones/${idPromo}`)
    }

    const renderPromociones = () => {
        return promociones.map((promo)=>{
            return(
                <div className=' hover-zoom rounded p-2' style={{display:"flex",gap:"16px",alignItems:"center",backgroundColor:"white"}} key={promo.id}>
                    <div style={{display:"flex",flexDirection:"column",gap:"16px",alignItems:"flex-start"}}> 
                        <strong>{promo.titulo}</strong>
                        <small>{promo.descripcion}</small>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:"16px",alignItems:"flex-start"}}>
                        <img style={{width:"50px",height:"50px"}} src={promo.src}></img>
                        {eventData.inscrito && 
                            <Button onClick={()=>redirectPromo(promo.id)}>Go</Button>
                        }
                    </div>
                    
                </div>
            )
        })
    }

    const renderComercios = () => {
        return comercios.map((comer)=>{
            return(
                <div className='rounded p-2' style={{display:"flex",gap:"16px",alignItems:"center",backgroundColor:"#f3a6a6"}} key={comer.id}>
                    <div style={{display:"flex",flexDirection:"column",gap:"16px",alignItems:"flex-start"}}> 
                        <strong>{comer.nombre}</strong>
                        <small>{comer.poblacion}</small>
                    </div>
                    <img style={{width:"50px",height:"50px"}} src={comer.src}></img>
                </div>
            )
        })
    }

    useEffect(()=>{
        (async ()=>{
            try{
                const res = await EventosService.show("eventos",id)
                console.log("res",res)
                if ( res.status === 200 ){
                    setEventData(res.data)
                }
                const userEventos= await EventosService.getEventosByUser(user.id);
                console.log("caducadas",userEventos)
                console.log("resdata",res.data)
                const cositas =  userEventos.data.find(ev=>ev.id_evento === res.data.id)
                console.log("cositas",cositas)
                if ( cositas ){
                    setEventData({...res.data,inscrito:true})
                }
                const comercios= await EventosService.getComercios(id);
                console.log("comercios",comercios)
                if ( comercios.status === 200 ){
                    setComercios(comercios.data)
                }
                const promociones= await EventosService.getPromociones(id);
                console.log("promociones",promociones)
                if ( promociones.status === 200 ){
                    setPromociones(promociones.data)
                }
            }
            catch(e){
                console.log("Error ",e)
            }
        })()
    },[])

    return (
        <Card style={{
            height:"100%",
            background: "rgb(108,172,255)",
background: "linear-gradient(180deg, rgba(108,172,255,1) 17%, rgba(141,235,255,1) 89%)",
        }}>
            <Card.Body>
                <div style={{height:"100%",flexDirection:"column",justifyContent:"space-around",position:"relative"}} className='card__evento'>
                        {/* Poner el nombre del comercio */}
                        <h1>{eventData.nombre}</h1>
                        <Card.Text className="laptop__column" style={{display:"flex",gap:"16px",justifyContent:"space-between"}}>
                            <Card.Img style={{flex:"1",maxHeight:"600px",maxWidth:"600px"}} variant="top" src={eventData.src} />
                            <div style={{display:"flex",flexDirection:"column",gap:"16px",flex:"1"}}>
                                <span><strong>Descripcion:</strong> {eventData.descripcion}</span>
                                <strong>Comercios asignados:</strong> 
                                <div style={{display:"flex",flexWrap:"wrap",gap:"24px"}}> 
                                    {renderComercios()}
                                </div>
                                <strong>Promociones asignadas:</strong> 
                                <div style={{display:"flex",flexWrap:"wrap",gap:"24px"}}> 
                                    {renderPromociones()}
                                </div>
                                <span><strong>El evento se celebra el dia :</strong> <span>{eventData.fecha_inicio}</span></span>
                                <span><strong>El evento acaba el dia: </strong><span>{eventData.fecha_finalizacion}</span></span>
                                <strong>Estado: </strong>
                                {
                                    eventData.inscrito
                                    ?   
                                        <Badge style={{width:"100px"}} bg="success">
                                            Inscrito
                                        </Badge>
                                    :
                                        <Badge style={{width:"100px"}} bg="danger">
                                            No Inscrito
                                        </Badge> 
                                }

                            </div>
                        </Card.Text>
                        <div className="button__row-left" style={{display:"flex", borderRadius: "16px",justifyContent:"space-around",backgroundColor:"rgb(173 211 233)",padding:"16px"}}>
                            <Link className="btn btn-secondary" to="/user/eventos">Volver atrás</Link>
                        </div>

                    </div>
            </Card.Body>
        </Card>
      )
}

export default Event;