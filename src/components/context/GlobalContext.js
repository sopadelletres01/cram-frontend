import React, { createContext, useContext, useState,useEffect } from 'react';
import { AuthContext, AuthContextProvider } from './AuthContext';

const GlobalContext = createContext();

export function GlobalContextProvider(props) {
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return <GlobalContext.Provider value={{ theme, toggleTheme, loading, setLoading, error, setError }}>{props.children}</GlobalContext.Provider>;
}

export const useGlobalState = () => {
  const { theme, toggleTheme, loading, setLoading, error, setError } = useContext(GlobalContext);
  useEffect(()=>{

  },[loading])

  return { theme, toggleTheme, loading, setLoading, error, setError };
};
