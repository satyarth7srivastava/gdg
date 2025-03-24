import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "../src/index.css"
import Home from './pages/Home/Home';
//import HomePage from './pages/Home/HomePage';
import VoterLogin from './pages/Auth/VoterLogin';
import VoterRegister from './pages/Auth/VoterRegister';
import AdminLogin from './pages/Auth/AdminLogin';
import AddCandidate from './pages/Admin/AddCandidate';
import AdminHome from './pages/Admin/AdminHome';
import RegisteredCandidates from './pages/Admin/RegisteredCandidates';
import Voting from './pages/Vote/Voting';
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" exact element={<VoterLogin />} />
        <Route path="/register" exact element ={<VoterRegister/>} />
        <Route path ="/admin-login" exact element={<AdminLogin/>} />
        <Route path = "/add-candidate" exact element={<AddCandidate/>}/>
        <Route path = "/admin-home" exact element = {<AdminHome/>} />
        <Route path = "/registered-candidates" exact element={<RegisteredCandidates/>}/>
        <Route path = "/vote" exact element={<Voting/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App


