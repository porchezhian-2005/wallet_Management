import { body } from "express-validator";

export const validateAdminSignup = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("phone")
    .isMobilePhone().withMessage("Valid phone number required"),
  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];
