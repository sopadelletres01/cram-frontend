import React, { useContext, useEffect, useRef, useState } from 'react';
import { Badge, Button, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PromotionsService from '../../services/promotions.service.js';
import { useAuth } from '../context/AuthContext';
import { useGlobalState } from '../context/GlobalContext';
import { BsDownload } from 'react-icons/bs';
import UtilsService from '../../services/utils.service.js';

const Promo = () => {
  const { setError, setLoading } = useGlobalState();
  const { user } = useAuth();
  const { id } = useParams();
  const [promoData, setPromoData] = useState([]);
  const [QR, setQR] = useState([]);
  const [modal, setModal] = useState(false);
  let navigate = useNavigate();

  const redirectEvento = () => {
    navigate(`/events/${promoData.idEvent}`);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await PromotionsService.getPromo(id);
        if (res.status === 200) {
          setPromoData(res.data);
        }
        const userPromotionsCaducadas = await PromotionsService.getPromotionsExpiredByUser(user.id);
        if (userPromotionsCaducadas.data.find(promo => promo.id === res.data.id)) {
          setPromoData({ ...res.data, expired: true });
        }
        const qr = await UtilsService.getQRCode(user.id, id);
        setQR(qr.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="show__event">
      <h2 className="title__detail_event">Detalles de la promoción</h2>

      <div className="container__shown_event" style={{maxHeight:"none"}}>
        <div className="event__info_show">
          <img src={promoData.photo} alt={promoData.name} />
          <div className="event__info_more p-3 d-flex flex-column">
            <span className="event__title">Descripcion:</span>
            <p className="event_information">{promoData.description}</p>
            <span className="event__title">Comercio que la proporciona:</span>
            <p className="event_information">{promoData.commerce_name}</p>
            <span className="event__title">Evento asignado:</span>
            <p className="event_information">
              {promoData.event_name}{' '}
              <a className="link-primary" onClick={redirectEvento}>
                Ver evento
              </a>
            </p>
            <span className="event__title">Población:</span>
            <p className="event_information">{promoData.town}</p>
            <span className="event__title">Fecha de Inicio:</span>
            <p className="event_information">{promoData.start_date}</p>
            <span className="event__title">Fecha de finalización:</span>
            <p className="event_information">{promoData.final_date}</p>
            <strong>La promoción estará disponible desde :</strong> <span>{promoData.start_date}</span>
            <strong>Estado: </strong>
            {promoData.expired ? (
              <Badge style={{ width: '100px' }} bg="danger">
                Expirada
              </Badge>
            ) : (
              <Badge style={{ width: '100px' }} bg="success">
                Vigente
              </Badge>
            )}
            <div className="decoration__button">
              <Button className="form__show_event button" onClick={() => setModal(true)}>
                Canjear promoción
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex container mt-5 mb-5 justify-content-around ">
        <div className="d-flex flex-column gap-3">
          <h2 className="title__detail_event">Comercio asociado:</h2>
          <Link to={`/commerces/${promoData.idCommerce}`} className="card__promotion">
            <div className="card__content_promotion">
              <img src={promoData?.photo_commerce} alt={`${promoData?.commerce_name}`} />
              <h5>{promoData?.commerce_name}</h5>
              <span className="card__promotion_description">{promoData?.commerce_town}</span>
            </div>
          </Link>
        </div>
        <div className="d-flex flex-column gap-3">
          <h2 className="title__detail_event">Evento asociado:</h2>
          <Link to={`/events/${promoData.idEvent}`} className="card__promotion">
            <div className="card__content_promotion">
              <img src={promoData?.event_photo} alt={`${promoData?.event_name}`} />
              <h5>{promoData?.event_name}</h5>
              <span className="card__promotion_description">{promoData?.event_description}</span>
            </div>
          </Link>
        </div>
      </div>

      <Modal onHide={() => setModal(false)} contentClassName="modal__qr" size="sm" aria-labelledby="contained-modal-title-vcenter" centered show={modal}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Codigo QR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className="qr__promo" src={QR}></img>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Promo;
