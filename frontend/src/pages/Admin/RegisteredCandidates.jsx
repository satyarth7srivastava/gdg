import React, { useEffect, useState } from "react";

const RegisteredCandidates = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Fetch registered candidates from localStorage
    const storedCandidates = JSON.parse(localStorage.getItem("candidates")) || [];
    setCandidates(storedCandidates);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-4xl bg-white bg-opacity-10 backdrop-blur-xl shadow-xl p-6 rounded-lg border border-white/30">
        <h2 className="text-3xl font-bold text-center mb-6">Registered Candidates</h2>

        {candidates.length === 0 ? (
          <p className="text-center text-gray-300">No candidates registered yet.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-400 text-center">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-400 p-3">Name</th>
                <th className="border border-gray-400 p-3">Party</th>
                <th className="border border-gray-400 p-3">Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index} className="bg-gray-700 hover:bg-gray-600 transition">
                  <td className="border border-gray-400 p-3">{candidate.candidateName}</td>
                  <td className="border border-gray-400 p-3">{candidate.party}</td>
                  <td className="border border-gray-400 p-3">{candidate.dob}</td>
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
