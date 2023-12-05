import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const Connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db Connected Sucessfully");
  } catch (err) {
    console.log(err.message);
  }
};

export default Connection;
