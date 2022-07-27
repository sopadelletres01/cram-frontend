import ApiCrudService from "./crud.service";
import httpC from "./httpConfig";

export default class EventsService extends ApiCrudService {
  constructor() {
    super();
  }

  static getEventsActiveFree() {
    return httpC.get(`/events?free=true&active=true`);
  }
  static getEventsByUser(id) {
    return httpC.get(`/users/${id}/events`);
  }
  static getEventsActive() {
    return httpC.get(`/events?active=true`);
  }
  static getEventsByDni(dni, idComercio) {
    return httpC.get(`events?dni=${dni}`);
  }
  static updatePhoto(data, id) {
    return httpC.put(`/file/${id}`, data);
  }
  static getCommerces(id) {
    return httpC.get(`/events/${id}/commerces`);
  }
  static getPromotions(id) {
    return httpC.get(`/events/${id}/promotions`);
  }
}
