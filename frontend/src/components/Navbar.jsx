"use client"
import React, {useState, useEffect} from "react";
import {motion}  from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiMenu2Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("patient_id");
    setUser(null);
    router.push("/login");
  };

  const navitems = [
    { name: "Home", link: "/" },
    { name: "About", link: "#about" },
  ];

  return (
    <>
      <RiMenu2Line onClick={() => setNavOpen(!navOpen)} className={`${navOpen ? `hidden` : `flex`} md:hidden fixed text-black text-3xl top-4 left-4 z-60`}/>
      <IoMdClose onClick={() => setNavOpen(!navOpen)} className={`${navOpen ? `flex` : `hidden`} md:hidden fixed text-black text-3xl top-4 left-4 z-60`} />
    <div className={`${navOpen ? `w-[80%]` : `w-0`} md:px-5 fixed md:w-full md:h-[8%] h-full shadow-2xl transition-all duration-500 ease-in-out bg-white flex items-center justify-around z-50`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-full flex items-center md:justify-around md:flex-row justify-center flex-col"
      >
        <h1 className={`${navOpen ? `flex` : `hidden`} md:flex text-3xl text-black font-bodoni-moda`}>AlzAI</h1>
        <div className={`${navOpen ? `flex` : `hidden`} md:flex items-center w-[70%] md:h-full h-[70%] md:justify-around justify-center md:gap-0 gap-10 md:flex-row flex-col`}>
          {navitems.map((item, index) => (
            <a key={index} href={item.link} className="text-black hover:text-gray-600 transition md:text-lg text-2xl duration-200">
              {item.name}
            </a>
          ))}
          <Link href="/model" className="text-black hover:text-gray-600 md:text-lg text-2xl transition duration-200">Model</Link>
        </div>

        {user ? (
          <button
            onClick={handleLogout}
            className={`${navOpen ? `flex` : `hidden`} md:flex justify-center items-center md:w-[8%] md:h-[55%] w-[80%] h-[7%] rounded-lg bg-red-500 text-white hover:bg-red-700 transition duration-300 cursor-pointer`}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className={`${navOpen ? `flex` : `hidden`} md:flex justify-center items-center md:w-[8%] md:h-[55%] w-[80%] h-[7%] rounded-lg bg-black text-white hover:bg-gray-800 transition duration-300`}
          >
            Login
          </button>
        )}
      </motion.div>
    </div>
    </>
  );
};

export default Navbar;
