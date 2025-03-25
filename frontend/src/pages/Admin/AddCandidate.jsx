import React, { useState } from "react";
import Spline from "@splinetool/react-spline";
import axios from "axios";
import { API_PATH } from "../../utils/apiPath";
const AddCandidate = () => {
  const [candidateName, setCandidateName] = useState("");
  const [party, setParty] = useState("");
  const [date, setdate] = useState("");
  const [error, setError] = useState("");

  const partyOptions = ["Party A", "Party B", "Party C", "Party D"];

  const handleCandidate = async (e) => {
    e.preventDefault();

    if (!candidateName || !party || !date) {
      setError("⚠️ All fields are required!");
      return;
    }

    setError("");

    alert(
      `✅ Candidate Registered Successfully!\n\n👤 Name: ${candidateName}\n🏛️ Party: ${party}\n📅 date: ${date}`
    );

    const response = await axios.post(API_PATH.AddCandidate, {
      candidateName,
      party,
      date,
    });
    console.log(response);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* 🎨 3D Spline Background */}
      <div className="absolute inset-0 -z-10">
        <Spline scene="https://prod.spline.design/57w2GHQT9RkWLs-s/scene.splinecode" />
      </div>

      {/* 📌 Glassmorphic Form Container */}
      <div className="w-full max-w-md bg-transparent shadow-xl p-8 rounded-2xl border border-white/30">
        <h3 className="text-3xl font-bold text-white text-center mb-4">
          Add Candidate
        </h3>
        <p className="text-center text-gray-300 mb-6">
          Fill in the details to register a new candidate
        </p>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleCandidate} className="space-y-4">
          <input
            type="text"
            placeholder="Candidate Name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            className="w-full p-3 bg-transparent text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300 transition"
          />

          <select
            value={party}
            onChange={(e) => setParty(e.target.value)}
            className="w-full p-3 bg-transparent text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="" className="text-black">
              Select Party
            </option>
            {partyOptions.map((partyName, index) => (
              <option key={index} value={partyName} className="text-black">
                {partyName}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
            className="w-full p-3 bg-transparent text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all font-semibold shadow-md"
          >
            ADD CANDIDATE
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
