import { body } from "express-validator";


export const validateSignup = [
  body("name")
    .notEmpty()
    .withMessage("Name required"),

  body("email")
    .trim()
    .toLowerCase()
    .custom((value) => {
      if (!value.includes("@")) {
        throw new Error("Email must contain '@' symbol");
      }
      return true;
    })
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .isLength({ min: 10, max: 10 })
    .withMessage("Password must be exactly 10 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z]).{10}$/)
    .withMessage("Password must contain at least 1 uppercase and 1 lowercase letter"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password required"),
];