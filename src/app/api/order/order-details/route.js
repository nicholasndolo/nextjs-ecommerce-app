
import { NextResponse } from 'next/server';
import connectToDB from '@/database';
import AuthUser from '@/middleware/AuthUser';
import Order from '@/models/order';


export const dynamic = "force-dynamic"

export async function GET(req){
  try{
    await connectToDB()
    const isAuthUser = await AuthUser(req)
    console.log("isAuthUserOd:", isAuthUser)

    if(isAuthUser){
      const { searchParams } = new URL(req.url)
      const id = searchParams.get('id')
      console.log("ID:", id)

      if(!id){
        return NextResponse.json({
          success: false,
          message:"Product ID is required"
        })
      }

      const extractOrderDetails = await Order.findById(id).populate('orderItems.product')

      if(extractOrderDetails){
        return NextResponse.json({
          success: true,
          data: extractOrderDetails
        })
      } else{
        return NextResponse.json({
          success: false,
          message: "Failed to get order details ! Please try again"
        })
      }

    } else{
      return NextResponse.json({
        success: false,
        message: "You are not authenticated"
      })
    }

  } catch(e){
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later"
    })
  }
}