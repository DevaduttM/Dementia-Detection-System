"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.8 } }
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50, rotate: 0 },
    show: (delay) => ({
      opacity: 1,
      y: 0,
      rotate: delay === 0 ? -5 : 5,
      transition: { duration: 0.8, ease: "easeOut", delay }
    })
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
      <div className="h-full w-[60%] flex items-start justify-center px-[5rem] bg-[#f8d8d8] flex-col">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[#3d1010] text-8xl font-bodoni-moda"
        >
          AlzAI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="text-2xl text-black mt-5"
        >
          AI-powered early detection for Alzheimer's.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative h-full w-[40%] flex items-center bg-blue-400 justify-center"
      >
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="show"
          custom={0}
          className="absolute h-[25vw] aspect-square bg-white p-2 left-[5rem] top-[6rem]"
        >
          <div className="relative w-full h-full">
            <Image 
              src="/img_1.jpeg"
              fill
              className="object-cover scale-[.99]"
              alt="AlzAI Image 1"
            />
          </div>
        </motion.div>

        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="show"
          custom={0.5}
          className="relative h-[25vw] aspect-square bg-white p-2 bottom-[-10rem] right-[-6rem] rotate-[5deg]"
        >
          <div className="relative w-full h-full">
            <Image 
              src="/img_2.webp"
              fill
              className="object-cover scale-[.99]"
              alt="AlzAI Image 2"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;
