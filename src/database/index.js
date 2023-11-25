import mongoose from 'mongoose'

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const connectToDB = async () => {

  const connectionUrl = "mongodb+srv://nickndolo95:1234562023@cluster0.pvggjdt.mongodb.net/"
  
  mongoose.connect(connectionUrl, configOptions).then(() => console.log("Database connected successfully !")).catch(() => console.log(`Getting error from DB connection`))
}

export default connectToDB