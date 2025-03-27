import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import AuthLayout from "../../layout/AuthLayout";

import axios from "axios";
import { API_PATH } from "../../utils/apiPath";

const VoterRegister = () => {
  const [voterID, setVoterID] = useState(null);
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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

  const RegisterUser = async (e) => {
    e.preventDefault();

    if (!voterID || !password || !image || !address) {
      setError("All fields are required");
      return;
    }

    setError("");
    
    
    const formData = new FormData();
    formData.append("VoterID", voterID);
    formData.append("password", password);
    formData.append("role", "voter");
    formData.append("image", image); 
    formData.append("wallet", address);

    try {
      const response = await axios.post('http://127.0.0.1:8000/register', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      {/* Background 3D Animation */}
      <div className="absolute inset-0 -z-10 bg-transparent">
        <Spline scene="https://prod.spline.design/57w2GHQT9RkWLs-s/scene.splinecode" />
      </div>

      {/* Registration Container */}
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-lg bg-transparent shadow-xl p-8 rounded-lg border border-white/30">
          <h3 className="text-3xl font-bold text-white text-center mb-4">
            Register as a Voter
          </h3>
          <p className="text-center text-gray-200 mb-6">
            Please fill in the details to create your account.
          </p>

          {error && (
            <p className="text-red-400 text-sm text-center mb-2">{error}</p>
          )}

          {/* Registration Form */}
          <form onSubmit={RegisterUser} className="space-y-4">
            <input
              type="text"
              placeholder="Voter ID"
              value={voterID}
              onChange={(e) => setVoterID(e.target.value)}
              className="w-full p-3 bg-transparent border border-gray-300 rounded-lg text-white placeholder-gray-300"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-transparent border border-gray-300 rounded-lg text-white placeholder-gray-300"
            />

            {/* Image Upload */}
            <div className="flex flex-col items-center space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file);
                    setPreview(URL.createObjectURL(file)); 
                  }
                }}
                className="block w-full text-sm text-gray-300
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white
                  hover:file:bg-blue-700"
              />

              {/* Show Preview if Image Exists */}
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg border border-gray-400 shadow-md"
                />
              )}
            </div>
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
              REGISTER
            </button>
          </form>

          {/* Already have an account? */}
          <p className="text-center text-gray-200 mt-4 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-300 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VoterRegister;
