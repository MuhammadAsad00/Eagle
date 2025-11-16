import User from "../models/User.js";

// Add or Update Cart Item
export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || [];

    if (cartData[itemId]) {
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        } else {
            cartData[itemId][size] = 1;
        }
    } else {
        cartData[itemId] = {};
        cartData[itemId] [size] = 1;
    }
      

    await User.findByIdAndUpdate(req.userId, {cartData});
    return res.status(201).json({ message: "Add to cart successful" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Upadate Cart
export const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const userData = await User.findById(req.userId);
        let cartData = await userData.cartData;
        
        cartData[itemId][size] = quantity;
        await User.findByIdAndUpdate(req.userId, { cartData });
        res.status(200).json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// Get User Cart
export const getUserCart = async (req, res) => {
    try {
        const userData = await User.findById(req.userId);
        let cartData = await userData.cartData;
        res.status(200).json({ cartData });
    } catch (error) {
        console.error("Error fetching user cart:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// Remove Item or Size from Cart
export const removeFromCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = user.cartData || {};

    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];

      // If no sizes left for this item, delete the whole product entry
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

      await User.findByIdAndUpdate(req.userId, { cartData }, { new: true });
      return res.status(200).json({ message: "Item removed from cart" });
    } else {
      return res.status(400).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};
