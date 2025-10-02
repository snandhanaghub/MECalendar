import React from 'react';
import Navbar from './components/common/Navbar';
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';
import About from './components/landing/About';
import Contact from './components/landing/Contact';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Contact />
    </div>
  );
}

export default App;
