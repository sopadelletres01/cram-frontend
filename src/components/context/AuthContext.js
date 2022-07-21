import React, { useState ,useRef,useEffect , createContext,useContext} from 'react';
import { useNavigate } from 'react-router';
import AuthService from '../../services/auth.service';
import {
  useLocation,
} from 'react-router-dom';
const AuthContext = createContext(null)




function useAuth(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUserData]=useState({id:null, email:null, nombre:null})
    const [loading, setLoading] = useState(false)
	const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    //1semana
    const expireTime =  Date.now() + 604800000

    useEffect(() => {
        if ( localStorage.getItem("token") ){
            let resta = JSON.parse(localStorage.getItem('token')).expireTime - new Date()
            let expired = JSON.parse(localStorage.getItem('token')).expireTime - new Date() <= 0
            console.log("EXPIRED",resta )
            console.log("EXPIRED",expired )
            setIsAuthenticated(!expired)
        }
        if ( localStorage.getItem("user") ){
            let data = JSON.parse(localStorage.getItem('user'))
            console.log("DATA",data )
            setUserData(data)
        }
    }, [])

    const setUser = (data) => {
        localStorage.setItem('user',JSON.stringify({...data}))
        setUserData({...data})
    }

    const verifyStoredToken = async () => {
		// Get the stored token from the localStorage
		const storedToken = localStorage.getItem('authToken');

		// If the token exists in the localStorage
		if (storedToken) {
			// We must send the JWT token in the request's "Authorization" Headers
            try {
                const response = await AuthService.userIsAuth(storedToken)
                setUser(response.data);
                setIsLoggedIn(true);
					setLoading(false);
                
            } catch (e) {
                setIsLoggedIn(false);
					setUser(null);
					setLoading(false);
            }
		} else {
			// If the token is not available
			setLoading(false);
		}
	};

    return {
        isAuthenticated,
        isLoggedIn,
        user,
        setUser,
        loading,
        setLoading,
        login (userData,token,remember)  {
            console.log("USERDATA",userData)
            setUserData({...userData})
            // your authentication logic
            setIsAuthenticated(true)
            if( remember ){
                localStorage.setItem("token",JSON.stringify({token,expireTime}))
            }else{
                localStorage.setItem("token",JSON.stringify({token,expireTime:0}))
            }
            localStorage.setItem('user', JSON.stringify(userData))
            const origin = location.state?.from?.pathname || '/user';

            localStorage.setItem('authToken', token);
            verifyStoredToken();
            
            console.log("ORIGIN",origin)
            console.log("LOCATION",location)
            navigate(origin);
        },
        logout ()  {
            // your logout logic
            setIsAuthenticated(false)
            if ( !!localStorage.getItem("token") ){
                localStorage.removeItem("token")
            }
            if ( !!localStorage.getItem("user") ){
                localStorage.removeItem("user")
            }
            localStorage.removeItem('authToken');

            // Update the state variables
            setIsLoggedIn(false);
            setUser(null);
            navigate("/login")
        }
        
    }
}


const AuthContextProvider = (props) => {
    const auth = useAuth();
    return (
        <AuthContext.Provider value={auth}>
           {props.children}
        </AuthContext.Provider>
    )
}
  const AuthConsumer = AuthContext.Consumer

export {
    AuthContext,
    AuthContextProvider,
    useAuth,
    AuthConsumer
}