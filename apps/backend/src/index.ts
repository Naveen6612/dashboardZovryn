import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./db";
import TransactionRoutes from "./routes/transaction";
import cors from "cors";

connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use("/transactions", TransactionRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
