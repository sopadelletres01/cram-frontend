import httpC from './httpConfig';
import ApiCrudService from './crud.service';

export default class ComerciosService extends ApiCrudService {
  constructor() {
    super();
  }
  static searchCommerce(nif) {
    return httpC.get(`/commerces?nif=${nif}`);
  }
  //esta nos da las Promotions que tiene un user en un commerce
  static searchPromoAndUser(dni, id) {
    return httpC.get(`/users/${dni}/commerces/${id}`);
  }
}
