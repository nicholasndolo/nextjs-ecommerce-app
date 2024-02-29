import mongoose from 'mongoose'

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}


const connectToDB = async () => {
  
 const connectionUrl = process.env.MONGODB_URI

  
  await mongoose.connect(connectionUrl).then(() => console.log("Database connected successfully !")).catch(() => console.log(`Getting error from DB connection`))
}

export default connectToDB

