import httpC from './httpConfig';
import ApiCrudService from './crud.service';

export default class PromotionsService extends ApiCrudService {
  constructor() {
    super();
  }

// NEW METHODS!!!!
  static getPromotionsByUser(id) {
    return httpC.get(`/users/${id}/promotions`);
    //le pasare el id de commerce que lo tiene la promcion
  }
  static getPromotionsByComercio(id) {
    return httpC.get(`/commerces/${id}/promotions`);
    //le pasare el id de commerce que lo tiene la promcion
  }
  static getPromotionsExpiredByUser(id) {
    return httpC.get(`/users/${id}/promotions?expired=true`);
    //le pasare el id de commerce que lo tiene la promcion
  }
  static getPromo(uid, id) {
    return httpC.get(`/users/${uid}/promotions/${id}`);
  }
  static getPromosUsadas(idUser) {
    return httpC.get(`/user_promo/${idUser}/promotions`);
  }
  static existThisPromo(idUser, idPromotion) {
    console.log(idUser, idPromotion);
    return httpC.get(`/user_promo/${idUser}/promotions/${idPromotion}`);
  }
}
