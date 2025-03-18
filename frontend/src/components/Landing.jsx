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
    <div className="h-screen w-screen flex md:flex-row flex-col items-center justify-center overflow-hidden">
      <div className="md:h-full h-[60%] md:w-[60%] w-full flex items-start justify-center md:px-[5rem] px-5 bg-[#f8d8d8] flex-col">
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
        className="relative md:h-full h-[40%] md:w-[40%] w-full flex items-center bg-blue-400 justify-center"
      >
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="show"
          custom={0}
          className="absolute md:h-[25vw] h-[60vw] aspect-square bg-white p-2 md:left-[5rem] md:top-[7rem] left-[2rem] top-[3rem]"
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
          className="relative md:h-[25vw] h-[60vw] aspect-square bg-white p-2 md:bottom-[-15rem] md:right-[-6rem] bottom-[-5em] right-[-4rem] rotate-[5deg]"
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
