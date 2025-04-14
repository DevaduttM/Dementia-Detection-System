"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { set } from "mongoose";
import Loading from "@/components/Loading";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://alzai.onrender.com/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("user", email);
        setLoading(false);
        const { patient_id } = response.data;
        localStorage.setItem("patient_id", patient_id);  
       
       
        router.push("/");
      }
    } catch (err) {
      setLoading(false); 
      setError(err.response?.data?.error || "Invalid email or password");
      /*if (err.response?.status === 404 && err.response?.data?.error === "User not found") {
        setError("No User Found"); 
      } else {
        setError(err.response?.data?.error || "Invalid email or password");
      }*/
    }
  };

  return (
    // <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
    //   <motion.div
    //     initial={{ opacity: 0, scale: 0.9 }}
    //     animate={{ opacity: 1, scale: 1 }}
    //     transition={{ duration: 0.6, ease: "easeOut" }}
    //     className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-96"
    //   >
    //     <h2 className="text-3xl font-semibold text-white text-center mb-4">Welcome Back</h2>
    //     {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        
    //     <form onSubmit={handleLogin} className="flex flex-col mt-4">
    //       <input
    //         type="email"
    //         placeholder="Email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         className="w-full p-3 rounded-lg border border-gray-300 bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-300 mb-3"
    //         required
    //       />
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         className="w-full p-3 rounded-lg border border-gray-300 bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-300 mb-5"
    //         required
    //       />
    //       <button
    //         type="submit"
    //         className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
    //       >
    //         Login
    //       </button>
    //     </form>
    //   </motion.div>
    // </div>

    <div className="h-[100dvh] w-screen flex items-center justify-center bg-[#ececec]">
            {
              loading && <Loading message={"Logging In..."} />
            }
            <form onSubmit={handleLogin} className="bg-[#ffffff] flex justify-center items-center h-[70%] md:w-[30%] w-[90%] shadow-2xl flex-col rounded-xl gap-10">
                <h1 className='text-black text-4xl -mb-5 w-full text-center flex justify-center items-center'>Log In</h1>
                <div className="h-[75%] w-full flex flex-col justify-center items-center md:gap-3 gap-1">
                    <label htmlFor="" className='md:-mb-3 -mb-1 w-[78%] text-gray-800 md:text-lg text-sm'>Email Id</label>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className=' h-[3rem] md:h-[12%] pl-3 text-black w-[80%] border-[1px] border-[#494949] rounded-lg mb-5' />
                    <label htmlFor="" className='md:-mb-3 -mb-1 w-[78%] text-gray-800 md:text-lg text-sm'>Password</label>
                    <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className=' h-[3rem] md:h-[12%] pl-3 text-black w-[80%] border-[1px] border-[#494949] rounded-lg mb-5' />
                    <button type="submit" className='h-[12%] w-[80%] bg-[#000000] text-white rounded-md cursor-pointer hover:shadow-xl transition-all duration-200 ease-in-out'>Log In</button>
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    <p className='text-gray-800 mt-3'>Don't have an account? <Link href={'/signup'} className='text-red-700'>Sign Up</Link></p>
                </div>
            </form>
        </div>
  );
};

export default Login;