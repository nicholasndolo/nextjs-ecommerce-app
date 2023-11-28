import mongoose from 'mongoose'

// const configOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }


// const connectToDB = async () => {

//   const connectionUrl = "mongodb+srv://nickndolo95:1234562023@cluster0.pvggjdt.mongodb.net/"
  
//   mongoose.connect(connectionUrl).then(() => console.log("Database connected successfully !")).catch(() => console.log(`Getting error from DB connection`))
// }

// export default connectToDB

const MONGODB_URI = "mongodb+srv://nickndolo95:1234562023@cluster0.pvggjdt.mongodb.net/";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with a failure code
  }
};

export default connectDB;
