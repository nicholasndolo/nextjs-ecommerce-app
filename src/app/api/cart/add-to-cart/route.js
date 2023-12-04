
import { NextResponse } from 'next/server';
import { connectToDB } from '@/database';
import AuthUser from '@/middleware/AuthUser';
import Joi from 'joi';
import Product from '@/models/product';
import Cart from '@/models/cart';

const AddToCart = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),

})


export const dynamic = "force-dynamic"

export async function POST(req) {

  try {
    await connectToDB()
    const isAuthUser = await AuthUser(req)

    if(isAuthUser) {
      const data = await req.json()
      const { productID, userID} = data

      const { error } = AddToCart.validate({userID, productID})

      if(error){
        return NextResponse.json({
          success: false,
          message: error.details[0].message
        })
      }

      const isCurrentCartItemAlreadyExists = await Cart.findOne({ productID: productID,
        useID: userID
       })

      if(isCurrentCartItemAlreadyExists) {
        return NextResponse.json({
          success: false,
          message: "Product is already added in cart"
        })
      }

      const saveProductToCart = await Cart.create(data)

      if(saveProductToCart){
        return NextResponse.json({
          success: true,
          message: "Product added to cart !"
        })
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to add product to cart ! Please try again."
        })
      }

    } else {
      return NextResponse.json({
        success: false,
        message: "You are not logged in",
      })
    }


  } catch(err) {
    console.error(err)

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again"
    }) 
  }
}