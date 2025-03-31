import React, { useState } from "react";
import Spline from "@splinetool/react-spline";

import { ethers } from "ethers";
import votingArtifacts from "../../../blockchain/build/contracts/Voting.json";
import address from "../../../blockchain/contractAddress.json";

const AddCandidate = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState("");


    const handleClick = async (e) => {
        e.preventDefault();

        if (!startDate || !endDate) {
            setError("⚠️ All fields are required!");
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(0);
        const contractAddress = address.Voting;
        const contract = new ethers.Contract(
            contractAddress,
            votingArtifacts.abi,
            signer
        );
        var startDate_formated = Date.parse(startDate) / 1000;
        var endDate_formated = Date.parse(endDate) / 1000;

        if (startDate_formated >= endDate_formated) {
            setError("⚠️ Start date must be before end date!");
            return;
        }
        contract.setDates(startDate_formated, endDate_formated).then((tx) => {
            return tx.wait();
        }
        ).then((receipt) => {
            alert("Dates set successfully!");
            setStartDate("");
            setEndDate("");
        }).catch((error) => {
            console.error("Error setting dates:", error);
            setError("⚠️ Failed to set dates. Please try again.");
        });
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

                <form onSubmit={handleClick} className="space-y-4">
                    <label
                        htmlFor="startDate"
                        className="text-gray-300 text-sm font-semibold"
                    >
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-3 bg-transparent text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                    <label
                        htmlFor="endDate"
                        className="text-gray-300 text-sm font-semibold"
                    >
                        End Date
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-3 bg-transparent text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all font-semibold shadow-md"
                    >
                        Set Date
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCandidate;
