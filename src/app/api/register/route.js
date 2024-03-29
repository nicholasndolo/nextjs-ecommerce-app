import Joi from "joi"
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"
import User from "@/models/user"
import connectToDB from "@/database"



const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required()
})

export const dynamic = 'force-dynamic'


export async function POST(req){
  await connectToDB()

  const { name, email, password, role } = await req.json()

  //validate the schema

  const { error } = schema.validate({ name, email, password, role })

  if(error){
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    })
  }

  try{
    //check if the user exists
    const user = await User.findOne({ email })

    if(user) {
      return NextResponse.json({
        success: false,
        message: "User already exists. Please try with a different email."
      })
    } else {
      const hashPassword = await hash(password, 12)

      const newUser = await User.create({
        name, email, password: hashPassword, role,
      })

      if(newUser) {
        return NextResponse.json({
          success: true,
          message: "Account created successfully !."
        })
      }
    }

  } catch(e){
    console.log("Error in new user registration")

    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again later'
    })
  }
}