import User from "../models/User.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genAdminToken, genToken } from "../config/token.js";

// =============================== REGISTER ===============================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid email" });

    if (password.length < 6)
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Register error: ${error.message}` });
  }
};

// =============================== LOGIN ===============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Login error: ${error.message}` });
  }
};

// =============================== LOGOUT ===============================
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return res.status(200).json({ message: "Logged out" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Logout error: ${error.message}` });
  }
};

// =============================== ADMIN LOGIN ===============================
export const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = genAdminToken(email);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({ token });
    }

    return res.status(400).json({ message: "Invalid admin credentials" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Admin login error: ${error.message}` });
  }
};

// =============================== ADMIN LOGOUT ===============================
export const adminLogout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return res.status(200).json({ message: "Admin logged out" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Admin logout error: ${error.message}` });
  }
};
