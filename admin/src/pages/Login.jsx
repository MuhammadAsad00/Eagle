import React, { useContext } from "react";
import login from "../assets/login.webp";
import { useState } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { adminDataContext } from "../context/AdminContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  let { serverUrl } = useContext(authDataContext);
  let {adminData, getAdmin} = useContext(adminDataContext);
  let navigate = useNavigate();

  const adminLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
        const result = await axios.post(serverUrl + "/api/auth/adminlogin",{
            email,
            password
        },{withCredentials: true});
        setEmail("");
        setPassword("");
        getAdmin();
        navigate("/");
    } catch (error) {
        console.log(error);
        setErrorMsg("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={adminLogin}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Eagle</h2>
          </div>
          <h2 className="text-2xl mb-6 font-bold text-center">Hey there! 👋</h2>
          <p className="text-center mb-6">Apply to addmin login.</p>
          {errorMsg && (
            <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
              {errorMsg}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          <button className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-yellow-600 transition">
            Sign In
          </button>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={login}
            alt="Login to account"
            className="h-screen w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
