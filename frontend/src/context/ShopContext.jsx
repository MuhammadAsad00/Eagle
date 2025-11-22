import { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { userDataContext } from "./UserContext";

export const shopDataContext = createContext();
const ShopContext = ({ children }) => {
  let [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let currency = "Rs";
  let deliveryFee = "30";

  // Fetch all products (default)
  const getProducts = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${serverUrl}/api/product/getallproducts`);
      setProduct(result.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts(); // or getFilteredProducts({ category: "all" });
  }, []);

  // Fetch filtered products (using backend filterProduct API)
  const getFilteredProducts = async (filters = {}) => {
    try {
      setLoading(true);

      // Convert filters object → query string
      const queryParams = new URLSearchParams(filters).toString();

      const result = await axios.get(
  `${serverUrl}/api/product/filterproduct?${queryParams}`
);

      console.log(result.data);
      setProduct(result.data);
    } catch (error) {
      console.log("Error filtering products:", error);
    } finally {
      setLoading(false);
    }
  };

  let value = {
    product,
    loading,
    getProducts,
    getFilteredProducts,
    currency,
    deliveryFee,
  };
  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
};

export default ShopContext;
