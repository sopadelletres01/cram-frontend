import { useEffect, useState } from "react";
import { Button, Card ,Badges, Badge, Form} from "react-bootstrap";
import EventosService from "../../servicios/eventos.service";
import PromocionesService from "../../servicios/promociones.service";

export default function PromocionEdit({ eventos, id, caducado, titulo, comercio, evento, descripcion, inicio, src, final}){
    
    const [form,setForm] = useState()


    useEffect(()=>{
        setForm({
            descripcion,
            titulo,
            evento_id:evento,
            src,
            fecha_finalizacion:final,
            fecha_inicio:inicio,
        })
    },[])


    const handleEdit = async (e) => {
        console.log("FORM",form)
        e.preventDefault()
        try{
            let res = await PromocionesService.update("promociones",id,form)
            if(res.status===200){
                let promo = await PromocionesService.show("promociones",id)
                console.log("PROMOOO",promo)
                setForm(promo.data)
            }
            console.log("resssss",res)
        }catch(e){
            console.log(e)
        }

    }

    const handleDelete = async (e) => {
        e.preventDefault()
        try{
            let res = await PromocionesService.delete("promociones",id)
            console.log("resssss",res)
        }catch(e){
            console.log(e)
        }
    }


    return(
        <Card >
            <Card.Body>
                <div className='card__evento'>
                    <Card.Img style={{flex:"1",maxWidth:"700px"}} variant="top" src={src} />
                    <Form className='card__body'>
                        {/* Poner el nombre del comercio */}
                        <div style={{display:"flex",gap:"8px",alignItems:"center",justifyContent:"center"}}>
                        <Card.Text style={{display:"flex",gap:"8px",flexFlow:"column wrap"}}>
                            {
                                caducado
                                ? 
                                <Badge bg="danger">
                                        Expirada
                                    </Badge> 
                                :
                                <Badge bg="success">
                                        Vigente
                                    </Badge>
                            }
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Titulo</Form.Label>
                                <Form.Control 
                                name='titulo'
                                value={form?.titulo}
                                size='sm' 
                                type="text" 
                                onChange={(e)=>setForm({...form, titulo:e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Fecha Inicio</Form.Label>
                                <p>Actual: {inicio}</p>
                                <Form.Control 
                                name='fecha_inicio'
                                value={form?.fecha_inicio}
                                size='sm' 
                                type="date" 
                                onChange={(e)=>setForm({...form, fecha_inicio:e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Fecha Finalizacion</Form.Label>
                                <p>Actual: {final}</p>
                                <Form.Control 
                                name='fecha_finalizacion'
                                value={form?.fecha_finalizacion}
                                size='sm' 
                                type="date" 
                                onChange={(e)=>setForm({...form, fecha_finalizacion:e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Descripcion</Form.Label>
                                <Form.Control 
                                name='descipcion'
                                value={form?.descripcion}
                                size='sm' 
                                type="text" 
                                onChange={(e)=>setForm({...form, descripcion:e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Evento</Form.Label>
                                <p>Actual: {form?.evento_id}</p>
                                <Form.Select
                                value={form?.evento_id}
                                name='evento' 
                                aria-label='Escoge un evento' 
                                onChange={(e)=>setForm({...form, evento_id:e.target.value})}
                                >
                                    <option hidden selected>Selecciona un evento</option>
                                    {
                                        eventos.map((ev)=>{
                                            return(
                                                <option key={ev.id} value={ev.id}>{ev.nombre}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                        </Form.Group>
                            <div style={{display:"flex",gap:"8px", justifyContent:"flex-end"}}>
                                <Button onClick={handleEdit} variant="warning">Editar Promocion</Button>
                                <Button onClick={handleDelete} variant="danger">Eliminar Promocion</Button>
                            </div>
                        </Card.Text>
                        </div>

                    </Form>
                </div>
               
            </Card.Body>
        </Card>
    )
}