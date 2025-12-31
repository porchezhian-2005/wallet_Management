import express from "express";
import { checkoutWithWallet } from "../controllers/paymentController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/checkout", verifyToken, checkoutWithWallet);

export default router;
