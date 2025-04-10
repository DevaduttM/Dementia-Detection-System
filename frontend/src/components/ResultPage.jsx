"use client";
import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

const ResultPage = ({ ImgURL, result, history }) => {
  let resultData = {};
  let patientHistory = {};

  try {
    resultData = result ? JSON.parse(result) : {};
  } catch (e) {
    console.error("Invalid result JSON:", result);
  }

  try {
    patientHistory = history ? JSON.parse(history) : {};
  } catch (e) {
    console.error("Invalid history JSON:", history);
  }

  console.log("ResultPage received patientHistory:", patientHistory);
  console.log("ResultPage received resultData:", resultData);

  const prediction = resultData?.prediction?.class || "N/A";
  const confidence = resultData?.prediction?.confidence
    ? Number(resultData.prediction.confidence).toFixed(2)
    : "N/A";
  const patientId = resultData?.patientId || "Unknown";
  const patientName = resultData?.patientName || "Unknown";
  const patienthistory = patientHistory?.patienthistory || "None";
  const images = patientHistory?.images || []; // Extract images array with scanid
  const newScanId = resultData?.newScanId || "N/A";

  useEffect(() => {
    console.log("Patient History (useEffect):", patientHistory);
  }, [patientHistory]);

  return (
    <div className="absolute top-0 left-0 h-screen min-h-fit w-screen flex justify-center md:flex-row flex-col items-center bg-[#f1e4e4] pt-[4rem] overflow-x-hidden">
      <div className="md:w-[30%] w-[95%] md:h-full h-[90%] flex flex-col items-center justify-around">
        <div className="h-[45%] md:w-[60%] w-[70%] flex justify-center items-center bg-[#fafaf6] shadow-2xl rounded-xl">
          <div className="w-full aspect-square rounded-full flex items-center justify-center flex-col">
            <FaUserCircle className="text-[#a3a3a3] text-8xl" />
            <div className="h-[70%] w-[80%] flex justify-center items-start flex-col gap-5">
              <p className="text-black text-left">Patient Name: {patientName || "N/A"}</p>
              <p className="text-black text-left">Patient Id: {patientId || "N/A"}</p>
              <p className="text-black text-left">Scan Id: {newScanId}</p>
            </div>
          </div>
        </div>
        <div className="relative h-[45%] md:w-[60%] w-[70%] flex justify-center items-center bg-[#fafaf6] shadow-2xl rounded-xl flex-col">
          <p className="absolute top-3 text-black">Scan Image</p>
          <Image
            src={ImgURL}
            alt="image"
            width={100}
            height={100}
            className="object-cover md:scale-[.8] scale-[0.6] w-full h-auto rounded-xl"
          />
        </div>
      </div>
      <div className="md:w-[70%] w-[90%] md:h-[95%] h-[95vh] flex items-center justify-center mb-10 md:mb-0 flex-col gap-10">
        <div className="relative w-[90%] h-[40%] bg-[#fafaf6] shadow-2xl rounded-xl flex flex-col items-center justify-center">
          <h1 className="absolute top-5 text-4xl text-black">Result</h1>
          <h1 className="md:text-3xl text-lg text-black font-bodoni-moda ml-5">Diagnosis: {prediction || "N/A"}</h1>
          <h1 className="md:text-3xl text-lg text-black font-bodoni-moda ml-5">Confidence: {confidence ? `${confidence} %` : "N/A"}</h1>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 flex justify-center items-center text-white w-[8rem] md:h-[3rem] h-[2.2rem] rounded-lg absolute bottom-3 cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Go Back
          </button>
        </div>
        <div className="relative md:h-[50%] h-fit w-[90%] bg-[#fafaf6] shadow-2xl rounded-xl flex justify-center items-center flex-col">
          <div className="h-[98%] w-[98%] flex justify-center items-center flex-col">
            <h1 className="absolute top-5 text-3xl text-black">Patient history</h1>
            <div className="h-full w-full md:pl-10 pl-5 flex flex-col items-start justify-center md:mt-0 mt-[25%]">
              <p className="text-black text-lg">Name: {patientHistory.patientName || "N/A"}</p>
              <p className="text-black text-lg">Age: {patientHistory.age || "N/A"}</p>
              <p className="text-black text-lg mb-5">Sex: {patientHistory.sex || "N/A"}</p>
              <p className="text-black md:text-sm text-[12px] md:w-[90%] w-[95%]">Medical History: {patienthistory || "None"}</p>
              <div className="mt-5">
                <p className="text-black text-lg">Previous Scans:</p>
                {images.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {images.map((image, index) => (
                      <a
                        key={index}
                        href={image.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline text-sm hover:text-blue-700"
                      >
                        Scan {image.scanid}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-black text-sm mt-2">No previous scans available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;