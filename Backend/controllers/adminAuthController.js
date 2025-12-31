
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminSignup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashedPass = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name, email, phone, password: hashedPass
    });

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Admin login successful", token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const adminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id)
      .select("_id name email phone role createdAt");

    res.json({ message: "Admin profile fetched", admin });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
