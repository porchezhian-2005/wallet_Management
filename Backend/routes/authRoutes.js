
import express from "express";
import { signup, login, viewProfile } from "../controllers/authController.js";
import { validateSignup, validateLogin } from "../validations/authValidation.js";
import { validationResult } from "express-validator";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) 
    return res.status(400).json({ errors: errors.array() });
  next();
};

router.post("/signup", validateSignup, validate, signup);
router.post("/login", validateLogin, validate, login);
router.get("/profile", verifyToken, viewProfile);

export default router;