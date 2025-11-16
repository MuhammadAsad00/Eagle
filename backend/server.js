import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoute from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import productRoute from './routes/productRoutes.js';
import userRoute from './routes/userRoutes.js';
import cartRoute from './routes/cartRoutes.js';


dotenv.config();
let port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true,
    }
));

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/product",productRoute);
app.use("/api/cart",cartRoute);

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB()
});