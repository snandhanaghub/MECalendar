import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './components/pages/Landing';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Homepage from './components/pages/Homepage';
import SubmitEvent from './components/pages/SubmitEvent';
import EventDetails from './components/pages/EventDetails';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';
import Profile from './components/pages/Profile';
import AdminDashboard from './components/pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Show navbar only on app pages (hide on landing / login / signup) */}
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/submit" element={<SubmitEvent />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  const hidePaths = ['/', '/login', '/signup'];
  if (hidePaths.includes(location.pathname)) return null;
  return <Navbar />;
}

export default App;
