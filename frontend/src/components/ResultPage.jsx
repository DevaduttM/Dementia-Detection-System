"use client";
import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

const ResultPage = ({ ImgURL, result }) => {
  const resultData = JSON.parse(result);
  console.log("ResultPage received resultData:", resultData);

  const prediction = resultData.prediction.class;
  const confidence = Number(resultData.prediction.confidence).toFixed(2);
  const patientId = resultData.patientId;
  const patientName = resultData.patientName;
  const patienthistory = resultData.patienthistory;

 


  useEffect(() => {
    console.log("Patient History (useEffect):", patienthistory);
  }, [patienthistory]);

  return (
    <div className="absolute top-0 left-0 h-screen min-h-fit w-screen flex justify-center md:flex-row flex-col items-center bg-[#f1e4e4] pt-[4rem]">
      <div className="md:w-[30%] w-[95%] md:h-full h-[90%] flex flex-col items-center justify-around">
        <div className="h-[45%] md:w-[60%] w-[70%] flex justify-center items-center bg-[#fafaf6] shadow-2xl rounded-xl">
          <div className="w-full aspect-square rounded-full flex items-center justify-center flex-col">
            <FaUserCircle className="text-[#a3a3a3] text-8xl" />
            <div className="h-[70%] w-[80%] flex justify-center items-start flex-col gap-5">
              <p className="text-black text-left">Patient Name: {patientName || "N/A"}</p>
              <p className="text-black text-left">Patient Id: {patientId || "N/A"}</p>
              <p className="text-black text-left">Scan Id: {"N/A"}</p>
            </div>
          </div>
        </div>
        <div className="relative h-[45%] md:w-[60%] w-[70%] flex justify-center items-center bg-[#fafaf6] shadow-2xl rounded-xl flex-col">
          <p className="text-black">Scan Image</p>
          <Image
            src={ImgURL}
            alt="image"
            width={100}
            height={100}
            className="object-cover scale-[.8] w-full h-auto rounded-xl"
          />
        </div>
      </div>
      <div className="md:w-[70%] w-[90%] h-[95%] flex items-center justify-center mb-10 md:mb-0">
        <div className="relative w-[90%] h-full bg-[#fafaf6] shadow-2xl rounded-xl flex flex-col items-center justify-center">
          <h1 className="text-4xl text-black font-bodoni-moda ml-5 mt-5">Diagnosis: {prediction || "N/A"}</h1>
          <h1 className="text-4xl text-black font-bodoni-moda ml-5 mt-5">Confidence: {confidence ? `${confidence} %` : "N/A"}</h1>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 flex justify-center items-center text-white w-[8rem] h-[3rem] rounded-lg absolute bottom-3"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;