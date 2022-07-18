import React, { useState, useEffect, useRef, useContext } from 'react'
import { Col, Form, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import UsuariosService from '../../servicios/usuarios.service'
import { AuthContext } from '../context/AuthContext'

export default function UserProfile(){
    const {user,setUser,logout} = useContext(AuthContext)
    const [selectedFile,setSelectedFile] = useState()
    const [rolName, setRolName] = useState("")
    const [form,setForm] = useState({})
    const navigate = useNavigate()
    useEffect(()=>{
        console.log("Rol",rolName)
    },[rolName])

    useEffect(()=>{
        (async ()=>{
            try{
                let res = await UsuariosService.getRolByUser(user.rol);
                if (res.status === 200){
                    console.log("ress",res)
                    console.log("nombre",res.data.nombre)
                    setRolName(res.data.nombre)
                }
            }
            catch(e){
                if ( e.response.status === 404){
                    console.log("El rol no se encontró")
                }
            }

        })()
    },[])


    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
        console.log(e.target.files)
    }
    const handleFileUpload = async (e) => {
        e.preventDefault()
        if( !selectedFile ) {
            alert("Selecciona una imagen antes...")
            return
        }
        // Create an object of formData 
        const formData = new FormData()
        
        formData.append(
            "image",
            selectedFile,
            selectedFile.name
        )
        // Details of the uploaded file 
        console.log(selectedFile); 
        
        // Request made to the backend api 
        // Send formData object 
        try{
            let res = await UsuariosService.updateAvatar(formData,user.id)
            console.log("res",res)
            if( res.status === 200 ){
                setUser({...user,avatar_src:res.data.avatar_src})
            }
        }
        catch(e){
            console.log(e)
            if (e.response.status === 500){
                console.log("ERROR",e)
            }
        }
    }

    const handleRedirect = (e) => {
        e.preventDefault();
        logout();
        navigate("/forgot");
    }

    const handleUpdateProfile = async (e) => {
        //Hacer fecha nacimiento tipo date
        //Comprobar que los valores no esten vacios
        e.preventDefault();
        console.log("FORM",form)
        try{
            let res = await UsuariosService.update("usuarios",user.id,form)
            if (res.status === 200){
                setUser({...user,...form})
            }
        }
        catch(e){
            if ( e.response.status === 500 ){
                alert("Ha habido un problema al actualizar el usuario")
            }
        }
    }

    return(
        <div className='d-flex justify-content-center align-items-center'>
            <div className={"bg-light rounded p-4 w-100"}>
            <Form >
            <h1>Perfil de Usuario</h1>
                {rolName && 
                    <h5 style={{textTransform:"capitalize"}}>Rol: {rolName}</h5>
                }
                <fieldset className='customLegend'>
                    <legend>Avatar</legend>
                    <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                        <div className='avatar__form'>
                            <Image  src={user.avatar_src || 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png'} roundedCircle></Image>
                        </div>
                        <Form.Group controlId="formFile">
                            <Form.Label>Selecciona un nuevo avatar:</Form.Label>
                            <Form.Control onChange={handleFileChange} type="file" />
                        </Form.Group>
                        <button onClick={handleFileUpload} className='btn mt-2 btn-primary'>Cambiar avatar</button>
                    </Form.Group>
                </fieldset>
                <fieldset className='flex-wrap customLegend mobile__column'>
                    <legend>Datos</legend>
                    <Col>
                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column>
                            Nombre
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control readOnly defaultValue={user.nombre} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column>
                            Apellidos
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control readOnly={!!user.apellidos} onChange={(e)=>setForm({...form,apellidos:e.target.value})} value={user.apellidos} />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column>
                            Email
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control readOnly defaultValue={user.email} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column>
                            Telefono
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control readOnly={user.telefono !== null} onChange={(e)=>setForm({...form,telefono:e.target.value})} value={user.telefono} />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column>
                            DNI
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control readOnly defaultValue={user.dni}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column>
                            Fecha nacimiento
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control type="date" readOnly={!!user.fecha_nacimiento} onChange={(e)=>setForm({...form,fecha_nacimiento:e.target.value})} value={user.fecha_nacimiento} />
                            </Col>
                        </Form.Group>
                    </Col>
                    <button onClick={handleUpdateProfile} className='btn mb-3 btn-primary'>Actualizar perfil</button>
                </fieldset>
            </Form>
                <h5 className="bg-info profile__forgot rounded">
                    <span className='text-secondary'>Olvidaste la contraseña?</span>
                    <Link onClick={handleRedirect} to="/forgot">Recuperar</Link>
                </h5>
            </div>
        </div>   
    )
} 