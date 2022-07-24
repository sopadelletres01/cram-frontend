import ApiCrudService from './crud.service';
import httpC from './httpConfig';

export default class UsuariosService extends ApiCrudService {
  /* getAll(){
        return httpC.get("/usuarios");
    }

    static get(id){
        return httpC.get(`/usuarios/${id}`);
    }
    static create(data){
        return httpC.post("/usuarios", data);
    }
    static update(id, data){
        return httpC.put(`/usuarios/${id}`, data);
    }
    static delete(id){
        return httpC.delete(`/usuarios/${id}`);
    } */

  static deleteInscripcionesByUser(id) {
    return httpC.delete(`/usuarios/${id}/eventos`);
  }
  static searchUser(dni) {
    return httpC.get(`/usuarios?dni=${dni}`);
  }
  static getRolByUser(id) {
    return httpC.get(`/roles/${id}`);
  }
  static updateAvatar(data, id) {
    return httpC.put(`/file/${id}`, data);
  }
  static createComercial(data) {
    return httpC.post(`/usuarios?comercial=true`, data);
  }
}
