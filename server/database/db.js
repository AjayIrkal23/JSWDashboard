import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const Connection = async () => {
  try {
    await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db Connected Sucessfully");
  } catch (err) {
    console.log(err.message);
  }
};

export default Connection;
