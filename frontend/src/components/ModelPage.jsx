"use client";
import React, { useState, useRef } from "react";
import { FaImage } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import ResultPage from "./ResultPage";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "./Loading";

const ModelPage = () => {
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [result, setResult] = useState(null);
  const fileInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [patientHistory, setPatientHistory] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (file && patientId) {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("patientId", patientId);

      try {
        console.log("Sending POST to /predict with patientId:", patientId);
        const predictResponse = await axios.post("http://127.0.0.1:5000/predict", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Predict response:", predictResponse.data);

        let patientName = "Unknown Patient";
        try {
          console.log("Fetching patient data for patientId:", patientId);
          const patientResponse = await axios.get(`http://127.0.0.1:5000/patient?patient_id=${patientId}`);
          console.log("Patient response:", patientResponse.data);
          setPatientHistory(JSON.stringify(patientResponse.data));
          if (patientResponse.status === 200) {
            patientName = patientResponse.data.patientName;
          }
        } catch (patientErr) {
          console.error("Patient fetch error:", patientErr.response?.status, patientErr.response?.data);
          if (patientErr.response?.status === 404) {
            console.log(`Patient with ID ${patientId} not found, using default name`);
          } else {
            throw patientErr;
          }
        }

        const combinedResult = {
          ...predictResponse.data,
          patientName: patientName,
        };
        console.log("Combined result before stringifying:", combinedResult);
        setResult(JSON.stringify(combinedResult));
        setSubmitted(true);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Error submitting form:", err);
        console.error("Error details:", err.response?.status, err.response?.data);
        const errorMessage = err.response?.data?.error || "An error occurred while submitting the form.";
        alert(errorMessage);
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-screen w-screen bg-[#f1e4e4] flex md:justify-center justify-end md:gap-10 gap-5 items-center flex-col overflow-y-scroll"
      >
        <h1 className="absolute md:top-[10vh] top-[3vh] text-4xl font-bodoni-moda text-black">
          Our Model
        </h1>
        <div className="md:w-[80%] sm:w-[70%] w-[90%] md:h-[60%] h-[80%] bg-[#fafaf6] rounded-xl shadow-2xl mt-[5rem] flex items-center justify-around md:flex-row flex-col">
          <div className="md:w-[45%] w-[90%] md:h-[90%] h-[45%] rounded-xl bg-[#c7c7c7] flex mt-[5rem] md:mt-0 items-center justify-center">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="image"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <FaImage className="text-[#808080] text-5xl" />
            )}
          </div>
          <div className="md:w-[45%] w-[90%] h-[70%] flex flex-col items-center justify-center gap-5">
            <input
              onChange={(e) => setPatientId(e.target.value)}
              type="text"
              required
              placeholder="Patient ID"
              className="w-[90%] md:w-full h-[3rem] border-dashed border-[1px] border-[#525252a9] px-3 bg-gray-100 text-black rounded-xl focus:border-none focus:outline-dashed"
            />
            <div
              onClick={() => fileInput.current.click()}
              className="md:w-full w-[90%] md:h-[70%] h-[45%] border-[1px] border-dashed border-[#525252a9] rounded-xl flex items-center justify-center flex-col cursor-pointer"
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
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          className="w-[10rem] h-[3rem] bg-[#4a56c0] rounded-xl text-white mb-5 md:mb-0"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </motion.div>
      {submitted && (
        <div>
          {/* <pre style={{ margin: "10px", fontSize: "14px", background: "#f0f0f0", padding: "10px" }}>
            Debug - Result Prop: {result}
          </pre> */}
          <ResultPage ImgURL={URL.createObjectURL(file)} result={result} history = {patientHistory} />
        </div>
      )}
      {loading && <Loading />}
    </>
  );
};

export default ModelPage;