import React, { useState, useEffect, useCallback, useContext } from 'react';
import ComerciosService from '../../services/commerces.service.js';
import PromotionsService from '../../services/promotions.service.js';
import Filters from './Filters';
import { AuthContext, useAuth } from '../context/AuthContext';
//import Filters from '../events/Filters';
import { useNavigate } from 'react-router';
import PromotionEdit from './CardPromotionEdit.js';
import EventosService from '../../services/events.service.js';
//En esta pagina se mostraran todos los events de la aplicacion, por orden alfabetico o proximidad,
//por defecto, la lista mostrará primero los events a los que estas inscrito y los diferenciará de los otros
//con una etiqueta verde de "inscrito"
//Además, se podrá filtrar por inscritos o no inscritos, para que la busqueda sea mas sencilla

export default function Promotions({ className, ...rest }) {
  const { user, loading, setLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const [Promotions, setPromotions] = useState([]);
  const [PromotionsCaducadas, setPromotionsCaducadas] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [selected, setSelected] = useState(0);
  const [events, setEventos] = useState([]);
  const navigate = useNavigate();
  //guardamos las Promotions de un user

  const handleShowPromo = id => {
    navigate(`/user/promotions/${id}`);
  };

  const renderPromotionsComercio = () => {
    console.log('filteredPromotions', filteredPromotions);
    console.log('PROMOS', Promotions);

    switch (selected) {
      case 1:
        //Caducadas
        return PromotionsCaducadas.map(Promotion => {
          return (
            <PromotionEdit
              events={events}
              id={Promotion.id}
              onClick={() => handleShowPromo(Promotion.id)}
              key={Promotion.id}
              caducado={true}
              title={Promotion.title}
              commerce={Promotion.comercio_nombre}
              evento={Promotion.evento_id}
              descripcion={Promotion.descripcion}
              inicio={Promotion.fecha_inicio}
              src={Promotion.src}
              final={Promotion.fecha_expiracion}
            />
          );
        });
      case 2:
        //Vigentes
        return filteredPromotions
          .filter(promo => {
            return !PromotionsCaducadas.find(p => p.id === promo.id);
          })
          .map(Promotion => {
            return (
              <PromotionEdit
                events={events}
                id={Promotion.id}
                onClick={() => handleShowPromo(Promotion.id)}
                key={Promotion.id}
                caducado={false}
                title={Promotion.title}
                commerce={Promotion.comercio_nombre}
                evento={Promotion.evento_id}
                descripcion={Promotion.descripcion}
                inicio={Promotion.fecha_inicio}
                src={Promotion.src}
                final={Promotion.fecha_expiracion}
              />
            );
          });
      case 3:
      default:
        //todos
        return filteredPromotions.map(Promotion => {
          let caducado = false;
          var date1 = Date.parse(Promotion.fecha_expiracion);
          var date2 = Date.now();
          if (date1 < date2) caducado = true;
          return (
            <PromotionEdit
              events={events}
              id={Promotion.id}
              onClick={() => handleShowPromo(Promotion.id)}
              key={Promotion.id}
              caducado={caducado}
              title={Promotion.title}
              commerce={Promotion.comercio_nombre}
              evento={Promotion.evento_id}
              descripcion={Promotion.descripcion}
              inicio={Promotion.fecha_inicio}
              src={Promotion.src}
              final={Promotion.fecha_expiracion}
            />
          );
        });
    }
  };

  const renderPromotions = () => {
    //Renderizamos los events dependiendo del filtro de tipo: "inscrito" | "no inscrito" | "todos"
    //Este filtro se encuentra en el componente Filters y le pasamos el resultado a este componente

    console.log('filteredPromotions', filteredPromotions);
    console.log('PROMOS', Promotions);

    switch (selected) {
      case 1:
        //Caducadas
        return PromotionsCaducadas.map(Promotion => {
          return (
            <Promotion
              onClick={() => handleShowPromo(Promotion.id)}
              key={Promotion.id}
              caducado={true}
              title={Promotion.title}
              commerce={Promotion.comercio_nombre}
              evento={Promotion.evento_nombre}
              descripcion={Promotion.descripcion}
              inicio={Promotion.fecha_inicio}
              src={Promotion.src}
              final={Promotion.fecha_expiracion}
            />
          );
        });
      case 2:
        //Vigentes
        return filteredPromotions
          .filter(promo => {
            return !PromotionsCaducadas.find(p => p.id === promo.id);
          })
          .map(Promotion => {
            return (
              <Promotion
                onClick={() => handleShowPromo(Promotion.id)}
                key={Promotion.id}
                caducado={false}
                title={Promotion.title}
                commerce={Promotion.comercio_nombre}
                evento={Promotion.evento_nombre}
                descripcion={Promotion.descripcion}
                inicio={Promotion.fecha_inicio}
                src={Promotion.src}
                final={Promotion.fecha_expiracion}
              />
            );
          });
      case 3:
      default:
        //todos
        return filteredPromotions.map(Promotion => {
          let caducado = false;
          var date1 = Date.parse(Promotion.fecha_expiracion);
          var date2 = Date.now();
          if (date1 < date2) caducado = true;
          return (
            <Promotion
              onClick={() => handleShowPromo(Promotion.id)}
              key={Promotion.id}
              caducado={caducado}
              title={Promotion.title}
              commerce={Promotion.comercio_nombre}
              evento={Promotion.evento_nombre}
              descripcion={Promotion.descripcion}
              inicio={Promotion.fecha_inicio}
              src={Promotion.src}
              final={Promotion.fecha_expiracion}
            />
          );
        });
    }
  };

  useEffect(() => {
    if (Promotions.length > 0) return;
    async function getPromotions() {
      try {
        //Loading del modal a true
        setLoading(true);

        if (user.rol === 4) {
          let events = await EventosService.index('events');
          console.log('events', events);
          if (events.status === 200) {
            setEventos(events.data);
          }
          let userPromotions = await PromotionsService.getPromotionsByComercio(user.comercio_id);
          let userPromotionsCaducadas = await PromotionsService.getPromotionsExpiredByUser(user.id);

          console.log('PROMOCOMER', userPromotions);
          setPromotionsCaducadas(userPromotionsCaducadas.data);
          setPromotions(userPromotions.data);
          setFilteredPromotions(userPromotions.data);
          return;
        }

        let userPromotions = await PromotionsService.getPromotionsByUser(user.id);
        const userPromotionsCaducadas = await PromotionsService.getPromotionsExpiredByUser(user.id);
        console.log('USERPROMOS', userPromotions.data);
        console.log('CADUCADAS', userPromotionsCaducadas.data);
        //le pasamos el id del commerce que tiene la Promotion.
        //const commerce= await ComerciosService.show("commerces",Promotions.comercio_id);
        setPromotionsCaducadas(userPromotionsCaducadas.data);
        setPromotions(userPromotions.data);
        setFilteredPromotions(userPromotions.data);
      } catch (err) {
        console.log(err);
      } finally {
        //Pase lo que pase loading del modal a false
        setLoading(false);
      }
    }
    getPromotions();
    return () => getPromotions();
  }, []);

  return (
    <div>
      <Filters
        setSelected={setSelected}
        selected={selected}
        setPromotions={setFilteredPromotions}
        filteredPromotions={filteredPromotions}
        Promotions={Promotions}
        open={open}
        setOpen={setOpen}
      />
      <div className="eventos__topbar">
        <div className="events">
          {filteredPromotions.length > 0 ? (
            <>
              <h1>Promotions Disponibles</h1>
              {user.rol === 4 ? renderPromotionsComercio() : renderPromotions()}
            </>
          ) : (
            <h1>No hemos encontrado ningun resultado</h1>
          )}
        </div>
      </div>
    </div>
  );
}
