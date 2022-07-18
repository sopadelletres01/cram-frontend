import httpC from "./httpConfig";


export default class AuthService{

    static userIsAuth(){
        let dataToSend = {
            headers:{
                "x-access-token": localStorage.getItem("token")
            }
        }
        return httpC.get("/checkAuth",dataToSend)
    }

    static signup(data){
        console.log(data)
        return httpC.post("/auth/register", data);
    }
    static async signin(data){
        console.log(httpC)
        console.log("data",data)
        return await httpC.post("/auth/login", data);
    }
    static signout(){
        /* tien que enrutar el logout */
        return httpC.post("/auth/logout")
    }
    static forgotPassword(data){
        /* tien que enrutar el logout */
        return httpC.post("/forgot",data)
    }
    static resetPassword(data){
        /* tien que enrutar el logout */
        return httpC.post("/reset",data)
    }
    static resend(data){
        /* tien que enrutar el logout */
        return httpC.post(`/resend/${data.email}`)
    }
}
