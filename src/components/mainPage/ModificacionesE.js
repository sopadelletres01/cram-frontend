import React,{useState, useEffect,useContext} from 'react'
import {Form , Button, Image,Col,Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import ApiCrudService from '../../servicios/crud.service'
import EventosService from '../../servicios/eventos.service'
import MenusAuxiliar from './MenusAuxiliar'
import axios from 'axios'



export default function Eventos() {

    const { user, loading, setLoading } = useContext(AuthContext)
    
    const [formState,setFormState]=useState('buscar');
    const [listEventos, setListEvento]=useState([]);
    const [evento, setEvento]=useState([]);
    const [buscar, setBuscar]=useState(false);
    //////////////////////////////////-----CARGAREMOS LOS EVENTOS------///////////////////
    
    useEffect(() => {

        //conseguimos los eventos que estan disponibles
        const handleListEvent=async() => {
            let res= await EventosService.getEventosCurrent();
            setListEvento(res.data)
        }
        handleListEvent();

    },[evento])

    ///////------------BUSCAMOS EL EVENTO --------- //////////////////
    const handleSubmit= async(e)=>{
        console.log('cuando entra',buscar)
        e.preventDefault();
        let id=evento.id
        setLoading(true);
        
        try{
            if(formState==='editar'){
                let res = await ApiCrudService.update('eventos',id, evento)
                
                if(res.status===200){
                    setEvento(res.data)
                    console.log("EVENTOOOOOOOOOOOO",evento)
                    setFormState('opciones');

                }
                return
            }
            setFormState('opciones')
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false);
            setBuscar(false);
            console.log("cuando acaba", buscar)
        }
    }

    ////////////////////-----Botones--------------////////////////////////////////
    const renderButtons = ()=>{
        switch (formState) {
            case "buscar":
                return <Button  variant="primary" type="submit">
                            Buscar
                        </Button>
            case "opciones":
                return <>
                        <Button variant="primary" type="submit">
                            Buscar
                        </Button>
                        <Button onClick={(e)=>setFormState('editar')} variant="warning" type="button">
                            Editar
                        </Button>
                        <Button onClick={(e)=>setFormState('eliminar')} variant="danger" type="button">
                            Eliminar
                        </Button>
                    </>
            case "editar":
                return <>
                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                        <Button onClick={(e)=>setFormState('opciones')} variant="secondary" type="button">
                            Cancelar
                        </Button>
                    </>
            case "eliminar":
                let respuesta=window.confirm('Esta seguro de que quieres eliminar a este evento? ')
                console.log(respuesta)
                if (!respuesta) {
                    setFormState("opciones")
                    return
                }
                //handleDelete()
                
            default:
                setFormState("opciones")
                break;
        }
    }   
    const handleBlur=async(e)=>{
        console.log(e)
        e.preventDefault();
        /* setLoading(true); */
        try {
            let res = await ApiCrudService.show('eventos',e.target.value); 
            console.log(res.data)         
            setEvento(res.data)
        }catch(error){
            console.log(error)
        }

    }
    
    
    

    return(
        <>
            <MenusAuxiliar >
				<Link className='btn btn-warning' to={'/eventos/create'} title={"Modicar usuario"} >Dar de alta Evento</Link>
		    </MenusAuxiliar>
            <div className="container__dos-modificaciones">
                <Form onSubmit={handleSubmit}>
                    {/* <Image width="30px" height="30px"src={evento.src}/> */}
                    <h3>Busca un evento por su Identificador ID </h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Introduce el Id</Form.Label>
                        <Form.Control value={evento.id || ""} onBlur={handleBlur} onChange={(e)=>setEvento({...evento,id:e.target.value})}/>
                        <Form.Label>Nombre del Evento</Form.Label>
                        <Form.Control value={evento.nombre || ""} onChange={(e)=>setEvento({...evento, nombre:e.target.value})}readOnly={formState!=='editar'}/>
                        <Form.Label> Edicion</Form.Label>
                        <Form.Control value={evento.edicion || ""} onChange={(e)=>setEvento({...evento,edicion:e.target.value})}readOnly={formState!=='editar'}/>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control value={evento.descripcion || ""} onChange={(e)=>setEvento({...evento,descripcion:e.target.value})}readOnly={formState!=='editar'}/>
                        <Form.Label>Lugar</Form.Label>
                        <Form.Control value={evento.lugar || ""} onChange={(e)=>setEvento({...evento,lugar:e.target.value})}readOnly={formState!=='editar'}/>
                        <Form.Label>Fecha de inicio</Form.Label>
                        <Form.Control value={evento.fecha_inicio || ""} onChange={(e)=>setEvento({...evento,fecha_inicio:e.target.value})} readOnly={formState!=='editar'}/>
                        <Form.Label>fecha de finalizacion</Form.Label>
                        <Form.Control value={evento.fecha_finalizacion || ""} onChange={(e)=>setEvento({...evento,fecha_finalizacion:e.target.value})}readOnly={formState!=='editar'}/>
                    </Form.Group>
                    { 
                        renderButtons()

                    }
                </Form>
            </div>
        { !buscar ?
           <Table>
           <thead>
                <tr>
                    <th>nº</th>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Edicion</th>
                    <th>Fecha</th>
                    <th>Lugar</th>
                </tr>
                </thead>
                <tbody>
                    { listEventos.map((evento,e)=>{
                        return (
                         <tr key={evento.id}>
                            <td>{e+1}</td>
                            <td>{evento.id}</td>
                            <td>{evento.nombre}</td>
                            <td>{evento.edicion}</td>
                            <td>{evento.fecha_inicio}</td>
                            <td>{evento.lugar}</td>
                         </tr>
                         )
                        
                    })
                    }
                    
                </tbody>
           </Table>
           : null
           }
          
        </>
    )

  
}
