'use client'
import { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '@/context'


export default function Home() {
  const { isAuthUser } = useContext(GlobalContext)
  console.log(isAuthUser)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <h2>Ecommerce</h2>
    </main>
  )
}
