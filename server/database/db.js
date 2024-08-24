import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017";

/**
 * Establish connection to MongoDB using Mongoose.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

/**
 * Gracefully close the MongoDB connection on process termination.
 */
const handleExit = () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed due to application termination");
    process.exit(0);
  });
};

// Listen for termination signals to gracefully shut down
process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);

export default connectDB;
