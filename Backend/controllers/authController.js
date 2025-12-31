
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateReferralCode } from "../utils/referralCodeGenerator.js";
import { applyReferralRewards } from "../services/referralService.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newReferralCode = generateReferralCode();

  
    const user = await User.create({
      name,
      email,
      password: hashedPass,
      referralCode: newReferralCode
    });

    await applyReferralRewards(referralCode, user._id);


    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      referralCode: user.referralCode,
      createdAt: user.createdAt
    };

    res.status(201).json({
      message: "Signup successful",
      user: userResponse
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};



export const viewProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("_id name email role referralCode createdAt");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile fetched successfully",
      user
    });

  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: error.message });
  }
};