import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { 
  walletBalance, 
  creditWallet, 
  debitWallet,
  walletHistory              
} from "../controllers/walletController.js";

const router = express.Router();

router.get("/balance", verifyToken, walletBalance);

router.post("/credit", verifyToken, creditWallet);

router.post("/debit", verifyToken, debitWallet);

router.get("/history", verifyToken, walletHistory);

export default router;
