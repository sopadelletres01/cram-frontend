import React, { useState, useEffect, useCallback, useContext } from 'react';
import ComerciosService from '../../services/commerces.service.js';
import PromotionsService from '../../services/promotions.service.js';
import Filters from './Filters';
import { AuthContext, useAuth } from '../context/AuthContext';
//import Filters from '../events/Filters';
import { useNavigate } from 'react-router';
import PromotionEdit from './CardPromotionEdit.js';
import eventsService from '../../services/events.service.js';
import { useGlobalState } from '../context/GlobalContext.js';
import FinalPromotion from './FinalPromotionCard.js';
//En esta pagina se mostraran todos los events de la aplicacion, por orden alfabetico o proximidad,
//por defecto, la lista mostrará primero los events a los que estas inscrito y los diferenciará de los otros
//con una etiqueta verde de "inscrito"
//Además, se podrá filtrar por inscritos o no inscritos, para que la busqueda sea mas sencilla

export default function Promotions({ className, ...rest }) {
  const { user } = useAuth();
  const { loading, setLoading } = useGlobalState();
  const [open, setOpen] = useState(false);
  const [promotionsData, setPromotionsData] = useState([]);
  const [promotionsDataUsadas, setPromotionsDataUsadas] = useState([]);
  const [promotionsDataCaducadas, setPromotionsDataCaducadas] = useState([]);
  const [filteredPromotionsData, setFilteredPromotionsData] = useState([]);
  const [selected, setSelected] = useState(0);
  const [events, setevents] = useState([]);
  const navigate = useNavigate();
  //guardamos las promotionsData de un user
  useEffect(() => {
    if (promotionsData.length > 0) return;
    async function getPromotions() {
      try {
        //Loading del modal a true
        setLoading(true);

        let userPromotions = await PromotionsService.getPromotionsByUser(user.id);
        const userPromotionsCaducadas = await PromotionsService.getPromotionsExpiredByUser(user.id);
        const promotionsUsadas = await PromotionsService.getPromosUsadas(user.id);

        //le pasamos el id del commerce que tiene la Promotion.
        //const commerce= await ComerciosService.show("commerces",Promotions.comercio_id);
        let arrayFinalPromos = [];
        let arrayFinalPromosCaducadas = [];
        for (const promotionElem of userPromotions.data) {
          const promoUsada = await PromotionsService.existThisPromo(user.id, promotionElem.id);
          let promoCaducada = userPromotionsCaducadas.data.find(promo=>promo.id === promotionElem.id)
          if (promoUsada && promoUsada.data) {
            arrayFinalPromos.push({ ...promotionElem, used: true });
            if(promoCaducada) arrayFinalPromosCaducadas.push({ ...promotionElem, used: true });
          } else {
            arrayFinalPromos.push({ ...promotionElem, used: false });
            if(promoCaducada)arrayFinalPromosCaducadas.push({ ...promotionElem, used: false });
          }
        }

        setPromotionsDataCaducadas(arrayFinalPromosCaducadas);
        setPromotionsData(arrayFinalPromos);
        setPromotionsDataUsadas(promotionsUsadas.data);
        setFilteredPromotionsData(arrayFinalPromos);
      } catch (err) {
      } finally {
        //Pase lo que pase loading del modal a false
        setLoading(false);
      }
    }
    getPromotions();
    return () => getPromotions();
  }, []);

  const handleShowPromo = id => {
    navigate(`/promotions/${id}`);
  };

  const renderPromotions = () => {
    //Renderizamos los events dependiendo del filtro de tipo: "inscrito" | "no inscrito" | "todos"
    //Este filtro se encuentra en el componente Filters y le pasamos el resultado a este componente


    switch (selected) {
      case 1:
        //Caducadas
        return promotionsDataCaducadas.map(promo => {
          return (
            <FinalPromotion
              onClick={() => handleShowPromo(promo.id)}
              key={promo.id}
              expired={true}
              used={promo.used}
              name={promo.name}
              commerce={promo.commerce_name}
              event={promo.event_name}
              description={promo.description}
              start={promo.start_date}
              photo={promo.photo}
              final={promo.final_date}
            />
          );
        });
      case 2:
        //Vigentes
        return filteredPromotionsData
          .filter(promo => {
            return !promotionsDataCaducadas.find(p => p.id === promo.id);
          })
          .map(Promotion => {
            return (
              <FinalPromotion
                onClick={() => handleShowPromo(Promotion.id)}
                key={Promotion.id}
                expired={false}
                used={Promotion.used}
                name={Promotion.name}
                commerce={Promotion.commerce_name}
                event={Promotion.event_name}
                description={Promotion.description}
                start={Promotion.start_date}
                photo={Promotion.photo}
                final={Promotion.final_date}
              />
            );
          });
      case 3:
        return filteredPromotionsData
          .filter(promo => promo.used === true)
          .map(Promotion => {
            let expired = false;
            var date1 = Date.parse(Promotion.final_date);
            var date2 = Date.now();
            if (date1 < date2) expired = true;
            return (
              <FinalPromotion
                onClick={() => handleShowPromo(Promotion.id)}
                key={Promotion.id}
                used={true}
                expired={expired}
                name={Promotion.name}
                commerce={Promotion.commerce_name}
                event={Promotion.event_name}
                description={Promotion.description}
                start={Promotion.start_date}
                photo={Promotion.photo}
                final={Promotion.final_date}
              />
            );
          });
      case 4:
      default:
        return filteredPromotionsData.map(Promotion => {
          let expired = false;
          var date1 = Date.parse(Promotion.final_date);
          var date2 = Date.now();
          if (date1 < date2) expired = true;
          return (
            <FinalPromotion
              onClick={() => handleShowPromo(Promotion.id)}
              key={Promotion.id}
              used={Promotion.used}
              expired={expired}
              name={Promotion.name}
              commerce={Promotion.commerce_name}
              event={Promotion.event_name}
              description={Promotion.description}
              start={Promotion.start_date}
              photo={Promotion.photo}
              final={Promotion.final_date}
            />
          );
        });
      //todos
    }
  };

  return (
    <div>
      <Filters
        setSelected={setSelected}
        selected={selected}
        setPromotions={setFilteredPromotionsData}
        filteredPromotions={filteredPromotionsData}
        promotions={promotionsData}
        open={open}
        setOpen={setOpen}
      />
      <div className="container__list">
        {filteredPromotionsData.length > 0 ? (
          <>
            <h1>Promociones Disponibles</h1>
            <div style={{ maxHeight: 'none', marginBottom: '100px' }} className="listCard">
              {renderPromotions()}
            </div>
          </>
        ) : (
          <h1>No hemos encontrado ningun resultado</h1>
        )}
      </div>
    </div>
  );
}
