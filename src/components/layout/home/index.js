import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Footer from "../Footer";
import { Button, Modal } from "react-bootstrap";
import SidebarDespegable from "../SidebarDespegable";
import mapboxgl from 'mapbox-gl';
import Helmet from 'react-helmet';
import { FaHome } from 'react-icons/fa';
import { useGlobalState } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import LoadingSpinner from "../../Spinner"
import gif from '../../../commons/multimedia/cramGif.gif';

export default function HomeLayout({ children, sidebar = false }) {
  const [showModal, setShowModal] = useState(false);
  const { loading } = useGlobalState();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(1.7266128);
  const [lat, setLat] = useState(41.22375);
  const [zoom, setZoom] = useState(14);
  const [show, setShow] = useState(false)
    
  const toggleShow = () => { 
      console.log("ToggleShow")
      setShow(!show)
    }


  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (!showModal) return;
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current || null,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
  });
  return (
    <>
      <Helmet>
        <title>Cram page</title>
        <meta content="width=device-width, initial scale=1.0" name="viewport" />
        <meta content="" name="keywords" />
        <meta content="" name="description" />
      </Helmet>
      {/* <div className="animatedIntro">
        <img src={gif}></img>
      </div> */}
      <div className="layout">
        <Header className="header" showSidebar={toggleShow } />
        <SidebarDespegable setShow={setShow} show={ show} />
        <section>{children}</section>
      </div>
      {/* Modal de loading */}
      {loading && 
      <Modal contentClassName="modal__spinner" size="sm" aria-labelledby="contained-modal-title-vcenter" centered show={loading}>
          <Modal.Body style={{ backgroundColor: 'transparent' }}>
            <LoadingSpinner />
          </Modal.Body>
        </Modal>
      }
    </>
  );
}
