import React, { useState, useRef, useCallback } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import Spline from "@splinetool/react-spline";
import axios from "axios";
import Webcam from "react-webcam"; 

import { API_PATH } from "../../utils/apiPath";

const VoterLogin = () => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const webcamRef = useRef(null);

  // Capture Image from Webcam
  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const handleWalletConnect = async () => {
    //getting the ethereum provider and wallet address
    const provider = await window.ethereum;
    if (provider) {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];
      setAddress(walletAddress);
    } else {
      console.error('Please install MetaMask!');
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setError("Both fields are required.");
      return;
    }
    
    if (!image) {
      setError("Please capture an image for verification.");
      return;
    }

    setError("");

    // Prepare FormData to send username, password, and image
    const formData = new FormData();
    formData.append("VoterID", userName);
    formData.append("password", password);
    formData.append("imageBase64", image); // Send captured image
    formData.append("address", address); // Send wallet address

    try {
      const response = await axios.post('http://127.0.0.1:8000/login', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const role = response.data.role;
      if (role === "admin") {
        navigate("/admin-home");
      } else if (role === "voter") {
        navigate("/vote");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthLayout>
      {/* Background 3D Animation */}
      <div className="absolute inset-0 -z-10">
        <Spline scene="https://prod.spline.design/57w2GHQT9RkWLs-s/scene.splinecode" />
      </div>

      {/* Login Container */}
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md bg-transparent shadow-xl p-8 rounded-lg border border-white/30">
          <h3 className="text-3xl font-bold text-white text-center mb-4">
            Welcome
          </h3>
          <p className="text-center text-gray-200 mb-6">
            Please enter your details and capture an image to proceed
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="ID"
              type="text"
              className="w-full p-3 bg-transparent border border-gray-300 rounded-lg text-white placeholder-gray-300"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="w-full p-3 bg-transparent border border-gray-300 rounded-lg text-white placeholder-gray-300"
            />

            {/* Webcam Capture */}
            <div className="flex flex-col items-center space-y-3">
              {!image ? (
                <>
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-64 h-48 rounded-lg border border-gray-400"
                  />
                  <button
                    type="button"
                    onClick={captureImage}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Capture Image
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <img
                    src={image}
                    alt="Captured"
                    className="w-40 h-40 object-cover rounded-lg border border-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-2"
                  >
                    Retake
                  </button>
                </div>
              )}
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="button"
              className="w-full hover:bg-purple-700 text-white p-3 rounded-lg transition-all "
              onClick={handleWalletConnect}
            >
              {address ? "Connected to: " + address : "Connect Wallet"}
            </button>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all"
            >
              LOGIN
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-gray-200 mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-300 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VoterLogin;
