import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  type: String,
  category: String,
  date: String,
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
