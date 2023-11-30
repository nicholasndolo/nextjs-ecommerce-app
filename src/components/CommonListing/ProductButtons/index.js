'use client'

import ComponentLevelLoader from "@/components/Loader/componentLevel"
import { GlobalContext } from "@/context"
import { deleteProduct } from "@/services/product"
import { usePathname, useRouter } from "next/navigation"
import { useContext } from "react"
import { toast } from 'react-toastify';


export default function ProductButton({item}){

  const pathName = usePathname()

  const { setCurrentUpdatedProduct, setComponentLevelLoader,   componentLevelLoader } = useContext(GlobalContext)

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
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT
      })
      setComponentLevelLoader({loading: false, id: ''})

    }
  }
  return (
    
      isAdminView ?
       <>
        <button 
        onClick={() => {
          setCurrentUpdatedProduct(item)
          router.push('/admin-view/add-product')
        }}
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide"
        >
          Update
        </button>
         <button 
          onClick={()=> handleDeleteProduct(item)}
          className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide"
        >
          {
              componentLevelLoader &&   componentLevelLoader.loading && item._id ===   componentLevelLoader.id ? (
              <ComponentLevelLoader
              text={'Deleting Product'}
              color={"#ffffff"}
              loading={componentLevelLoader && componentLevelLoader.loading}
              />
              ): (
                'DELETE'
                )}
       
        </button>
       </> : 
       <>
        <button
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide"
        >
        Add To Cart
        </button>
       </>
    
  )
}

