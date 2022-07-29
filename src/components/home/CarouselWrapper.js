import React, { useEffect, useState } from 'react';
import Carousel from '../Carousel/Carousel';
import EventsService from '../../services/events.service';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalContext';
import CarouselItem from '../Carousel/CarouselItem';
import PromotionsService from '../../services/promotions.service';
function CarouselWrapper() {
  const { setLoading } = useGlobalState();
  const [eventsFree, setEventsFree] = useState();
  const [promosFree, setPromosFree] = useState();
  useEffect(() => {
    if (eventsFree && promosFree) return;
    (async () => {
      try {
        setLoading(true);
        const data = await EventsService.getEventsActiveFree();
        const promos = await PromotionsService.getPromotionsByFreeEvents();
        setEventsFree(data.data);
        setPromosFree(promos.data);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
    return () => setLoading(false);
  }, []);

  return (
    <div className="carouselsWrapper">
      <Carousel title="Próximos eventos" show={4} infiniteLoop withIndicator>
        {eventsFree &&
          eventsFree.map(ev => {
            return <CarouselItem key={ev.id} element={ev} />;
          })}
      </Carousel>
      <Carousel title="Promociones disponibles" show={4} infiniteLoop withIndicator>
        {promosFree &&
          promosFree.map(promo => {
            return <CarouselItem key={promo.id} type="promotion" element={promo} />;
          })}
      </Carousel>
    </div>
  );
}

export default CarouselWrapper;
