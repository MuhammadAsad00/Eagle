import express from "express";
import { adminLogin, adminLogout, login, logout, register } from "../controller/authController.js";

const authRoute = express.Router();

authRoute.post("/register",register);
authRoute.post("/login",login);
authRoute.get("/logout",logout);
authRoute.post("/adminlogin", adminLogin);
authRoute.get("/adminLogout", adminLogout);


export default authRoute;