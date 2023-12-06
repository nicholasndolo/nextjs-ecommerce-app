'use client'

import CommonCart from "@/components/CommonCart"
import { GlobalContext } from "@/context"
import { deleteFromCart, getAllCartItems } from "@/services/cart"
import { useContext, useEffect } from "react"
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function Cart(){

  const { user, cartItems, setCartItems, pageLevelLoader, setPageLevelLoader, setComponentLevelLoader, componentLevelLoader } = useContext(GlobalContext)


  async function extractAllCartItems() {
    setPageLevelLoader(true)
    const res = await getAllCartItems(user?._id)

    if(res.success){
      setCartItems(res.data)
      setPageLevelLoader(false)
      localStorage.setItem('cartItems', JSON.stringify(res.data))
    }
    // console.log(res)

  }
  useEffect(() => {
    if(user !== null) extractAllCartItems()


  },[user])

  async function  handleDeleteCartItem(cartItemId) {

    setComponentLevelLoader({loading: true, id: cartItemId})
    const res = await deleteFromCart(cartItemId)
  
    if(res.success){
      setComponentLevelLoader({loading: false, id: ''})
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT
      })
  
      extractAllCartItems()
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT
      })
      setComponentLevelLoader({loading: false, id: ''})
    }
  }

  if(pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={'#000000'}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
       />
      </div>
    )
  }
  return (
   <CommonCart 
    componentLevelLoader={componentLevelLoader}
    cartItems={cartItems} 
    handleDeleteCartItem={handleDeleteCartItem}
    />
  )
}