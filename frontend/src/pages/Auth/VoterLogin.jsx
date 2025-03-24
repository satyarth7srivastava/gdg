import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import Spline from "@splinetool/react-spline";

const VoterLogin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    try {
      if (!userName || !password) {
        setError("Both fields are required.");
        return;
      }
      setError("");

      if (userName === "voter123" && password === "password") {
        navigate("/vote");
      } else {
        setError("Invalid username or password.");
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
        <div className="w-full max-w-md bg-transparent  shadow-xl p-8 rounded-lg border border-white/30">
          <h3 className="text-3xl font-bold text-white text-center mb-4">
            Welcome Voter
          </h3>
          <p className="text-center text-gray-200 mb-6">
            Please enter your details to proceed
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              type="text"
              className="w-full p-3 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="w-full p-3 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}
      
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


{/* <backdrop-blur-lg></backdrop-blur-lg> */}