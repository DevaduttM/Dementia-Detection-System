"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("user", email);
        router.push("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");

    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-96"
      >
        <h2 className="text-3xl font-semibold text-white text-center mb-4">Welcome Back</h2>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        
        <form onSubmit={handleLogin} className="flex flex-col mt-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-300 mb-3"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-300 mb-5"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;