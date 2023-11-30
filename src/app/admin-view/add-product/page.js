"use client"

import InputComponent from "@/components/FormElements/InputComponent"
import SelectComponent from "@/components/FormElements/SelectComponent"
import TileComponent from "@/components/FormElements/TileComponent"
import ComponentLevelLoader from "@/components/Loader/componentLevel"
import Notification from "@/components/Notification"
import { GlobalContext } from "@/context"
import { addNewProduct, updateProduct } from "@/services/product"
import { AvailableSizes, adminAddProductformControls, firebaseConfig, firebaseStroageURL } from "@/utils"
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { toast } from "react-toastify";

const app = initializeApp(firebaseConfig)
const storage = getStorage(app, firebaseStroageURL ) 

const createUniqueFileName = (file) => {
  const timestamp = Date.now()
  const randomStringValue = Math.random().toString(36).substring(2,12)

  return `${getFile.name}-${timestamp}-${randomStringValue}`
}

async function helperForUploadingImageToFirebase(file){
  const getFileName = createUniqueFileName(file)
  const storageReference = ref(storage, `ecommerce/${getFileName}}` )

  const uploadImage = uploadBytesResumable(storageReference, file)

  return new Promise((resolve, reject) => {
    uploadImage.on('state_changed', (snapshot)=> {}, (error)=>{
      console.log(error)
      reject(error)
    }, () => {
      getDownloadURL(uploadImage.snapshot.ref).then(downloadUrl => resolve(downloadUrl)).catch(error => reject(error))
    } )
  })

}

const initialFormData = {
  name: '',
  price: 0,
  description: '',
  category: 'men',
  sizes: [],
  deliveryInfo: '',
  onSale: 'no',
  imageUrl: '',
  priceDrop: 0
}

export default function AdminAddNewProduct (){

  const [formData,setFormData] = useState(initialFormData)

  const { 
    componentLevelLoader, 
    setComponentLevelLoader, 
    currentUpdatedProduct, 
    setCurrentUpdatedProduct
  } = useContext(GlobalContext)

  console.log(currentUpdatedProduct)

  const router = useRouter()

  useEffect(() => {
    if(currentUpdatedProduct !== null) setFormData(currentUpdatedProduct)
    
  }, [currentUpdatedProduct])

  async function handleImage(event){
    console.log(event.target.files)

    const extractImageUrl = await helperForUploadingImageToFirebase(event.target.files[0])

    console.log(extractImageUrl)

    if(extractImageUrl !== "") {
      setFormData({
        ...formData, imageUrl: extractImageUrl,
      })
    }
  }

  console.log(formData)

  function handleTileClick(getCurrentItem){
    // console.log(getCurrentItem)

    let sizesCopy = [...formData.sizes]
    const index = sizesCopy.findIndex(item => item.id === getCurrentItem.id)

    if(index === -1){
      sizesCopy.push(getCurrentItem)
    } else {
      sizesCopy = sizesCopy.filter(item => item.id !== getCurrentItem.id)
    }

    setFormData({
      ...formData, sizes: sizesCopy
    })
  }

  async function handleAddProduct() {
    setComponentLevelLoader({loading: true, id: ''})
    const res = currentUpdatedProduct !== null
     ? await updateProduct(formData)
     :  await addNewProduct(formData)

    console.log(res)

    if(res.success) {
      setComponentLevelLoader({loading: false, id: ''})
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT
      })
      setFormData(initialFormData)
      setCurrentUpdatedProduct(null)

      setTimeout(() => {
        router.push('/admin-view/all-products')
      }, 1000)
    } else{
      setComponentLevelLoader({loading: false, id: ''})
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT
      })

      setFormData(initialFormData)
    }
  }
  return (
    <div className="w-full mt-5 mx-0 mb-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative ">
        <div className="w-full mt-6 mx-0 mb-0 space-y-8 ">
          <input
          accept="image/*"
          max="1000000"
          type="file"
          onChange={handleImage}
          />

          <div className="flex gap-2 flex-col">
            <label>Available sizes</label>
            <TileComponent
            selected={formData.sizes}
            onTileClick={handleTileClick}
            data={AvailableSizes}
            />
          </div>
           { adminAddProductformControls.map(controlItem => controlItem.componentType === 'input' ? (
            <InputComponent
            type={controlItem.type}
            placeholder={controlItem.placeholder}
            label={controlItem.label}
            value={formData[controlItem.id]}
            onChange={(event) => {
              setFormData({
                ...formData, [controlItem.id]: event.target.value
              })
            }}
             />
            ) :
            controlItem.componentType === 'select' ? (
            <SelectComponent
             label={controlItem.label}
             options={controlItem.options}
             value={formData[controlItem.id]}
            onChange={(event) => {
              setFormData({
                ...formData, [controlItem.id]: event.target.value
              })
            }}
            />
            ):null
            )}
            <button
             onClick={handleAddProduct}
             className="inline-flex  w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide">
             {
              componentLevelLoader && componentLevelLoader.loading ?( 
              <ComponentLevelLoader
                text={currentUpdatedProduct !== null ? 'Updating Product':'Adding Product'}
                color={"#ffffff"}
                loading={componentLevelLoader && componentLevelLoader.loading}
              /> 
            ) : currentUpdatedProduct !== null ? (
              'Update Product'
            ) : (
              'Add Product'
            )}
            </button>
        </div>

      </div>
      <Notification />
    </div>
  )
}