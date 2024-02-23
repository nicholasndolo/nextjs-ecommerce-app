
import { NextResponse } from 'next/server';
import connectToDB from '@/database';
import Product from '@/models/product';


export const dynamic  = "force-dynamic"

export async function GET(req) {
  try {
    await connectToDB()

    const { searchParams } = new URL(req.url)
    const productId = searchParams.get("id")

    if(!productId){
      return NextResponse.json({
        success: false,
        status: 404,
        message: 'Product id is required'
      })
    }

    const product = await Product.find({_id: productId})

    if(product && product.length) {
      return NextResponse.json({
        success: true,
        data: product[0],
      })
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: 'No product found'
      })
    }

  } catch(error) {
    console.log(error)
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! please try again later",
    })
  }
}