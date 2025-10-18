import React, { useState, useEffect } from 'react';
import '../../styles/landing/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="navbar-logo">
          <div className="me-calendar-container">
            <img src="/assets/logoMECalsmol.png" alt="ME Calendar" className="me-calendar-image" />
            <span className="me-calendar-text">
              <span className="me-text">ME</span>
              <span className="calendar-text">Calendar</span>
            </span>
          </div>
        </a>
        
        <div className="navbar-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#home" className="mobile-nav-link">Home</a>
            <a href="#features" className="mobile-nav-link">Features</a>
            <a href="#about" className="mobile-nav-link">About</a>
            <a href="#contact" className="mobile-nav-link">Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
