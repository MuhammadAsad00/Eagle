import React from "react";
import Order from "./Order";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto flex-grow p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Jhon Doe</h1>
            <p className="text-lg text-gray-600 mb-4">Jhon@example.com</p>
            <button className="w-full bg-black text-white py-2 px-4 rounded hover:bg-yellow-600">
              Logout
            </button>
          </div>
          {/* Right Section Orders */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <Order />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
