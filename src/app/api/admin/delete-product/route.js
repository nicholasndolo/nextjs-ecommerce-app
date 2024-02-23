
import { NextResponse } from 'next/server';
import  connectToDB  from '@/database';
import Product from '@/models/product';
import AuthUser from '@/middleware/AuthUser';

export const dynamic = "force-dynamic";


export async function DELETE(req) {
  try {
    await connectToDB()

    const isAuthUser = await AuthUser(req)

    if(isAuthUser?.role === "admin") {
      const {searchParams} = new URL(req.url)
    const id = searchParams.get('id')

    if(!id) return NextResponse({success: false, message: 'Product ID is required'})

    const deletedProduct = await Product.findByIdAndDelete(id)

    if(deletedProduct){
      return NextResponse.json({
        success: true,
        message: 'Product deleted successfully'
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to delete product ! Please try again',
      })
    }
    } else{
      return NextResponse.json({
        success: false,
        message: 'You are not authorized to perform this action'
      })
    }

    

  } catch (e) {
    console.log(e)
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later"
    })
  }
}