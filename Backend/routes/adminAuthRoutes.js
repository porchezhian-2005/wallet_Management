import express from "express";
import { adminSignup, adminLogin, adminProfile } from "../controllers/adminAuthController.js";
import { validateAdminSignup } from "../validations/adminValidation.js";
import { validationResult } from "express-validator";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { ensureAdmin } from "../middlewares/adminMiddleware.js";


import { updateWalletPercent, getWalletPercent } from "../controllers/walletConfigController.js";

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post("/signup", validateAdminSignup, validate, adminSignup);

router.post("/login", adminLogin);

router.get("/profile", verifyToken, ensureAdmin, adminProfile);

router.patch("/wallet-config", verifyToken, ensureAdmin, updateWalletPercent);

router.get("/wallet-config", verifyToken, ensureAdmin, getWalletPercent);

export default router;
