import connectToDB from "@/database"
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'


const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export const dynamic = "force-dynamic"

export async function POST(req){
  await connectToDB();

  const { email, password } = await req.json();

  const { error } = schema.validate({email, password})

  if(error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message
    })
  }

  try {
    const isUser = await User.findOne({email})
    console.log(isUser)
    if(!isUser){
      return NextResponse.json({
        success: false,
        message: "Account doesn't exist"
      })
    }
    const checkPassword = await compare(password, isUser.password)

    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "Incorrect password. Please try again !"
      })
    }

    const token = jwt.sign({
      id: isUser._id, email: isUser?.email, role: isUser?.role
    }, 'default_secret_key', {expiresIn: '1d'})

    const finalData = {
      token,
      user: {
        email: isUser.email,
        name: isUser.name,
        _id: isUser._id,
        role: isUser.role
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful!',
      finalData
    })
  }

  catch(err) {
    console.log(err)

    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later'
    })
  }

}