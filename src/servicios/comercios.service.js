import httpC from "./httpConfig";
import ApiCrudService from "./crud.service";


export default class ComerciosService extends ApiCrudService{

    constructor(){
        super()
    }
    static serachComercio(nif){
        return httpC.get(`/comercios?nif=${nif}`)

    }
    //esta nos da las promociones que tiene un usuario en un comercio
    static searchPromoAndUser(dni, id){
        return httpC.get(`/usuarios/${dni}/comercios/${id}`)

    }
    

    
    
}
