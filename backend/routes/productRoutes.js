import express from "express";
import { 
  addProduct, 
  getAllProducts, 
  deleteProduct, 
  filterProduct 
} from "../controller/productController.js";

import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRoute = express.Router();

// Default route to remove "Cannot GET /api/product"
productRoute.get("/", (req, res) => {
  res.json({ message: "Product API Working" });
});

// Add Product
productRoute.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// Get All Products
productRoute.get("/getallproducts", getAllProducts);

// Filter Products
productRoute.get("/filterproduct", filterProduct);

// Delete Product (Admin only)
productRoute.post("/deleteproduct/:id", adminAuth, deleteProduct);

export default productRoute;
