import axios from "axios";
let url = process.env.REACT_APP_SERVER_ADDRESS
console.log("url", url)
const httpC= axios.create({
    baseURL: url,
    header:{
        "Content-Type": "application/json",
    }
    
});
httpC.interceptors.request.use((config) => {
	//buscar el token en el localStorage
	const storedToken = localStorage.getItem('authToken');
	//si el token existe lo añadimos a los headers del request //pasar la autorizacion como string  indicando el tipo de autenticacion. OJO CON LOS ESPACIOS!!
	config.headers = storedToken && { Authorization: `Bearer ${storedToken}` };

	return config;
});
export default httpC;