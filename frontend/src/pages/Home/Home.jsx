import React from "react";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const Home = () => {
  return (
    <div className="relative min-h-screen text-gray-900 flex flex-col">
      {/* 3D Animation Background */}
      <div className="absolute inset-0 -z-10">
      <Spline scene="https://prod.spline.design/57w2GHQT9RkWLs-s/scene.splinecode" />
      </div>
      
      {/* Navbar */}
      <nav className="bg-blue-600 bg-opacity-80 p-4 shadow-md relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Blockchain Voting System</h1>
          <div>
            <Link to="/login" className="text-white px-4 py-2 bg-green-500 rounded-lg">Login </Link>
            <Link to="/admin-login" className="text-white px-4 py-2 bg-green-500 rounded-lg">Admin Login</Link>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center text-center py-20 text-white z-10  bg-transparent p-6 rounded-lg">
        <h2 className="text-4xl font-bold mb-4">Secure & Transparent Voting with Blockchain</h2>
        <p className="text-lg mb-6">Vote with trust, powered by blockchain security.</p>
        <Link to="/register" className="px-6 py-3 bg-green-500 rounded-lg text-lg font-semibold">Get Started</Link>
      </header>
      
      
      <section className="container mx-auto py-16 px-6 relative z-10">
        <h3 className="text-2xl font-bold text-center mb-8 text-white">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6  bg-transparent shadow-lg rounded-lg text-center text-white">
            <h4 className="text-xl font-semibold mb-2 text-white">1. Register</h4>
            <p>Sign up and verify your identity with QR code and facial recognition.</p>
          </div>
          <div className="p-6 bg-transparent shadow-lg rounded-lg text-center text-white">
            <h4 className="text-xl font-semibold mb-2 text-white">2. Vote Securely</h4>
            <p>Choose your candidate and vote securely via blockchain.</p>
          </div>
          <div className="p-6 bg-transparent shadow-lg rounded-lg text-center text-white">
            <h4 className="text-xl font-semibold mb-2 text-white">3. Verify</h4>
            <p>Check the blockchain for transparency and auditability.</p>
          </div>
        </div>
      </section>
      
      {/* Election Stats */}
      <section className="bg-transparent py-12 relative z-10">
        <div className="container mx-auto text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Live Election Stats</h3>
          <p className="text-lg">Total Votes: <span className="font-semibold">15,230</span></p>
          <p className="text-lg">Registered Voters: <span className="font-semibold">25,000</span></p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="text-center py-6 bg-blue-600 bg-opacity-80 text-white mt-10 relative z-10">
        <p>&copy; 2025 Blockchain Voting System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
