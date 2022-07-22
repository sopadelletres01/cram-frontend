import React, { createContext, useContext, useState } from 'react';
import { AuthContext, AuthContextProvider } from './AuthContext';

const GlobalContext = createContext();

export function GlobalContextProvider(props) {
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
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
  return { theme, toggleTheme, loading, setLoading, error, setError };
};
