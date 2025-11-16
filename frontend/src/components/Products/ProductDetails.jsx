import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import { shopDataContext } from "../../context/ShopContext";
import { cartDataContext } from "../../context/CartContext";


const ProductDetails = () => {
  const { id } = useParams();
  const { product, currency } = useContext(shopDataContext);
  const { addToCart} = useContext(cartDataContext)

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  // Fetch the product details
 const fetchProductDetails = () => {
  const foundProduct = product?.find((item) => item._id === id);
  if (foundProduct) {
    const imageArray = [
      foundProduct.image1,
      foundProduct.image2,
      foundProduct.image3,
      foundProduct.image4,
    ].filter(Boolean); // removes undefined values

    setProductData({ ...foundProduct, images: imageArray });
    setMainImage(imageArray[0] || "");
  } else {
    setProductData(null);
  }
};

  useEffect(() => {
    if (product && product.length > 0) {
      fetchProductDetails();
    }
  }, [id, product]);

  const handleQuantity = (action) => {
    setQuantity((prev) =>
      action === "plus" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select size before adding to cart.", {
        duration: 1000,
      });
      return;
    }

    setIsButtonLoading(true);

    // Simulated add-to-cart logic
    setTimeout(() => {
      addToCart(productData, quantity, selectedSize);
      toast.success("Product added to cart!", { duration: 1000 });
      setIsButtonLoading(false);
    }, 500);
  };

  if (!product || product.length === 0) {
  return <div className="text-center py-20">Loading product data...</div>;
}

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {productData?.images?.map((image, index) => (
  <img
    key={index}
    src={image}
    alt={`Thumbnail ${index}`}
    className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition-all duration-200 ${
      mainImage === image ? "border-black scale-105" : "border-gray-300 hover:scale-105"
    }`}
    onClick={() => setMainImage(image)}
  />
))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            <img
              src={mainImage}
              alt={productData?.name}
              className="w-full h-auto object-cover rounded-lg mb-4"
            />

            {/* Mobile Thumbnails */}
            <div className="md:hidden flex overflow-x-auto space-x-4 mb-4">
              {productData?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${
                    mainImage === image.url
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
          </div>

          {/* Right Side Details */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {productData?.name}
            </h1>

            {productData?.originalPrice && (
              <p className="text-lg text-gray-500 line-through mb-1">
                {currency}
                {productData ?.originalPrice}
              </p>
            )}

            <p className="text-xl text-black font-medium mb-2">
              {currency}{": "}
              {productData?.price}
            </p>

            <p className="text-gray-600 mb-6">{productData?.description}</p>

            {/* Color Selection */}
            {/* <div className="mb-4">
              <p className="text-gray-700 font-medium">Color:</p>
              <div className="flex gap-2 mt-2">
                {productData?.colors?.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border transition-all duration-200 ${
                      selectedColor === color
                        ? "border-4 border-black scale-105"
                        : "border-gray-300 hover:scale-105"
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                    }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div> */}

            {/* Size Selection */}
            <div className="mb-4">
              <p className="text-gray-700 font-medium">Size:</p>
              <div className="flex gap-2 mt-2">
                {productData?.sizes?.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded border transition-all duration-150 ${
                      selectedSize === size
                        ? "border-black bg-gray-900 text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-gray-700 font-medium">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="px-3 py-1 bg-gray-200 rounded text-lg cursor-pointer hover:bg-gray-300"
                  onClick={() => handleQuantity("minus")}
                >
                  −
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-200 rounded text-lg cursor-pointer hover:bg-gray-300"
                  onClick={() => handleQuantity("plus")}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              disabled={isButtonLoading}
              onClick={handleAddToCart}
              className={`py-3 px-6 rounded w-full font-semibold transition-colors ${
                isButtonLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-yellow-600"
              }`}
            >
              {isButtonLoading ? "Adding..." : "ADD TO CART"}
            </button>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-6">
            You May Also Like
          </h2>
          {product && product.length > 0 ? (
            <ProductGrid products={product.slice(0, 4)} />
          ) : (
            <p className="text-gray-500 text-center">Loading products...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
