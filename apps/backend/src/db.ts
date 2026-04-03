import mongoose from "mongoose";

const MONGO_URI = process.env.DB_MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing");
}

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected ");
  } catch (err) {
    console.log("DB error ❌", err);
  }
}
