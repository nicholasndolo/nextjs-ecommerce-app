
import { NextResponse } from 'next/server';
import AuthUser from '@/middleware/AuthUser';

const stripe = require('stripe')('sk_test_51OlUFEE20DgbBm66fT0h9STrbEg68yXGKzI0YCvcArDLsQ8SoBUePh9pL2ePfbfrkrs2H1N4BhI2nYVqzISgAvLK003IdeB1mc');

export const dynamic = "force-dynamic"

export async function POST(req){
  try{
    const isAuthUser = await AuthUser(req)
    if(isAuthUser){
      const res = await req.json()

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: 'payment',
        success_url: 'http://localhost:3000/checkout' + '?status=success',
        cancel_url: 'http://localhost:3000/checkout' + '?status=cancel'
      })
  
      return NextResponse.json({
        success: true,
        id: session.id
      })

    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated'
      })
    }

  } catch(e){
    console.log(e)
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Something went wrong ! Please try again'
    })
  }
}