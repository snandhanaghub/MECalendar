import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Facebook, Twitter, Linkedin, Drama, Monitor, Trophy, Target } from 'lucide-react';
import '../../styles/landing/Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        {/* Left Side - Dark */}
        <div className="hero-left">
          {/* Social Media Container */}
          <div className="social-media-container">
            <a href="https://mec.ac.in" target="_blank" rel="noopener noreferrer" className="social-button website-btn">
              <Globe size={16} />
            </a>
            <a href="https://www.facebook.com/modelengineeringcollege" target="_blank" rel="noopener noreferrer" className="social-button facebook-btn">
              <Facebook size={16} />
            </a>
            <a href="https://x.com/MECKochi" target="_blank" rel="noopener noreferrer" className="social-button twitter-btn">
              <Twitter size={16} />
            </a>
            <a href="https://www.linkedin.com/school/model-engineering-college/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="social-button linkedin-btn">
              <Linkedin size={16} />
            </a>
          </div>
          
          <div className="hero-content">
            <h1 className="hero-title">
              Your College Events, All in One Place.
            </h1>
            <p className="hero-subtitle">
              Discover, Register, and Manage Events Effortlessly at Govt Model Engineering College.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">4000+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat">
                <span className="stat-number">100+</span>
                <span className="stat-label">Events</span>
              </div>
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">Clubs</span>
              </div>
            </div>
            <div className="hero-buttons">
              <Link to="/login" className="hero-login">Log In</Link>
              <Link to="/signup" className="hero-signup">Sign Up</Link>
            </div>
          </div>
        </div>

        {/* Right Side - Light */}
        <div className="hero-right">
          <div className="hero-image-container">
            <img 
              src="/assets/bg.jpg" 
              alt="Background" 
              className="hero-image"
            />
            <div className="hero-overlay"></div>
            <div className="floating-elements">
              <div className="floating-card event-card">
                <div className="event-icon">
                  <Drama size={18} />
                </div>
                <div className="event-info">
                  <span className="event-name">Cultural Fest 2025</span>
                  <span className="event-date">Dec 15-17</span>
                  <span className="event-location">Main Campus</span>
                  <span className="event-attendees">800+ Registered</span>
                </div>
              </div>
              <div className="floating-card tech-card">
                <div className="event-icon">
                  <Monitor size={18} />
                </div>
                <div className="event-info">
                  <span className="event-name">Tech Symposium</span>
                  <span className="event-date">Jan 20</span>
                  <span className="event-location">Auditorium</span>
                  <span className="event-attendees">500+ Registered</span>
                </div>
              </div>
              <div className="floating-card sports-card">
                <div className="event-icon">
                  <Trophy size={18} />
                </div>
                <div className="event-info">
                  <span className="event-name">Sports Meet</span>
                  <span className="event-date">Feb 5-7</span>
                  <span className="event-location">Sports Complex</span>
                  <span className="event-attendees">300+ Registered</span>
                </div>
              </div>
              <div className="floating-card workshop-card">
                <div className="event-icon">
                  <Target size={18} />
                </div>
                <div className="event-info">
                  <span className="event-name">Workshop Series</span>
                  <span className="event-date">Every Friday</span>
                  <span className="event-location">Seminar Hall</span>
                  <span className="event-attendees">50+ Registered</span>
                </div>
              </div>
              <div className="floating-card more-card">
                <span className="more-text">+5 new notifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
