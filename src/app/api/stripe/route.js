
import { NextResponse } from 'next/server';
import Checkout from '../../checkout/page';
import AuthUser from '@/middleware/AuthUser';

const stripe = require('stripe')('paste-stripe-secret-key-here');

export const dynamic = "force-dynamic"

export async function POST(req){
  try{
    const isAuthUser = await AuthUser(req)
    if(isAuthUser){
      const res = await res.json()

      const session = await stripe.Checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: 'payment',
        success_url: 'http://localhost:300/checkout' + '?status=success',
        cancel_url: 'http://localhost:300/checkout' + '?status=cancel'
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