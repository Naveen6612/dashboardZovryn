import { Request, Response } from "express";
import { Transaction } from "../models/transaction";
import mongoose from "mongoose";

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const newTransaction = new Transaction(req.body);

    await newTransaction.save();

    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    // validate Mongo ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    await Transaction.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};
