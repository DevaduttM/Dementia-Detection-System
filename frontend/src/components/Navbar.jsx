"use client"
import React from "react";
import {motion}  from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const navitems = [
    { name: "Home", link: "/" },
    { name: "About", link: "#about" },
  ];

  return (
    <div className="px-5 fixed w-full h-[8%] shadow-2xl bg-white flex items-center justify-around z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-full flex items-center justify-around"
      >
        <h1 className="text-3xl text-black font-bodoni-moda">AlzAI</h1>
        <div className="flex items-center w-[70%] justify-around">
          {navitems.map((item, index) => (
            <a key={index} href={item.link} className="text-black hover:text-gray-600 transition duration-200">
              {item.name}
            </a>
          ))}
          <Link href="/model" className="text-black hover:text-gray-600 transition duration-200">Model</Link>
        </div>
       

        {user ? (
          <button
            onClick={handleLogout}
            className="w-[8%] h-[55%] rounded-lg bg-red-500 text-white hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="w-[8%] h-[55%] rounded-lg bg-black text-white hover:bg-gray-800 transition duration-300"
          >
            Login
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default Navbar;
