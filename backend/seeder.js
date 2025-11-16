import mongoose  from "mongoose";
import Product from "./models/Product.js";
import User from "./models/User.js";
import products from "./data/products.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGODB_URL);

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        // creta a default admin user.
        const createdUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin"
        });

        // Assign the default admin user ID to each product.
        const userID = createdUser._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: userID };
        });

        // Insert the sample products into the database.
        await Product.insertMany(sampleProducts);
        console.log("Data Seeded Successfully");
        process.exit();

    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
}

seedProducts();