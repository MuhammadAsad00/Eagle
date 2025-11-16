import express from "express";
import { addToCart, getUserCart, removeFromCart, updateCart } from "../controller/cartController.js";
import isAuth from "../middleware/isAuth.js";


const cartRoute = express.Router();

cartRoute.get("/getusercart", isAuth, getUserCart);
cartRoute.post("/addtocart", isAuth, addToCart);
cartRoute.post("/updatecart", isAuth, updateCart);
cartRoute.post("/removefromcart", isAuth, removeFromCart);

export default cartRoute;