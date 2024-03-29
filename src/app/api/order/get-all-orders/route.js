
import { NextResponse } from 'next/server';
import connectToDB from '@/database';
import AuthUser from '@/middleware/AuthUser';
import Order from '@/models/order';


export const dymanic = "force-dynamic"


export async function GET(req){
  try{
    await connectToDB()
    const isAuthUser = await AuthUser(req)

    if(isAuthUser){
      const { searchParams } = new URL(req.url)
      const id = searchParams.get('id')

      const extractAllOrders = await Order.find({user: id}).populate('orderItems.product')

      if(extractAllOrders){
        return NextResponse.json({
          success: true,
          data: extractAllOrders
        })
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to get orders ! Please try again"
        })
      }

    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated"
      })
    }

  } catch(e){
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again"
    })
  }
}