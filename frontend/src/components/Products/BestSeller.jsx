// import React, { useContext, useEffect, useState } from "react";
// import { shopDataContext } from "../../context/ShopContext";
// import ProductGrid from "./ProductGrid";

// const BestSeller = () => {
//     let {product} = useContext(shopDataContext);
//     let [bestSeller, setBestSeller] = useState([]);

//     useEffect(() => {
//      let filterProduct = product.filter((item) => item.bestseller)
//      setBestSeller(filterProduct.slice(0, 4));
//     },[product])

//   return <div className="p-6">
//     <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
//         <div className="mt-6">
//             <h2 className="text-2xl text-center font-medium mb-4">You May Also Like</h2>
//             <ProductGrid products={bestSeller.slice(0, 4)}/>
//         </div>
//     </div>
//   </div>;
// };

// export default BestSeller;
