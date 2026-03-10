import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_MONGO);
    console.log("MongoDB connected successfully");
  }
    catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};