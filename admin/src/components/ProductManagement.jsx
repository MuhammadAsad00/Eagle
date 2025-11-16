import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "sonner";

const ProductManagement = () => {
  const [list, setList] = useState([]);
  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/getallproducts");
      setList(result.data);
      console.log(result.data);
    } catch (error) {
      console.log("Error fetching products:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return; // user canceled

      const result = await axios.post(
        `${serverUrl}/api/product/deleteproduct/${id}`,
        {},
        { withCredentials: true }
      );

      if (result.data) {
        fetchProducts(); // refresh product list
        toast.success("Product deleted successfully");
      } else {
        toast.error("Error deleting product");
      }
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error);
      toast.error("Error deleting product");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4 text-gray-900 font-medium whitespace-nowrap">
                    <img
                      src={item.image1}
                      alt={item.altText}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">${item.price}</td>

                  <td className="p-4 flex items-center space-x-2">
                    <Link
                      to={`/products/${item._id}/edit`}
                      className="text-black hover:text-yellow-600 transition-all"
                    >
                      <FaEdit size={24} />
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-black hover:text-yellow-600 transition-all cursor-pointer"
                    >
                      <RiDeleteBin5Line size={24} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-500 bg-gray-50 rounded-b-md"
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    {/* Optional icon */}
                    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-gray-400 mb-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v8m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v12"
        />
      </svg>

                    <p className="text-lg font-medium">No Products found.</p>
                    <p className="text-sm text-gray-400">
                      Start by adding your first product.
                    </p>

                    {/* Add Product button */}
                    <button
                      onClick={() => navigate("/adproduct")} // or your route
                      className="px-4 py-2 bg-black text-white rounded-md hover:bg-yellow-600 transition"
                    >
                      Add Product
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
