import express from "express"
import isAuth from './../middleware/isAuth.js';
import { getAdmin, getCurrentUser } from "../controller/userController.js";
import adminAuth from "../middleware/adminAuth.js";

const userRoute = express.Router();

userRoute.get("/getcurrentuser",isAuth,getCurrentUser);
userRoute.get("/getadmin",adminAuth,getAdmin);

export default userRoute;