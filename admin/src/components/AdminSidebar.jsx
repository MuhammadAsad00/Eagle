import React, { useContext } from "react";
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser, FaUserCircle} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
import axios from "axios";

const AdminSidebar = () => {
  let {serverUrl} = useContext(authDataContext);
  let {adminData, getAdmin} = useContext(adminDataContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
       try {
         const result = await axios.get(serverUrl + "/api/auth/adminLogout",{withCredentials: true});
          getAdmin();
          navigate("/login"); 
       } catch (error) {
          console.log("Logout error:", error);
       }
    }
  return (
    <div className="p-6 flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
      <div className="mb-6">
        <Link to="/" className="text-2xl font-medium">
          Eagle
        </Link>
      </div>
      {/* User Circle */}
      <div className="flex flex-col items-center mb-6">
      <FaUserCircle className="text-4xl text-gray-400" />
      <p className="mt-1 font-semibold">
        {adminData?.role ? adminData.role.toUpperCase() : "Admin"}
      </p>
      <p className="text-sm text-gray-500">
        {adminData?.email || "admin@eagle.com"}
      </p>
    </div>
      <h2 className="text-xl font-medium mb-4 text-center">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-yellow-400 py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-yellow-400 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
            <FaUser />
            <span>Users</span>
        </NavLink>
        <NavLink
          to="/adproduct"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-yellow-400 py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-yellow-400 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
            <FaBoxOpen />
            <span>Add Products</span>
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-yellow-400 py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-yellow-400 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
            <FaBoxOpen />
            <span>Products</span>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-yellow-400 py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-yellow-400 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
            <FaClipboardList />
            <span>Orders</span>
        </NavLink>
        {/* <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-yellow-400 py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-yellow-400 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
            <FaStore />
            <span>Shop</span>
        </NavLink> */}
      </nav>
      <div className="mt-6">
        <button onClick={handleLogout} className="w-full bg-gray-500 hover:bg-yellow-600 transition-all py-2 px-4 rounded flex items-center justify-center space-x-2">
           <FaSignOutAlt />
           <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
