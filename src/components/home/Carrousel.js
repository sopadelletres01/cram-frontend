import React from "react";
import Carousel from "react-bootstrap/Carousel";

function Carrousel({ listEvents }) {
  return (
    <Carousel variant="dark">
      {listEvents.map((event) => {
        return (
          <Carousel.Item >
            <img
              width='50px'
              height='50px'
              className="d-block w-100"
              src={event.photo}
              alt="First slide"
            />
            <Carousel.Caption>
              <h5>{event.nam}</h5>
              <p>
                `{event.start_date} hasta el {event.finish_date}`
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default Carrousel;
