import React, { CSSProperties, useState, useEffect, useContext,useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import mapboxgl from 'mapbox-gl';
import Papa from 'papaparse';
import { Form, Button } from 'react-bootstrap'
import ApiCrudService from '../../services/crud.service'
import EventosService from '../../services/eventos.service'
import ComerciosService from '../../services/comercios.service';
import MenusAuxiliar from './MenusAuxiliar'
import { Link } from 'react-router-dom';


export default function ModificacionesCo() {
    const [listEventos, setListEventos]= useState([]);
    const [listCategorias, setListCategorias]=useState([]);
    const [comercio, setComercio]=useState([]);
    const [formComer, setFormComer]=useState([]);

//esto se va a renderizar una vez cuando se monte el componente
    useEffect(() =>{
        async function getData (){
            let eventos = await EventosService.getEventosCurrent();
            setListEventos(eventos.data);
            let categos= await ApiCrudService.index('categorias');
            setListCategorias(categos.data)
        }
        getData()
        console.log('Lista de los eventitos',listEventos)
        console.log('Lista de los eventitos',listCategorias)

    },[])

    const handleBlur=async(e)=>{
        console.log(e)
        e.preventDefault();
        /* setLoading(true); */

        try {
            let res =await ComerciosService.serachComercio(e.target.value); 
            console.log(res.data)         
            setComercio(res.data)
        }catch(error){
            console.log(error)
        }

    }
    const renderButtons = ()=>{
        switch (formComer) {
            case "buscar":
                return <Button  variant="primary" type="submit">
                            Buscar
                        </Button>
            case "opciones":
                return <>
                        <Button variant="primary" type="submit">
                            Buscar
                        </Button>
                        <Button onClick={(e)=>setFormComer('editar')} variant="warning" type="button">
                            Editar
                        </Button>
                        <Button onClick={(e)=>setFormComer('eliminar')} variant="danger" type="button">
                            Eliminar
                        </Button>
                    </>
            case "editar":
                return <>
                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                        <Button onClick={(e)=>setFormComer('opciones')} variant="secondary" type="button">
                            Cancelar
                        </Button>
                    </>
            case "eliminar":
                let respuesta=window.confirm('Esta seguro de que quieres eliminar a este usuario? ')
                console.log(respuesta)
                if (!respuesta) {
                    setFormComer("opciones")
                    return
                }
    /*             handleDelete() */
                
            default:
                setFormComer("opciones")
                break;
        }
    }  
    const handleSubmit=async(e)=>{
        e.preventDefault();
        let updateComer= await ApiCrudService.update('comercios', )

    }  

  return (
        <>
    		<MenusAuxiliar >
				<Link className='btn btn-warning' to={'/comercio'} title={"busvar comercio"} > Buscar Comercio</Link>
                <Link className='btn btn-warning' to={'/comercio'} title={"Dar de alta comercio"} >Alta Comercio</Link>
			</MenusAuxiliar>
			    <div className="container__cruds">    
                    <Form id='form' onSubmit={handleSubmit}>
                        <Button >Añadir localizacion</Button>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <h3>Busca el comercio por el numero de NIF</h3>
                            <Form.Label>Nif</Form.Label>
                            <Form.Control onBlur={handleBlur} name='nif' minLength='9' maxLength='9' type='text' required/>
                            <Form.Label>Nombre</Form.Label >
                            <Form.Control name='nombre' type='text' readOnly/>
                            <Form.Label>Poblacón</Form.Label>
                            <Form.Control name='poblacion' type='text' readOnly/>
                            <Form.Label>Emial</Form.Label>
                            <Form.Control name='email' type='email' readOnly />
                            <Form.Label >Latitud</Form.Label>
                            <Form.Control name='latitud' readOnly/>
                            <Form.Label >Longitud</Form.Label>
                            <Form.Control name='longitud' readOnly/>
                            {/* hacer un select */}
                            <Form.Label >Escoge una categoria</Form.Label>
                            <Form.Select name='categoria_id' aria-label='Escoge una categoria' onChange={(e)=>setComercio({...comercio, categoria_id:(e.target.value)})} readOnly>
                                {
                                    <>
                                        <option selected hidden>Seleccion una categoria</option>
                                        {
                                            listCategorias.map((categoria)=>{
                                                return <option value={categoria.id}>{categoria.categoria}</option>
                                            })
                                        }
                                    </>
                                }
                            </Form.Select>
                           
                            <Form.Label >Selecciona una foto para este evento</Form.Label>
                            <Form.Control name="image" required type='file' placeholder='Sube una foro para tu evento' onChange={(e)=>{setComercio({...comercio,file:e.target.files[0]})}} />
                        </Form.Group>
                        {
                            renderButtons()
                        }
                    </Form>
                </div>
            </>
  )
}
