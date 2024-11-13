import mongoose from "mongoose";
import dotenv from "dotenv"

const connectDB = async () => {
  dotenv.config();
  try {
    const URI: string | undefined = process.env.MONGODB_URI;
    console.log(process.env.MONGODB_URI);
    
    if (!URI) {
      throw new Error("No mongo URI");
    }
    const conn = await mongoose.connect(URI);
    console.log(`Mongo Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`${error}`);
  }
};

export default connectDB;