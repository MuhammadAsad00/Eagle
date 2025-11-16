import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: true,
  },
  image3: {
    type: String,
    required: true,
  },
  image4: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  bestseller: {
    type: Boolean,
  },
  collection: {
     type: String,
     required: true,
   },
  // discountPrice: {
  //   type: Number,
  // },
  // countInStock: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  // sku: {
  //   type: String,
  //   unique: true,
  //   required: true,
  // },
  // brand: {
  //   type: String,
  // },
  // colors: {
  //   type: [String],
  //   required: true,
  // },
  // material: {
  //   type: String,
  // },
  // gender: {
  //   type: String,
  //   enum: ["Men", "Women", "Unisex"],
  // },
  // images: [
  //   {
     
  //   },
  // ],
  // isFeatured: {
  //   type: Boolean,
  //   default: false,
  // },
  // isPublished: {
  //   type: Boolean,
  //   default: false,
  // },
  // rating: {
  //   type: Number,
  //   default: 0,
  // },
  // numReviews: {
  //   type: Number,
  //   default: 0,
  // },
  // tags: [String],
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  // metaTitle: {
  //   type: String,
  // },
  // metaDescription: {
  //   type: String,
  // },
  // metaKeywords: {
  //   type: String,
  // },
  // dimensions: {
  //   length: Number,
  //   width: Number,
  //   height: Number,
  // },
  // weight: Number,

},{timestamps: true});

const Product = mongoose.model("Product", productSchema);

export default Product;
