"use client"
import Cookies from 'js-cookie'
import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext(null)

export default function GlobalState({ children }){
  const [showNavModal, setShowNavModal] = useState(false);
  const [pageLevelLoader, setPageLevelLoader] = useState(false);
  const [componentLevelLoader, setComponentLeveLoader] = useState({loading: false, id: ''});
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(Cookies.get('token') !== undefined) {
      setIsAuthUser(true)
      const userData = JSON.parse(localStorage.getItem('user')) || {}
      setUser(userData)
    } else {
      setIsAuthUser(false)
    }
  }, [Cookies])
  return(
    <GlobalContext.Provider
     value={{
      pageLevelLoader,
      setPageLevelLoader,
      showNavModal,
      setShowNavModal, 
      isAuthUser, 
      setIsAuthUser,
      user,
      setUser,
      componentLevelLoader,
      setComponentLeveLoader
      }}
    >
      { children }
    </GlobalContext.Provider>
  )
}