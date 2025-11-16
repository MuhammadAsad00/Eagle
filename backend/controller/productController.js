import Product from "./../models/Product.js";
import uploadCloudinary from "../config/cloudinary.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, gender, sizes, bestseller } =
      req.body;

    // Upload images to Cloudinary
    let image1 = await uploadCloudinary(req.files.image1[0].path);
    let image2 = await uploadCloudinary(req.files.image2[0].path);
    let image3 = await uploadCloudinary(req.files.image3[0].path);
    let image4 = await uploadCloudinary(req.files.image4[0].path);

    const productData = new Product({
      name,
      description,
      price: Number(price),
      category,
      gender,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    });

    const product = await Product.create(productData);
    return res.status(201).json(product);
  } catch (error) {
    console.log("Product creation failed", error);
    return res
      .status(500)
      .json({ message: `Product creation failed: ${error.message}` });
  }
};

export const filterProduct = async (req, res) => {
  try {
    const {
      collection,
      sizes,
      bestseller,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      limit,
    } = req.query;

    let query = {};
    
    // Filter logic
    if (collection && collection.toLowerCase() !== "all") {
      query.collection = collection;
   }

    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }

    if (sizes) {
      query.sizes = { $in: sizes.split(",")};
    }

    if (bestseller && bestseller.toLowerCase() !== "all") {
      query.bestseller = bestseller;
   }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if(minPrice) query.price.$gte = Number(minPrice);
      if(maxPrice) query.price.$lte = Number(maxPrice)
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" }},
        { description: { $regex: search, $options: "i" }}
      ];
    }

    // Sort logic
    let sort = {};
    if (sortBy) {
       switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { bestseller: -1 };
          break;
        default:
          break;
       }
    }

    // Fetch products and apply sorting and limit
    let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
    res.json(products); 

  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: `Products searching failed: ${error.message}` });

  }
};

export const similarProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id }, // Exclude the current product ID.
      gender: product.gender,
      category: product.category
    }).limit(4); 
    
    res.json(similarProducts);

  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Server error" });
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    console.log("Fetching products failed", error);
    return res
      .status(500)
      .json({ message: `Fetching products failed: ${error.message}` });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    return res.status(200).json(product);
  } catch (error) {
    console.log("Deleting product failed", error);
    return res
      .status(500)
      .json({ message: `Deleting product failed: ${error.message}` });
  }
};
