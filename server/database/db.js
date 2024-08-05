import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default Connection;
