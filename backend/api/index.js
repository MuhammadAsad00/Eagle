import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import connectDB from '../config/db.js'; // NOTE: Adjust path to connectDB if necessary
import authRoute from '../routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import productRoute from '../routes/productRoutes.js';
import userRoute from '../routes/userRoutes.js';
import cartRoute from '../routes/cartRoutes.js';

// Load environment variables
dotenv.config();

// Create the Express app instance
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://your-frontend-domain.com"], // Add your deployed frontend URL here!
    credentials: true,
}));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);

// Basic Test Route (Optional)
app.get("/", (req, res) => {
    res.send("WELLCOME TO EAGLE API");
});

// IMPORTANT: Connect to DB outside of the function export
// The database connection should only run once during initialization
connectDB(); 

// 🎯 EXPORT THE APP INSTANCE 🎯
// This is the handler Vercel looks for to run your Express server.
export default app;