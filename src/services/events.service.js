import ApiCrudService from "./crud.service";
import httpC from "./httpConfig";

export default class EventsService extends ApiCrudService {
  constructor() {
    super();
  }

  static getEventActiveFree() {
    return httpC.get(`/events?free=true&active=true`);
  }
  static getEventosByUser(id) {
    return httpC.get(`/usuarios/${id}/eventos`);
  }
  static getEventosCurrent() {
    return httpC.get(`/eventos?active=true`);
  }
  static getEventosByDni(dni, idComercio) {
    return httpC.get(`eventos?dni=${dni}`);
  }
  static updatePhoto(data, id) {
    return httpC.put(`/file/${id}`, data);
  }
  static getComercios(id) {
    return httpC.get(`/eventos/${id}/comercios`);
  }
  static getPromociones(id) {
    return httpC.get(`/eventos/${id}/promociones`);
  }
}
