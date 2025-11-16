import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import register from "../assets/register.jpg";
import { useContext } from "react";
import axios from "axios";
import {authDataContext} from "../context/AuthContext.jsx"
import {userDataContext} from "../context/UserContext.jsx"

const Register = () => {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let {serverUrl} = useContext(authDataContext);
  let {getCurrentUser} = useContext(userDataContext);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const result = await axios.post(serverUrl + "/api/auth/register",{
        name,email,password
      },{withCredentials: true});
        console.log(result.data);
        getCurrentUser();
        navigate("/");
        setName("");
        setEmail("");
        setPassword("");
    } catch (error) {
       console.log("Registration error:", error);
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Eagle</h2>
          </div>
          <h2 className="text-2xl mb-6 font-bold text-center">Hey there! 👋</h2>
          <p className="text-center mb-6">
            Enter your details to register
          </p>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
              required
            />
          </div>
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
          <button type="submit" className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-yellow-600 transition">
            Sign Up
          </button>
          <p className="mt-6 text-center text-sm">
             have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={register}
            alt="Login to account"
            className="h-screen w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
