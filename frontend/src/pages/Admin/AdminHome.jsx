import React from "react";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      
      {/* Background 3D Animation */}
      <div className="absolute inset-0 -z-10">
        <Spline scene="https://prod.spline.design/57w2GHQT9RkWLs-s/scene.splinecode" />
      </div>

      {/* Admin Card */}
      <div className="w-full max-w-2xl bg-transparent shadow-lg p-8 rounded-xl border border-white/20 text-center">
        
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-300 text-lg mb-6">
          Manage candidates efficiently from here.
        </p>

        {/* Buttons */}
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate("/add-candidate")}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-all text-white text-lg font-semibold rounded-lg shadow-md"
          >
            ➕ Add Candidate
          </button>
          
          <button
            onClick={() => navigate("/registered-candidates")}
            className="w-full py-3 bg-green-600 hover:bg-green-700 transition-all text-white text-lg font-semibold rounded-lg shadow-md"
          >
            📋 View Registered Candidates
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
