import ApiCrudService from './crud.service';
import httpC from './httpConfig';

export default class UsuariosService extends ApiCrudService {
  /* getAll(){
        return httpC.get("/users");
    }

    static get(id){
        return httpC.get(`/users/${id}`);
    }
    static create(data){
        return httpC.post("/users", data);
    }
    static update(id, data){
        return httpC.put(`/users/${id}`, data);
    }
    static delete(id){
        return httpC.delete(`/users/${id}`);
    } */

  static deleteInscriptionsByUser(id) {
    return httpC.delete(`/users/${id}/events`);
  }
  static searchUser(dni) {
    return httpC.get(`/users?dni=${dni}`);
  }
  static getRolByUser(id) {
    return httpC.get(`/roles/${id}`);
  }
  static updateAvatar(data, id) {
    return httpC.put(`/file/${id}`, data);
  }
  static createComercial(data) {
    return httpC.post(`/users?comercial=true`, data);
  }
}
