import { useEffect, useState } from 'react';
import { Button, Card, Badges, Badge, Form } from 'react-bootstrap';
import EventosService from '../../services/events.service';
import PromotionsService from '../../services/promotions.service';

export default function PromotionEdit({ events, id, caducado, title, commerce, evento, descripcion, inicio, src, final }) {
  const [form, setForm] = useState();

  useEffect(() => {
    setForm({
      descripcion,
      title,
      evento_id: evento,
      src,
      fecha_finalizacion: final,
      fecha_inicio: inicio,
    });
  }, []);

  const handleEdit = async e => {
    console.log('FORM', form);
    e.preventDefault();
    try {
      let res = await PromotionsService.update('Promotions', id, form);
      if (res.status === 200) {
        let promo = await PromotionsService.show('Promotions', id);
        console.log('PROMOOO', promo);
        setForm(promo.data);
      }
      console.log('resssss', res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async e => {
    e.preventDefault();
    try {
      let res = await PromotionsService.delete('Promotions', id);
      console.log('resssss', res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card>
      <Card.Body>
        <div className="card__evento">
          <Card.Img style={{ flex: '1', maxWidth: '700px' }} variant="top" src={src} />
          <Form className="card__body">
            {/* Poner el name del commerce */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
              <Card.Text style={{ display: 'flex', gap: '8px', flexFlow: 'column wrap' }}>
                {caducado ? <Badge bg="danger">Expirada</Badge> : <Badge bg="success">Vigente</Badge>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Titulo</Form.Label>
                  <Form.Control name="title" value={form?.title} size="sm" type="text" onChange={e => setForm({ ...form, title: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Fecha Inicio</Form.Label>
                  <p>Actual: {inicio}</p>
                  <Form.Control
                    name="fecha_inicio"
                    value={form?.fecha_inicio}
                    size="sm"
                    type="date"
                    onChange={e => setForm({ ...form, fecha_inicio: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Fecha Finalizacion</Form.Label>
                  <p>Actual: {final}</p>
                  <Form.Control
                    name="fecha_finalizacion"
                    value={form?.fecha_finalizacion}
                    size="sm"
                    type="date"
                    onChange={e => setForm({ ...form, fecha_finalizacion: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control
                    name="descipcion"
                    value={form?.descripcion}
                    size="sm"
                    type="text"
                    onChange={e => setForm({ ...form, descripcion: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Evento</Form.Label>
                  <p>Actual: {form?.evento_id}</p>
                  <Form.Select
                    value={form?.evento_id}
                    name="evento"
                    aria-label="Escoge un evento"
                    onChange={e => setForm({ ...form, evento_id: e.target.value })}
                  >
                    <option hidden selected>
                      Selecciona un evento
                    </option>
                    {events.map(ev => {
                      return (
                        <option key={ev.id} value={ev.id}>
                          {ev.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <Button onClick={handleEdit} variant="warning">
                    Editar Promotion
                  </Button>
                  <Button onClick={handleDelete} variant="danger">
                    Eliminar Promotion
                  </Button>
                </div>
              </Card.Text>
            </div>
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
}
