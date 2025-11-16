// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { FaRegUserCircle } from "react-icons/fa";
import { userDataContext } from "../../context/UserContext";
import { authDataContext } from "../../context/AuthContext";
import axios from "axios";
import { cartDataContext } from "../../context/CartContext";

const Navbar = ({ textColor, hoverColor, shouldBeTransparent }) => {
  let {getCurrentUser, userData } = useContext(userDataContext);
   const { cartCount } = useContext(cartDataContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navdrawerOpen, setNavDrawerOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  let {serverUrl} = useContext(authDataContext);
  let navigate = useNavigate();   

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navdrawerOpen);
  };

  // Dynamic icon color based on transparency
  const iconColor = shouldBeTransparent
    ? "text-white hover:text-yellow-500"
    : "text-black hover:text-yellow-500";
  const hamburgerColor = shouldBeTransparent ? "text-white" : "text-black";

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout",{withCredentials:true});
      console.log(result.data);
      getCurrentUser();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 ">
        {/* logo */}
        <div>
          <Link
            to="/"
            className={`${textColor} text-2xl font-medium text-black`}
          >
            Eagle
          </Link>
        </div>
        {/* Nav items */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collection/all"
            className={`text-black text-sm font-medium uppercase ${textColor} ${hoverColor}`}
          >
            Men
          </Link>
          <Link
            to="/collection/all?gender=Women"
            className={`text-black text-sm font-medium uppercase transition-colors duration-300 ${textColor} ${hoverColor}`}
          >
            Women
          </Link>
          <Link
            to="/about"
            className={`text-black text-sm font-medium uppercase transition-colors duration-300 ${textColor} ${hoverColor}`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`text-black text-sm font-medium uppercase transition-colors duration-300 ${textColor} ${hoverColor}`}
          >
            Contact
          </Link>
        </div>
        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* <Link to="/admin/login" className="bg-black text-white px-3 py-1 rounded text-sm font-medium hover:bg-gray-800 transition">
           Admin login
          </Link> */}
          <button
            className="relative cursor-pointer"
            onClick={toggleCartDrawer}
          >
            <HiOutlineShoppingBag
              className={`h-6 w-6 text-black ${iconColor}`}
            />
             {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartCount}
            </span>
             )}  
          </button>
          {/* search */}
          <SearchBar textColor={textColor} />
          <div className="relative">
            {!userData && <FaRegUserCircle className={`w-[29px] h-[29px] ${textColor} ${hoverColor} cursor-pointer`} onClick={() => setShowProfileMenu((prev) => !prev)}/>}
              {userData && <div
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className={`w-[30px] h-[30px] border ${textColor} rounded-full flex items-center justify-center cursor-pointer`}
              >
                {userData?.name.charAt(0, 1)}
              </div>}
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2 z-50 flex flex-col text-gray-700">
                  <span className="px-4 py-2 font-semibold border-b border-gray-200">
                   {!userData && `Welcome, Guest`}
                   {userData && `Welcome, ${userData?.name}`}
                  </span>
                  {!userData && <button className="text-left px-4 py-2 hover:bg-gray-100 hover:text-yellow-500 cursor-pointer" onClick={() => {navigate('/login');setShowProfileMenu(false)}}>
                    Login
                  </button>}
                  {userData && <button className="text-left px-4 py-2 hover:bg-gray-100 hover:text-yellow-500 cursor-pointer" onClick={() => {handleLogout();setShowProfileMenu(false)}}>
                    Logout
                  </button>}
                </div>
              )}  
          </div>


          {/* {userData && (
            <div className="relative">
              <div
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className={`w-[30px] h-[30px] border border-white ${textColor} rounded-full flex items-center justify-center cursor-pointer select-none`}
              >
                {userData?.name.charAt(0, 1)}
              </div>
              {showProfileMenu && userData && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2 z-50 flex flex-col text-gray-700">
                  <span className="px-4 py-2 font-semibold border-b border-gray-200">
                    Welcome, {userData?.name}
                  </span>
                  <button className="text-left px-4 py-2 hover:bg-gray-100 hover:text-yellow-500 cursor-pointer">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )} */}
          {/* Hamburger */}
          <button className="md:hidden" onClick={toggleNavDrawer}>
            <HiBars3BottomRight
              className={`h-6 w-6 text-black ${hamburgerColor}`}
            />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform 
    transition-transform duration-300 z-50 
    ${navdrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collection/all"
              className={`block text-gray-600 transition-colors duration-300 ${hoverColor}`}
            >
              Men
            </Link>
            <Link
              to="/collection/all?gender=Women"
              className={`block text-gray-600 transition-colors duration-300 ${hoverColor}`}
            >
              Women
            </Link>
            <Link
              to="/about"
              className={`block text-gray-600 transition-colors duration-300 ${hoverColor}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block text-gray-600 transition-colors duration-300 ${hoverColor}`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
