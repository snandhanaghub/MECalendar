import React from 'react';
import Navbar from '../landing/Navbar';
import Hero from '../landing/Hero';
import Features from '../landing/Features';
import About from '../landing/About';
import Contact from '../landing/Contact';

const Landing = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Contact />
    </div>
  );
};

export default Landing;