import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    console.log(process.env.DATABASE_URL)
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected".cyan);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
