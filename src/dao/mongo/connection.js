import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI;

export const initMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGODB_CONNECTION_URI);
    console.log("💾 DB connected successfully!");
  } catch (error) {
    console.log("⚙ DB connection error: " + error);
  }
};
