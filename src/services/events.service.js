import ApiCrudService from './crud.service';
import httpC from './httpConfig';

export default class EventosService extends ApiCrudService {
  constructor() {
    super();
  }

  static getEventosByUser(id) {
    return httpC.get(`/users/${id}/events`);
  }
  static getEventosCurrent() {
    return httpC.get(`/events?active=true`);
  }
  static getEventosByDni(dni, idComercio) {
    return httpC.get(`events?dni=${dni}`);
  }
  static updatePhoto(data, id) {
    return httpC.put(`/file/${id}`, data);
  }
  static getComercios(id) {
    return httpC.get(`/events/${id}/commerces`);
  }
  static getPromotions(id) {
    return httpC.get(`/events/${id}/Promotions`);
  }
}
