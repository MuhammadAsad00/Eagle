import express from "express";
import { 
  adminLogin, 
  adminLogout, 
  login, 
  logout, 
  register 
} from "../controller/authController.js";

const authRoute = express.Router();

// Default route — helps avoid "Cannot GET /api/auth"
authRoute.get("/", (req, res) => {
  res.json({ message: "Auth API Working" });
});

// User Authentication
authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.get("/logout", logout);

// Admin Authentication
authRoute.post("/adminlogin", adminLogin);
authRoute.get("/adminlogout", adminLogout);

export default authRoute;
