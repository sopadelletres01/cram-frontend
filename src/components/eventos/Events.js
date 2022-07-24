import React, { useState,useEffect, useCallback, useContext } from 'react'
import { Button, ButtonGroup, ButtonToolbar, Collapse } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import EventosService from '../../services/eventos.service';
import { AuthContext } from '../context/AuthContext';
import Filters from './Filters';
import Evento from './TarjetaEvento';

//En esta pagina se mostraran todos los eventos de la aplicacion, por orden alfabetico o proximidad,
//por defecto, la lista mostrará primero los eventos a los que estas inscrito y los diferenciará de los otros
//con una etiqueta verde de "inscrito" 
//Además, se podrá filtrar por inscritos o no inscritos, para que la busqueda sea mas sencilla

export default function Events({className, ...rest}) {
  const {user, loading, setLoading} = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([])
  const [userEventos, setUserEventos] = useState([])
  const [selected,setSelected] = useState(0)
  const navigate = useNavigate()


  const handleShowEvent = (id) => {
    navigate(`/user/eventos/${id}`)
  }


  const renderEventos = () => {
    //Renderizamos los eventos dependiendo del filtro de tipo: "inscrito" | "no inscrito" | "todos"
    //Este filtro se encuentra en el componente Filters y le pasamos el resultado a este componente
    console.log("userEventos",userEventos)
    console.log("filteredEventos",filteredEventos)
    switch (selected) {
      case 1:
        //Inscritos
        return userEventos.map((evento)=>{ 
          return<Evento onClick={()=>handleShowEvent(evento.id)} inscrito={true} key={evento.id} nombre={evento.nombre} edicion={evento.edicion} descripcion={evento.descripcion}inicio={evento.fecha_inicio} final={evento.fecha_finalizacion} lugar={evento.lugar} src={evento.src}/>
        })
      case 2:
        //No inscritos
        return filteredEventos
          .filter(evento=>{
            return !userEventos.find(e => e.id_evento === evento.id)
          })
          .map((evento)=>{ 
            return<Evento onClick={()=>handleShowEvent(evento.id)} inscrito={false} key={evento.id} nombre={evento.nombre} edicion={evento.edicion} descripcion={evento.descripcion}inicio={evento.fecha_inicio} final={evento.fecha_finalizacion} lugar={evento.lugar} src={evento.src}/>
          })
      case 3:
        return filteredEventos.map((evento)=>{ 
          if ( userEventos.find(ev=>ev.id_evento === evento.id) ){
            return<Evento onClick={()=>handleShowEvent(evento.id)} inscrito={true} key={evento.id} nombre={evento.nombre} edicion={evento.edicion} descripcion={evento.descripcion}inicio={evento.fecha_inicio} final={evento.fecha_finalizacion} lugar={evento.lugar} src={evento.src}/>
          }
          return<Evento onClick={()=>handleShowEvent(evento.id)} key={evento.id} nombre={evento.nombre} edicion={evento.edicion} descripcion={evento.descripcion}inicio={evento.fecha_inicio} final={evento.fecha_finalizacion} lugar={evento.lugar} src={evento.src}/>
        })
      default:
        return filteredEventos.map((evento)=>{ 
          if ( userEventos.find(ev=>ev.id_evento === evento.id) ){
            return<Evento onClick={()=>handleShowEvent(evento.id)} inscrito={true} key={evento.id} nombre={evento.nombre} edicion={evento.edicion} descripcion={evento.descripcion}inicio={evento.fecha_inicio} final={evento.fecha_finalizacion} lugar={evento.lugar} src={evento.src}/>
          }
          return<Evento onClick={()=>handleShowEvent(evento.id)} key={evento.id} nombre={evento.nombre} edicion={evento.edicion} descripcion={evento.descripcion}inicio={evento.fecha_inicio} final={evento.fecha_finalizacion} lugar={evento.lugar} src={evento.src}/>
        })
    }
  }

  useEffect(() => {
    if(eventos.length > 0) return
    async function getEventos (){
      try{
        //Loading del modal a true
        setLoading(true)
        const eventos= await EventosService.index("eventos");
        const userEventos= await EventosService.getEventosByUser(user.id);
        console.log(eventos.data)
        setUserEventos(userEventos.data)
        setEventos(eventos.data)
        setFilteredEventos(eventos.data)
      }catch(err){
        console.log(err)
      }
      finally{
        //Pase lo que pase loading del modal a false
        setLoading(false)
      }
    }
    getEventos();
    return () => getEventos();
  },[])

  return (
    <div>
      <Filters selected={selected} setSelected={setSelected} setEventos={setFilteredEventos} filteredEventos={filteredEventos} eventos={eventos} open={open} setOpen={setOpen}/>
      <div className='eventos__topbar'>
        <div className='eventos'>
          { 
            filteredEventos.length > 0 
            ?
              <>
                <h1>Eventos Disponibles</h1>
                {renderEventos()}
              </>
            :
            <h1>No hemos encontrado ningun resultado</h1>
          }
          
        </div>
      </div>
    </div>
  )
}
