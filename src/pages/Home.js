import React from 'react';
import Navbar from '../components/common/Navbar';
import Events from '../components/home/Events';
import Footer from '../components/common/Footer';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <div className="home-content">
        <div className="home-hero">
          <div className="home-hero-content">
            <h1 className="home-title">Welcome to Campus Pulse</h1>
            <p className="home-subtitle">Your gateway to all events at GMEC</p>
          </div>
        </div>
        <Events />
      </div>
      <Footer />
    </div>
  );
};

export default Home;