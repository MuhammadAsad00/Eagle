import React, { useState, useEffect, useRef, useContext} from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOption from "../components/Products/SortOption";
import ProductGrid from "../components/Products/ProductGrid";
import { shopDataContext } from "../context/ShopContext";


const Collection = () => {
  let {product} = useContext(shopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [isSidebarOpen,setIsSidebarOpen] = useState(false);
 


 

  
  
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleClickOutside = (e) => {
    if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
        setIsSidebarOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])
  
  

  useEffect(() => {
    setLatestProducts(product);
  }, [product]);

  return <div className="flex flex-col lg:flex-row">
    {/* Mobile filter button */}
    <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center">
      <FaFilter className="mr-2"/> Filters
    </button>

    {/* Filter Sidebar */}
    <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
      <FilterSidebar />
    </div>
    <div className="flex-grow p-4">
       <h2 className="text-2xl uppercase mb-4">All Collection</h2>

       {/* Sort Option */}
       <SortOption />

       {/* Product Grid */}
          {
          latestProducts.length === 0 ? (
            <p className="text-center">Loading Products...</p>
          ) : (
              <ProductGrid products={product.slice(0, 8)} />
          )
          }
               
    </div>
  </div>;
};

export default Collection;
