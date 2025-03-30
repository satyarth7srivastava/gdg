import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import axios from "axios";
import { API_PATH } from "../../utils/apiPath";

import { ethers } from "ethers";
import votingArtifacts from "../../../blockchain/build/contracts/Voting.json";
import address from "../../../blockchain/contractAddress.json";

const Voting = () => {
  const navigate = useNavigate();

  // 🗳️ State to store registered candidates
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [contractInstance, setContractInstance] = useState(null);

  // 📌 Fetch candidates from server
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(0);
        const contractAddress = address.Voting;
        const contract = new ethers.Contract(
          contractAddress,
          votingArtifacts.abi,
          signer
        );
        setContractInstance(contract);
        var candidateList = [];
        const candidateCount = await contract.getCountCandidates();
        for (let i = 0; i < candidateCount; i++) {
          const candidate = await contract.getCandidate(i + 1);
          const candidateData = {
            id: candidate[0],
            candidateName: candidate[1],
            party: candidate[2],
            vote: candidate[3],
          }
          candidateList.push(candidateData);
        }
        if (candidateList.length > 0) {
          setCandidates(candidateList);
        } else {
          setError("No candidates registered yet.");
        }
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError("Failed to fetch candidates. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // 🗳️ Handle Vote Submission
  const handleVote = async () => {
    if (!selectedCandidate) {
      alert("⚠️ Please select a candidate to vote!");
      return;
    }

    if (voted) {
      alert("❌ You have already voted!");
      return;
    }

    try {
      const tx = await contractInstance.vote(selectedCandidate);
      await tx.wait();
      alert(`✅ Vote Cast Successfully for ${selectedCandidate}!`);
    } catch (err) {
      alert("❌ Failed to cast vote. Please try again.");
    }
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

        {loading ? (
          <p className="text-center text-gray-300">Loading candidates...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : candidates.length > 0 ? (
          <ul className="space-y-3">
            {candidates.map((candidate) => (
              <li
                key={candidate.id}
                className={`p-3 rounded-lg cursor-pointer ${selectedCandidate === candidate.id ? "bg-blue-600" : "bg-gray-800"
                  } hover:bg-blue-500 transition`}
                onClick={() => setSelectedCandidate(candidate.id)}
              >
                <span className="font-semibold">{candidate.candidateName}</span> - {candidate.party}
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
          disabled={voted}
        >
          {voted ? "VOTED ✅" : "CAST VOTE"}
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
