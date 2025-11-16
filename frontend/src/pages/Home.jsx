import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Common/Footer";
import Hero from "../components/Layout/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import { shopDataContext } from "../context/ShopContext";

const Home = () => {
   let {product} = useContext(shopDataContext);
   const [latestProducts, setLatestProducts] = useState([]);

 useEffect(() => {
     setLatestProducts(product);
   }, [product]);

  return (
    <div>
      <Hero />
      <GenderCollection/>
      <NewArrivals/>
      {/* Best Seller */}
      {/* <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2> */}
      {/* Product Details */}
      {/* <ProductDetails/> */}
      {/* <BestSeller/> */}
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
       <div className="mt-20">
          <h2 className="text-3xl text-center font-bold mb-4">You May Also Like</h2>
          {!product || product.length === 0 ? (
          <p className="text-gray-500">Loading products...</p>
          ) : (
            <ProductGrid products={product.slice(0, 4)} />
          )}
        </div>
      </div>        

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Top Wears for Women</h2>
        {!product || product.length === 0 ? (
          <p className="text-gray-500">Loading products...</p>
        ) : (
          <ProductGrid products={product.slice(0, 8)} />
        )}
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
