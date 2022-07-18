import axios from "axios";
let url = process.env.REACT_APP_SERVER_ADDRESS
console.log("url", url)
const httpC= axios.create({
    baseURL: url,
    header:{
        "Content-Type": "application/json",
    }
    
});
export default httpC;