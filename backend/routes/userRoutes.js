import express from "express";
import isAuth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import { getAdmin, getCurrentUser } from "../controller/userController.js";

const userRoute = express.Router();

// Default route to avoid "Cannot GET /api/user"
userRoute.get("/", (req, res) => {
  res.json({ message: "User API Working" });
});

// Get currently logged-in user
userRoute.get("/getcurrentuser", isAuth, getCurrentUser);

// Get admin dashboard data (protected)
userRoute.get("/getadmin", adminAuth, getAdmin);

export default userRoute;
