"use client"
import Cookies from 'js-cookie'
import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext(null)

export default function GlobalState({ children }){
  const [showNavModal, setShowNavModal] = useState(false);
  const [pageLevelLoader, setPageLevelLoader] = useState(true);
  const [componentLevelLoader, setComponentLevelLoader] = useState({loading: false, id: ''});
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [addressFormData, setAddressFormData] = useState({
    fullName: '',
    city: '',
    country: '',
    postalCode: '',
    address: '',
  });

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
      setComponentLevelLoader,
      currentUpdatedProduct, 
      setCurrentUpdatedProduct,
      showCartModal,
      setShowCartModal,
      cartItems,
      setCartItems,
      addresses, 
      setAddresses,
      addressFormData, 
      setAddressFormData,
      }}
    >
      { children }
    </GlobalContext.Provider>
  )
}