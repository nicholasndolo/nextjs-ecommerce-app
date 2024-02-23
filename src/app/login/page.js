'use client'
import { useRouter } from 'next/navigation'
import { useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { toast } from "react-toastify";


import InputComponent from "@/components/FormElements/InputComponent"
import { loginFormControls } from "@/utils"
import { login } from '@/services/login'
import { GlobalContext } from '@/context'
import ComponentLevelLoader from '@/components/Loader/componentLevel'
import Notification from '@/components/Notification'



const initialFormData = {
  email: '',
  password: ''
}


export default function Login(){
  const [formData, setFormData] = useState(initialFormData)

  const { 
    isAuthUser, 
    setIsAuthUser,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader
  } = useContext(GlobalContext)

  const router = useRouter()


  function isValidForm(){
    return formData && formData.email && formData.email.trim() !== '' && formData.password && formData.password.trim() !== '' ? true : false
  }

  async function handleLogin(){
    setComponentLevelLoader({loading: true, id: ''})
    const res = await login(formData)
    console.log(res)

    if(res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(true)
      setUser(res?.finalData?.user)
      setFormData(initialFormData)
      Cookies.set('token', res?.finalData?.token)
      localStorage.setItem('user',JSON.stringify(res?.finalData?.user))
      setComponentLevelLoader({loading: false, id: ''})

    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(false)
      setComponentLevelLoader({loading: false, id: ''})
    }

  }

  console.log(formData)
  console.log(isAuthUser, user)

  useEffect(() => {
    if(isAuthUser)router.push('/')
  },[isAuthUser] )

  return (
    <div className=" relative bg-white">
      <div className="flex flex-col items-center justify-between py-0 px-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full px-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-10 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start py-10 px-10 bg-white shadow-2 xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                Login
              </p>
                    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                      { loginFormControls.map(controlItem => 
                         controlItem.componentType === "input" ? (
                        <InputComponent
                          type={controlItem.type}
                          placeholder={controlItem.placeholder}
                          label={controlItem.label}
                          value={formData[controlItem.id]}
                          onChange={(event) =>{
                            setFormData({...formData,[controlItem.id]: event.target.value })
                          }}
                        />
                         ): null
                      )}
                      <button
                        onClick={handleLogin}
                        disabled= {!isValidForm()}
                        className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-green-500 px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                      >
                        {componentLevelLoader && componentLevelLoader.loading? (
                          <ComponentLevelLoader
                          text={"Logging In"}
                          color={"#ffffff"}
                          loading={componentLevelLoader && componentLevelLoader.loading}
                          />
                        ): (
                          "Login"
                        )}
                      </button>
                      <div className="flex flex-col gap-2">
                        <p>Don't have an account ?</p>
                        <button
                        onClick={() => router.push('/register')}
                        className="inline-flex w-full items-center justify-center bg-green-500 px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                      >
                        Register
                      </button>
                      </div>
                    </div>
            </div>
          </div>
        </div>
      </div>
      <Notification/>
    </div>
  )
}