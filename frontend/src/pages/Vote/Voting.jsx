import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const Voting = () => {
  const navigate = useNavigate(); 

  // 🗳️ State to store registered candidates
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState("");

  
  useEffect(() => {
    const fetchCandidates = async () => {
      const mockCandidates = [
        { id: 1, name: "Narendra Modi", party: "Bhartiya Janta Party" },
        { id: 2, name: "Rahul Gandhi", party: "Congress" },
      ];
      setCandidates(mockCandidates);
    };

    fetchCandidates();
  }, []);

  
  const handleVote = () => {
    if (!selectedCandidate) {
      alert("⚠️ Please select a candidate to vote!");
      return;
    }

    if (voted) {
      alert("❌ You have already voted!");
      return;
    }

    setVoted(true);
    alert(`✅ Vote Cast Successfully for ${selectedCandidate}!`);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* 🌟 3D Spline Animation Background */}
      <div className="absolute inset-0 -z-10">
        <Spline scene="https://prod.spline.design/57w2GHQT9RkWLs-s/scene.splinecode" />
      </div>

      {/* 🎯 Voting Panel */}
      <div className="w-full max-w-md bg-transparent shadow-lg p-6 rounded-lg border border-white/30 text-white">
        <h2 className="text-3xl font-bold text-center mb-4">🗳️ Voting Panel</h2>
        <p className="text-center text-gray-300 mb-6">Select a candidate and cast your vote</p>

        {candidates.length > 0 ? (
          <ul className="space-y-3">
            {candidates.map((candidate) => (
              <li
                key={candidate.id}
                className={`p-3 rounded-lg cursor-pointer ${
                  selectedCandidate === candidate.name ? "bg-blue-600" : "bg-gray-800"
                } hover:bg-blue-500 transition`}
                onClick={() => setSelectedCandidate(candidate.name)}
              >
                <span className="font-semibold">{candidate.name}</span> - {candidate.party}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-300">No candidates registered yet.</p>
        )}

        {/* 🗳️ Vote Button */}
        <button
          onClick={handleVote}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg mt-4 transition-all font-semibold"
        >
          CAST VOTE
        </button>

        {voted && (
          <>
            <p className="mt-3 text-green-400 text-center">✔️ You have successfully voted!</p>

            {/* 🔙 Go Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-lg mt-4 transition-all font-semibold"
            >
              GO BACK
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Voting;
