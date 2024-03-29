'use client'

import ComponentLevelLoader from "@/components/Loader/componentLevel"
import { GlobalContext } from "@/context"
import { addToCart } from "@/services/cart"
import { deleteProduct } from "@/services/product"
import { usePathname, useRouter } from "next/navigation"
import { useContext } from "react"
import { toast } from 'react-toastify';


export default function ProductButton({item }){

  const pathName = usePathname()

  const { 
    setCurrentUpdatedProduct, 
    setComponentLevelLoader,  
    componentLevelLoader, 
    user, 
    showCartModal, 
    setShowCartModal
  } = useContext(GlobalContext)

  const router = useRouter()
  
  const isAdminView = pathName.includes("admin-view")

  async function handleDeleteProduct(item){
    setComponentLevelLoader({loading: true, id: item._id})
    const res = await deleteProduct(item._id)

    if(res.success) {
      setComponentLevelLoader({loading: false, id: ''})
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT
      })
      router.refresh()
    } else{
      setComponentLevelLoader({loading: false, id: ''})
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT
      })

    }
  }

  async function handleAddToCart(item){
    setComponentLevelLoader({loading: true, id: item._id})
    const res = await addToCart({productID: item._id, userID: user._id})

    if(res.success) {
      toast.success(res.messsage, {
        position: toast.POSITION.TOP_RIGHT,
        
      })
      setComponentLevelLoader({loading: false, id: ''})
      setShowCartModal(true)
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
      setComponentLevelLoader({loading: false, id: ''})
      setShowCartModal(true)

    }

    // console.log(res)
  }
  return (
    
      isAdminView ?
       <>
        <button 
        onClick={() => {
          setCurrentUpdatedProduct(item)
          router.push('/admin-view/add-product')
        }}
        className="mt-1.5 flex w-full justify-center border-2 border-green-500 px-5 py-3 text-xs text-black font-medium uppercase tracking-wide"
        >
          Update
        </button>
         <button 
          onClick={()=> handleDeleteProduct(item)}
          className="mt-1.5 flex w-full justify-center border-2 border-green-500 px-5 py-3 text-xs text-black font-medium uppercase tracking-wide"
        >
          {
              componentLevelLoader && componentLevelLoader.loading && item._id ===   componentLevelLoader.id ? (
              <ComponentLevelLoader
              text={'Deleting Product'}
              color="black"
              loading={componentLevelLoader && componentLevelLoader.loading}
              />
              ): (
                'DELETE'
                )
          }
       
        </button>
       </> : 
       <>
        <button
        onClick={() => handleAddToCart(item)}
        className="mt-1.5 flex w-full justify-center border-2 border-green-500 px-5 py-3 text-xs text-black-500 font-medium uppercase tracking-wide"
        >
        {
          componentLevelLoader && componentLevelLoader.loading && componentLevelLoader.id === item._id
          ? <ComponentLevelLoader
              text={'Adding to cart'}
              color="black"
              loading={componentLevelLoader && componentLevelLoader.loading}
           />
          : ' Add To Cart'
        }
       
        </button>
       </>
    
  )
}

