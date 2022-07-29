import httpC from './httpConfig';

export default class ApiCrudService {
  static index(resource) {
    return httpC.get(`/${resource}`);
  }
  static show(resource, id) {
    return httpC.get(`/${resource}/${id}`);
  }
  static create(resource, data) {
    return httpC.post(`/${resource}`, data);
  }
  static update(resource, id, data) {
    return httpC.put(`/${resource}/${id}`, data);
  }
  static delete(resource, id) {
    return httpC.delete(`/${resource}/${id}`);
  }
}
