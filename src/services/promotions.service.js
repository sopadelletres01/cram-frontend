import httpC from './httpConfig';
import ApiCrudService from './crud.service';

export default class PromotionsService extends ApiCrudService {
  constructor() {
    super();
  }
  static getPromotionsByFreeEvents() {
    return httpC.get(`/promotions/free`);
    //le pasare el id de commerce que lo tiene la promcion
  }
  static getPromotionsByUser(id) {
    return httpC.get(`/users/${id}/Promotions`);
    //le pasare el id de commerce que lo tiene la promcion
  }
  static getPromotionsByComercio(id) {
    return httpC.get(`/commerces/${id}/Promotions`);
    //le pasare el id de commerce que lo tiene la promcion
  }
  static getPromotionsExpiredByUser(id) {
    return httpC.get(`/users/${id}/Promotions?expired=true`);
    //le pasare el id de commerce que lo tiene la promcion
  }
  static getPromo(uid, id) {
    return httpC.get(`/users/${uid}/promotions/${id}`);
  }
  static getPromosUsadas(id_usuario) {
    return httpC.get(`user_promo/${id_usuario}/Promotions`);
  }
  static existThisPromo(id_usuario, id_Promotion) {
    console.log(id_usuario, id_Promotion);
    return httpC.get(`user_promo/${id_usuario}/promotions/${id_Promotion}`);
  }
}
