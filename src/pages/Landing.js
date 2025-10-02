import React from 'react';
import Navbar from '../components/common/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import About from '../components/landing/About';
import Contact from '../components/landing/Contact';
import Footer from '../components/common/Footer';
import '../styles/Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;