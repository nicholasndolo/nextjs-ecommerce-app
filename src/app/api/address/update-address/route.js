
import { NextResponse } from 'next/server';
import connectToDB from '@/database';
import AuthUser from '@/middleware/AuthUser';
import Address from '@/models/address';

export const dynamic = "force-dynamic";

export async function PUT(req){
  try {
    await connectToDB()

    const isAuthUser = AuthUser(req)
    if(isAuthUser) {
      const data = await req.json();
    
    const { _id, fullName, city, address, county, postalCode } = data
    
    const updatedAddress = await Address.findOneAndUpdate({
      _id: _id
    }, {fullName, city, address, county, postalCode}, {new: true})


    if(updatedAddress) {
      return NextResponse.json({
        success: true,
        message: "Address updated successfully"
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to update address ! Please try again"
      })
    }

    } else{
      return NextResponse.json({
        success: false,
        message: "You are not authenticated"
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