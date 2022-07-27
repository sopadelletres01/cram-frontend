import React, { useEffect, useState } from 'react';
import Carousel from '../Carousel';
import EventsService from '../../services/events.service';
import { Link } from 'react-router-dom';
import CarouselEvent from '../events/CarouselEvent';
function CarouselWrapper() {
  const [eventsFree, setEventsFree] = useState();
  useEffect(() => {
    (async () => {
      try {
        const data = await EventsService.getEventsActiveFree();
        console.log(data.data);
        setEventsFree(data.data);
      } catch (e) {
        console.log('Error', e);
      }
    })();
  }, []);

  return (
    <div className="carouselsWrapper">
      <Carousel title="Próximos eventos" show={4} infiniteLoop withIndicator>
        {eventsFree &&
          eventsFree.map(ev => {
            return <CarouselEvent event={ev} />;
          })}
      </Carousel>
      <Carousel title="Próximos eventos" show={4} infiniteLoop withIndicator>
        {eventsFree &&
          eventsFree.map(ev => {
            return <CarouselEvent event={ev} />;
          })}
      </Carousel>
      <Carousel title="Próximos eventos" show={4} infiniteLoop withIndicator>
        {eventsFree &&
          eventsFree.map(ev => {
            return <CarouselEvent event={ev} />;
          })}
      </Carousel>
    </div>
  );
}

export default CarouselWrapper;
