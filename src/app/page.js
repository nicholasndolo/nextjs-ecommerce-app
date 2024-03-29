'use client'
import { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '@/context'
import { getAllAdminProducts } from '@/services/product'
import { useRouter } from 'next/navigation'


export default function HomePage() {
  const { isAuthUser } = useContext(GlobalContext)
 const [products, setProducts] = useState([])
 const router = useRouter()

 async function getListOfProducts() {
  const res = await getAllAdminProducts()

  console.log("res", res)

  if(res.success){
    setProducts(res.data)
  }
 }

 useEffect(() =>{
  getListOfProducts()
 }, [])
//  console.log(products)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <section>
      <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
        <div className='mr-auto place-self-center lg:col-span-7'>
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">Best Fashion Collection
          </h1>
          <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl'>Quisquemos sodales suscipit tortor ditaemcos condimentum de cosmo
          lacus meleifend menean diverra loremous.</p>
          <button
          type="button"
          onClick={() => router.push('/product/listing/all-products')}
          className='mt-1.5 inline-block bg-green-500 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'
          >
            Explore Shop Collection
          </button>

        </div>
        <div className='hidden lg:mt-0 lg:col-span-5 lg:flex'>
          <img
            src=""
            alt="Explore Shop Collection"
          />
        </div>
      </div>
      <div className='max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch'>
          <div className='grid p-6 bg-gray-100 rounded place-content-center sm:p-8'>
            <div className='max-w-md mx-auto text-center lg:tetx-left'>
              <div className=''>
                <h2 className='text-xl font-bold text-gray-900 sm:text-3xl'>Summer Sale Collection</h2>
              </div>
             <button
             onClick={() => router.push('/product/listing/all-products')} 
             className='mt-1.5 inline-block bg-green-500 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'
             >
              Shop All
             </button>
            </div>
          </div>
          <div className='lg:col-span-2 lg:py-8'>
            <ul className='grid grid-cols-2 gap-4'>
              {
                products && products.length ?
                products.filter(item => item.onSale === 'yes').splice(0,2).map(productItem => (
                  <li 
                  className='cursor-pointer' 
                  key={productItem._id}
                  onClick={() => router.push(`/product/${productItem._id}`)}
                  >
                    <div>
                      <img
                        src={productItem.imageUrl}
                        alt="Sale Product item"
                        className='object-cover w-full rounded aspect-square'
                      />
                    </div>
                    <div className='mt-3'>
                      <h3 className='font-medium text-gray-900'>{productItem.name}</h3>
                      <p className='mt-1 text-sm text-gray-800'>${productItem.price} <span className='text-red-700'>{`(-${productItem.priceDrop}%)off`}</span></p>
                    </div>
                  </li>
                ))
                 : null
              }
            </ul>
          </div>
        </div>
      </div>
      <div className='max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-xl font-bold text-gray-950 sm:text-3xl'>SHOP BY CATEGORY</h2>
        </div>
        <ul className='grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3'>
          <li>
            <div className='relative block group'>
              <img
               src=""
               className='object-cover w-full aspect-square'
              />
              <div className='absolute inset-0 flex flex-col items-start justify-end p-6'>
                <h3 className='text-xl font-medium text-white'>KIDS</h3>
                <button
                onClick={() => router.push('/product/listing/kids')}  
                className='mt-1.5 inline-block bg-green-500 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'>Shop Now</button>

              </div>
            </div>
          </li>
          <li>
            <div className='relative block group'>
              <img
               src=""
               className='object-cover w-full aspect-square'
              />
              <div className='absolute inset-0 flex flex-col items-start justify-end p-6'>
                <h3 className='text-xl font-medium text-white'>WOMEN</h3>
                <button
                onClick={() => router.push('/product/listing/women')}  
                className='mt-1.5 inline-block bg-green-500 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'>Shop Now</button>

              </div>
            </div>
          </li>
          <li className='lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1'>
            <div className='relative block group'>
              <img
               src=""
               className='object-cover w-full aspect-square'
              />
              <div className='absolute inset-0 flex flex-col items-start justify-end p-6'>
                <h3 className='text-xl font-medium text-white'>MEN</h3>
                <button
                onClick={() => router.push('/product/listing/men')} 
                className='mt-1.5 inline-block bg-green-500 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'>Shop Now</button>

              </div>
            </div>
          </li>

        </ul>
         
      </div>
     </section>
    </main>
  )
}
