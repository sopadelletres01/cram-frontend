import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router';
import AuthService from '../../services/auth.service';
import { useLocation } from 'react-router-dom';
import { useGlobalState } from './GlobalContext';
const AuthContext = createContext();

const AuthContextProvider = props => {
  const { error, setError } = useGlobalState();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    verifyStoredToken();
  }, []);

  const login = async token => {
    localStorage.setItem('authToken', token);
    const userData = await verifyStoredToken();
    //Check if user is admin
    if(userData.isAdmin) return navigate('/admin');
    return navigate('/user');
  };

  const logout = async () => {
    // your logout logic
    localStorage.removeItem('authToken');

    // Update the state variables
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
    navigate('/login');
  };

  const verifyStoredToken = async () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      try {
        const response = await AuthService.userIsAuth(storedToken);
        setUser(response.data);
        setIsAdmin(response.data.isAdmin)
        setIsLoggedIn(true);
        return response.data;
      } catch (e) {
        setError(e);
        setIsLoggedIn(false);
        setUser(null);
        setError(e);
      }
    } else {
      // If the token is not available
    }
  };
  return <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isAdmin }}>{props.children}</AuthContext.Provider>;
};

function useAuth() {
  const { isLoggedIn, user, login, logout, isAdmin } = useContext(AuthContext);
  return { isLoggedIn, user, login, logout, isAdmin };
}

export { AuthContext, AuthContextProvider, useAuth };
