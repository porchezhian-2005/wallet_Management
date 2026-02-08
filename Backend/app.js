import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* 🔹 Test route to confirm server is running */
app.get("/api/test", (req, res) => {
  res.json({
    status: "success",
    message: "Wallet API is running "
  });
});

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Wallet Service is ready to go"
  });
});

/* 🔹 Routes */
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/payment", paymentRoutes);

export default app;
