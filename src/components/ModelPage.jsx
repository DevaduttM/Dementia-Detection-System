"use client";
import React, { useState, useRef } from "react";
import { FaImage } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import ResultPage from "./ResultPage";
import Navbar from "./Navbar";

const ModelPage = () => {
  const [file, setFile] = useState("");
  const [submitted, setSubmitted] = useState(0);
  const fileInput = useRef("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
  if (selectedFile) {
    setFile(selectedFile);
  }
  };
  return (
    <>
    <Navbar />
      <div className="h-screen w-screen bg-[#f8d8d8] flex md:justify-center justify-end md:gap-10 gap-5 items-center flex-col">
        <h1 className="absolute top-[5rem] text-4xl font-bodoni-moda text-black">
          Our Model
        </h1>
        <div className="md:w-[80%] w-[70%] md:h-[60%] h-[80%] bg-[#e8e9d8] rounded-xl shadow-2xl mt-[5rem] flex items-center justify-around md:flex-row flex-col">
          <div className="md:w-[45%] w-[90%] md:h-[90%] h-[45%] rounded-xl bg-[#c7c7c7] flex items-center justify-center">
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="image"
                className="w-full h-full object-cover rounded-xl"
              />
            )}
            {!file && <FaImage className="text-[#808080] text-5xl" />}
          </div>
          <div
            onClick={() => fileInput.current.click()}
            className="md:w-[45%] w-[90%] md:h-[90%] h-[45%] border-[1px] border-dashed border-[#525252a9] rounded-xl flex items-center justify-center flex-col cursor-pointer"
          >
            <input
              type="file"
              ref={fileInput}
              onChange={handleFileChange}
              className="hidden"
            />
            {!file ? (
              <div className="flex flex-col items-center">
                <FiUpload className="text-[#818181] text-2xl md:text-3xl lg:text-7xl" />
                <p className="text-[#818181] text-2xl md:text-3xl lg:text-4xl">Upload Image</p>
              </div>
            ) : (
                <div className="flex flex-col items-center">
                <FiUpload className="text-[#818181] text-2xl md:text-3xl lg:text-7xl" />
                <p className="text-[#818181] text-2xl md:text-3xl lg:text-3xl">Change Image</p>
              </div>)}
          </div>
        </div>
        <button className="w-[10rem] h-[3rem] bg-[#4a56c0] rounded-xl text-white mb-5 md:mb-0" onClick={() => setSubmitted(1)}>Submit</button>
      </div>
    {submitted === 1 && 
        <ResultPage ImgURL={URL.createObjectURL(file)} />
    }
    </>
  );
};

export default ModelPage;
