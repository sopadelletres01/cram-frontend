import React , {useState, useEffect, useContext}from 'react'
//import '../css/estilosGrid.css'
import {Form, Button, Modal} from 'react-bootstrap'
import AuthService from '../../servicios/auth.service'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


/* hacer la conexion a la API */
/* hacer useState para guardar los datos del usuario */
/* peticion post  localhost:8080/auth/login */
/* pasarle por post la informacion del usuario en JSON */

/* VALIDACION DEL LOGIN */

export function Login() {
    const [show,setShow] = useState(false)
    const [form , setForm]= useState({ email:"", password:""})
    const [remember, setRemember] = useState(false)

    let navigate = useNavigate();
    const {user, setUser, isAuthenticated, login, setAuthStatus}= useContext(AuthContext)

    const handleResend = async () => {
        setShow(false)
        try{
            let resend = await AuthService.resend(form)
            console.log(resend)
            if(resend.status===200){
                console.log("ok", resend.status)
                /* pasarle al Context el usuario  */
            }
        }catch(e){
            if ( e.response.status === 401 ){
                
            }
            console.log(e)
        }
    }

    const toggleShow = () => {
        setShow(!show)
    }

    const HandleRedirect=()=>{
        navigate("/register",{replace:true})
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        let res=null;
        try{
            res = await AuthService.signin(form)
            console.log(res)
            if(res.status===200 && res.data.auth === true){
                console.log("RES DATA",res.data)
                const {data, token} = res.data
                login(data,token,remember)
                //Context login
            }
        }catch(e){
            if ( e.response?.status === 401 ){
                setShow(true)
            }
            console.log(e)
        }
    }

  return (
      <div style={{maxWidth:"700px"}} className="container w-75 mt-5 bg-light rounded p-3">
        <div className="row justify-content-center">
            <Form onSubmit={handleSubmit}>
                <h3 className="componente__titulo" >Login</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Dirección de email</Form.Label>
                        <Form.Control 
                        name='email'
                        size='sm' 
                        type="email" 
                        placeholder="introduce tu email" 
                        onChange={(e)=>setForm({...form, email:e.target.value})}/>
                        <Form.Text className="text-muted">
                        Estos datos no se van a compartir
                        </Form.Text>  
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contaseña</Form.Label>
                    <Form.Control type="password" placeholder="password" onChange={(e)=>setForm({...form, password:e.target.value})}/>
                    <Form.Text className="text-muted">
                    Mínimo 8 caracteres, una letra Mayúscula y un número
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" onChange={()=>setRemember(!remember)} label="Recuerdame" />
                </Form.Group>
                <Button className="botones__login" onClick={handleSubmit} variant="primary" type="submit">
                    Login
                </Button>
                <Button className="botones__login" onClick={()=>HandleRedirect()} variant="secondary">
                    Registrate
                </Button>
                <Link to="/forgot" className='style__forgot'><span>¿Has olvidado la contraseña?</span></Link>
            </Form>  
            <Modal show={show} onHide={toggleShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Resend email</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Tu cuenta no ha sido verificado todavia, dale click a enviar para recibir un email de confirmacion</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={toggleShow} variant="secondary">Cerrar</Button>
                    <Button onClick={handleResend} variant="primary">Enviar</Button>
                </Modal.Footer>
            </Modal>
        </div>
        </div>    
  )
}



