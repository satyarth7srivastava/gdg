import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import AuthLayout from "../../layout/AuthLayout";
import Cam from "../../components/WebCam/CAM"; // Import Webcam Component

const VoterRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null); 
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const RegisterUser = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !username || !phone || !address || !image) {
      setError("All fields are required, including the image!");
      return;
    }

    setError("");
    console.log("User Registered:", { name, email, username, phone, address, image });
    navigate("/dashboard"); 
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

          {error && <p className="text-red-400 text-sm text-center mb-2">{error}</p>}

          {/* Registration Form */}
          <form onSubmit={RegisterUser} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-transparent border border-gray-300 rounded-lg text-white placeholder-gray-300"
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-transparent border border-gray-300 rounded-lg text-white placeholder-gray-300"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-transparent border border-gray-300 rounded-lg text-white placeholder-gray-300"
            />

            {/* Webcam Component */}
            <div className="text-white">
              <h4 className="text-lg font-semibold mb-2">Capture Image</h4>
              <Cam setImage={setImage} />
            </div>

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
