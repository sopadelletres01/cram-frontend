import httpC from "./httpConfig";
import ApiCrudService from "./crud.service";


export default class PromocionesService extends ApiCrudService{

    constructor(){
        super()
    }
    
    static getPromocionesByUser(id){
         return httpC.get(`/usuarios/${id}/promociones`)
    //le pasare el id de comercio que lo tiene la promcion
    
    }
    static getPromocionesByComercio(id){
        return httpC.get(`/comercios/${id}/promociones`)
   //le pasare el id de comercio que lo tiene la promcion
   
    }
    static getPromocionesExpiredByUser(id){
        return httpC.get(`/usuarios/${id}/promociones?expired=true`)
   //le pasare el id de comercio que lo tiene la promcion
   
   }
    static getPromo(uid,id){
        return httpC.get(`/usuarios/${uid}/promociones/${id}`)
    }
    static getPromosUsadas(id_usuario){
      
        return httpC.get(`user_promo/${id_usuario}/promociones`)
    }
    static existThisPromo(id_usuario, id_promocion){
        console.log(id_usuario, id_promocion)
        return httpC.get(`user_promo/${id_usuario}/promociones/${id_promocion}`)
    }
}
