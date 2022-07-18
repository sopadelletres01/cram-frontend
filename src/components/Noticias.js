import React, {useContext, useEffect} from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const Noticias = () =>{
    let navigate = useNavigate()

    const { isAuthenticated } = useAuth();
    //Es mock, era para probar si hacia algo aun no lifa tenemos SIIIIIII
    if(!isAuthenticated){
        navigate('/login');
    }
    return (
        <>
            <h1>ESTA PAGINA ESTA EN PROCESO...</h1>
            <h5>Lo sentimos, vuelve mas tarde...</h5>
            <Link to="/">Volver al inicio</Link>
        </>
      )
}

export default Noticias;