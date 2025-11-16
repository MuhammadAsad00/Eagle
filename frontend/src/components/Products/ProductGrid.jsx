import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { shopDataContext } from './../../context/ShopContext';

const ProductGrid = ({ products }) => {
  let { currency } = useContext(shopDataContext);

  // Handle empty products array
  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((item) => (
        <Link 
          to={`/product/${item._id}`}
          state={{ product: item }} // Pass the product data via state
          className="block group"
          key={item._id} // Use item._id instead of index
        >
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            {/* Image Container */}
            <div className="w-full h-80 mb-4 overflow-hidden bg-gray-100">
              <img 
                src={item.image1} 
                alt={item.name || "Product image"}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x300?text=Image+Not+Found";
                  e.target.alt = "Image not available";
                }}
              />
            </div>
            
            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                {item.name}
              </h3>
              <p className="text-gray-500 font-medium text-sm">
                {currency} {item.price}
              </p>
              
              {/* Optional: Show original price if available */}
              {item.originalPrice && item.originalPrice > item.price && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400 line-through">
                    {currency} {item.originalPrice}
                  </span>
                  <span className="text-xs text-red-600 font-medium">
                    Save {currency} {(item.originalPrice - item.price).toFixed(2)}
                  </span>
                </div>
              )}
              
              {/* Optional: Product badges */}
              {item.isNew && (
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  New
                </span>
              )}
              {item.isBestSeller && (
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full ml-1">
                  Best Seller
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;