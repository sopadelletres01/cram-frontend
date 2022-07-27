import React, { useContext, useEffect, useRef, useState } from 'react';
import { Badge, Button, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PromotionsService from '../../services/promotions.service.js';
import {  useAuth } from '../context/AuthContext';
import { useGlobalState } from '../context/GlobalContext';
import { BsDownload } from 'react-icons/bs';

const Promo = () => {
const {setError, setLoading} = useGlobalState()
const { user } = useAuth();
  const { id } = useParams();
  const [promoData, setPromoData] = useState([]);
  const [modal, setModal] = useState(false);
  let navigate = useNavigate();

  const redirectEvento = () => {
    navigate(`/user/events/${promoData.id_evento}`);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await PromotionsService.getPromo(user.id, id);
        console.log('res', res);
        if (res.status === 200) {
          setPromoData(res.data);
        }
        const userPromotionsCaducadas = await PromotionsService.getPromotionsExpiredByUser(user.id);
        console.log('caducadas', userPromotionsCaducadas);
        if (userPromotionsCaducadas.data.find(promo => promo.id === res.data.id)) {
          setPromoData({ ...res.data, caducado: true });
        }
      } catch (e) {
        setError(e);
        console.log('Error ', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Card
      style={{
        height: '100%',
        background: 'rgb(108,172,255)',
        background: 'linear-gradient(180deg, rgba(108,172,255,1) 17%, rgba(141,235,255,1) 89%)',
      }}
    >
      <Card.Body>
        <div
          style={{
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-around',
            position: 'relative',
          }}
          className="card__evento"
        >
          {/* Poner el name del commerce */}
          <h1>{promoData.title}</h1>
          <img
            className="qr__promo"
            style={{
              width: '200px',
              height: '200px',
              position: 'absolute',
              right: '0px',
              bottom: '0px',
            }}
            src="https://res.cloudinary.com/dhdbik42m/image/upload/v1653246688/websiteQRCode_noFrame_vcjzxh.png"
          ></img>
          <Card.Text className="laptop__column" style={{ display: 'flex', gap: '16px' }}>
            <Card.Img style={{ flex: '1', maxHeight: '600px' }} variant="top" src={promoData.src} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                flex: '1',
              }}
            >
              <span>
                <strong>Descripcion:</strong> {promoData.descripcion}
              </span>
              <span>
                {' '}
                <strong>Comercio:</strong> <span>{promoData.comercio_nombre}</span>
              </span>
              <span>
                <strong>Evento asignado:</strong> <span>{promoData.evento_nombre}</span> <br />
                <a className="link-primary" onClick={redirectEvento}>
                  Ver evento
                </a>
              </span>
              <span>
                <strong>La promoción estará disponible desde :</strong> <span>{promoData.fecha_inicio}</span>
              </span>
              <span>
                <strong>La promoción expirará: </strong>
                <span>{promoData.fecha_expiracion}</span>
              </span>
              <strong>Estado: </strong>
              {promoData.caducado ? (
                <Badge style={{ width: '100px' }} bg="danger">
                  Expirada
                </Badge>
              ) : (
                <Badge style={{ width: '100px' }} bg="success">
                  Vigente
                </Badge>
              )}
            </div>
            <Button onClick={() => setModal(true)} className="show__qr">
              Ver qr:
            </Button>
          </Card.Text>
          <div
            className="button__row-left"
            style={{
              display: 'flex',
              borderRadius: '16px',
              justifyContent: 'space-around',
              backgroundColor: 'rgb(173 211 233)',
              gap: '8px',
              padding: '16px',
            }}
          >
            <Link className="btn btn-secondary" to="/user/Promotions">
              Volver atrás
            </Link>
            <Button className="btn btn-primary">
              Descargar pdf <BsDownload></BsDownload>{' '}
            </Button>
          </div>
          <Modal onHide={() => setModal(false)} contentClassName="modal__qr" size="sm" aria-labelledby="contained-modal-title-vcenter" centered show={modal}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">Codigo QR</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src="https://res.cloudinary.com/dhdbik42m/image/upload/v1653246688/websiteQRCode_noFrame_vcjzxh.png"></img>
            </Modal.Body>
          </Modal>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Promo;
