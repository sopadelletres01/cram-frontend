import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";


import {useAuth } from "../context/AuthContext";

export default function MainPage() {
  
  const { user } = useAuth();



  return (
    <>
    </>
  );
}
