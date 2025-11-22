import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/db.js';
import authRoute from '../routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import productRoute from '../routes/productRoutes.js';
import userRoute from '../routes/userRoutes.js';
import cartRoute from '../routes/cartRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://eagle-front-alpha.vercel.app",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);

app.get("/", (req, res) => {
  res.send("WELLCOME TO EAGLE API - DB Connection Attempted");
});

// Connect DB once
connectDB();

// 🚀 REQUIRED FOR VERCEL SERVERLESS
export default (req, res) => app(req, res);
