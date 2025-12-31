import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
   

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/payment", paymentRoutes);

export default app;
