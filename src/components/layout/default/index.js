import React, { useState, useEffect, useRef, useContext } from 'react'
import Content from '../Content'
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import {GrLogout} from 'react-icons/gr'
import { Button, Modal,DropdownButton ,Dropdown} from 'react-bootstrap'
//import '../../../css/estilosGrid.css'
import mapboxgl from 'mapbox-gl';
import Helmet from 'react-helmet';
import LoadingSpinner from '../../Spinner';
import { AuthContext } from '../../context/AuthContext';
import SidebarCollapse from '../SidebarCollpase';
import { Link } from 'react-router-dom';



export default function Layout({ children, sidebar = false }) {
  const [showModal, setShowModal] = useState(false);
  const {logout, loading, user } = useContext(AuthContext)
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(1.7266128);
  const [lat, setLat] = useState(41.22375);
  const [zoom, setZoom] = useState(14);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const logoutSession = () =>{
    console.log("tusa")
    logout()
  }

  useEffect(() => {
    console.log("hola")
    if (!showModal) return
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current || null,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });
  return (
    //Pagina de usuario de inicio
    <>
      <Helmet>
        <title>Cram page</title>
        <meta content="width=device-width, initial scale=1.0"
          name="viewport" />
        <meta content="" name="keywords" />
        <meta content="" name="description" />
      </Helmet>
      <div className="container__principal">
        <Header className="default__header">
          <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"space-around"}}>
            <div className='logo rounded-circle'>
              <img className='rounded-circle' src='https://res.cloudinary.com/dhdbik42m/image/upload/v1653223372/gxxwczzlh4bnfunaglnb-removebg-preview_rqogin.png'></img>
              Cram Sports
            </div>
            {
              user.rol === 1 && 
              <div style={{display:"flex",gap:"8px",flexDirection:"column", textAlign:"center"}}>
                <h5>Mis gestiones:</h5>
                <div style={{display:"flex",gap:"8px",flexWrap:"wrap",justifyContent:"center"}}>
                  <Link to="/user/promociones" className='btn btn-primary'>Promociones</Link>
                  <Link to="/user/eventos" className='btn btn-primary'>Eventos</Link>
                </div>
              </div>
            }
            {user.rol === 2 && 
              <div style={{display:"flex",gap:"8px",flexDirection:"column", textAlign:"center"}}>
                <h5> Gestionar Datos: </h5>
                <div style={{display:"flex",gap:"8px",flexWrap:"wrap",justifyContent:"center"}}>
                  <Link to="/inscripciones" className='btn btn-primary'>Usuarios</Link>
                  <Link to="/eventos/create" className='btn btn-primary'>Eventos</Link>
                  <Link to="/comercio" className='btn btn-primary'>Comercios</Link>
                </div>
              </div>
            }
            {user.rol === 4 && 
              <div style={{display:"flex",gap:"8px",flexDirection:"column", textAlign:"center"}}>
                <h5> Gestionar Datos: </h5>
                <div style={{display:"flex",gap:"8px",flexWrap:"wrap",justifyContent:"center"}}>
                  <Link to="/comercio/promociones" className='btn btn-primary'>Promociones</Link>
                  <Link to="/promociones/create" className='btn btn-primary'>Crear nueva promocion</Link>
                  <Link to="/comercio/validar" className='btn btn-primary'>Validar promociones</Link>
                  <Link to="/user/eventos" className='btn btn-primary'>Eventos</Link>
                </div>
              </div>
            }
            <GrLogout onClick={logoutSession} size={"40px"} ></GrLogout>
          </div>
          <nav className='navbar__mobile'>
              <div style={{display:"flex",gap:"8px", justifyContent:"center"}}>
                <Link to="/user" >User Page</Link>
                <Link to="/logout" onClick={()=>logoutSession()} >Logout</Link>
                <Link to="/user/profile" >Profile</Link>
              </div>
          </nav>
        </Header>
        {/* Navegacion mobile */}
        {/* Menu de la Izquierda */}
        <Sidebar />
        {/* Contenido donde va aparecer la infromacion de los servicio */}
        <section>
          {children}
        </section>

        {/* Modal de loading */}
        <Modal
          contentClassName='modal__spinner'
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={loading}
        >
          <Modal.Body style={{backgroundColor:"transparent"}}>
            <LoadingSpinner/>
          </Modal.Body>
        </Modal>
        
        {/* Modal de mapa */}

        <Modal show={showModal} backdrop="static" fullscreen >

          <Modal.Header>
            <Modal.Title>Nuestra Ubicaciónn</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="fullwidth">
              <div ref={mapContainer} className="map__container" />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleToggleModal}>Cerrar</Button>

          </Modal.Footer>
        </Modal>
        <Footer accio={handleToggleModal} />
      </div>
    </>

  )
}