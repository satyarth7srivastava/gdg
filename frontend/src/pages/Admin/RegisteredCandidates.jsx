import React, { useEffect, useState } from "react";
import axios from "axios";
import Spline from "@splinetool/react-spline";
import { API_PATH } from "../../utils/apiPath";

import { ethers } from "ethers";
import votingArtifacts from "../../../blockchain/build/contracts/Voting.json";
import address from "../../../blockchain/contractAddress.json";

const RegisteredCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        var candidateList = [];
        const candidateCount = await contract.getCountCandidates();
        for (let i = 0; i < candidateCount; i++) {
          const candidate = await contract.getCandidate(i+1);
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
        }else{
          setError("No candidates registered yet.");
        }
      } catch (err) {
        setError("Failed to fetch candidates. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-4xl bg-white bg-opacity-10 backdrop-blur-xl shadow-xl p-6 rounded-lg border border-white/30">
        <h2 className="text-3xl font-bold text-center mb-6">Registered Candidates</h2>

        {loading ? (
          <p className="text-center text-gray-300">Loading candidates...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : candidates.length === 0 ? (
          <p className="text-center text-gray-300">No candidates registered yet.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-400 text-center">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-400 p-3">Name</th>
                <th className="border border-gray-400 p-3">Party</th>
                <th className="border border-gray-400 p-3">Votes</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index} className="bg-gray-700 hover:bg-gray-600 transition">
                  <td className="border border-gray-400 p-3">{candidate.candidateName}</td>
                  <td className="border border-gray-400 p-3">{candidate.party}</td>
                  <td className="border border-gray-400 p-3">{candidate.vote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RegisteredCandidates;
