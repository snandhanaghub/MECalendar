import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react';
import '../../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img 
                src="/assets/logo-white.png" 
                alt="Campus Pulse" 
                className="footer-logo-image"
              />
              <span className="footer-logo-text">Campus Pulse</span>
            </div>
            <p className="footer-tagline">
              Connecting students, events, and experiences at Government Model Engineering College.
            </p>
            <div className="footer-stats">
              <div className="footer-stat">
                <span className="stat-num">4000+</span>
                <span className="stat-desc">Students</span>
              </div>
              <div className="footer-stat">
                <span className="stat-num">100+</span>
                <span className="stat-desc">Events</span>
              </div>
              <div className="footer-stat">
                <span className="stat-num">15+</span>
                <span className="stat-desc">Clubs</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-section-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home" className="footer-link">Home</a></li>
              <li><a href="#features" className="footer-link">Features</a></li>
              <li><a href="#events" className="footer-link">Events</a></li>
              <li><a href="#about" className="footer-link">About</a></li>
              <li><a href="#contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Events */}
          <div className="footer-section">
            <h3 className="footer-section-title">Events</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Upcoming Events</a></li>
              <li><a href="#" className="footer-link">Cultural Fest</a></li>
              <li><a href="#" className="footer-link">Tech Symposium</a></li>
              <li><a href="#" className="footer-link">Sports Meet</a></li>
              <li><a href="#" className="footer-link">Workshop Series</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3 className="footer-section-title">Support</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">Event Guidelines</a></li>
              <li><a href="#" className="footer-link">Registration Help</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-section-title">Get in Touch</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <Mail size={16} />
                <span>info@campuspulse.gmec.edu</span>
              </div>
              <div className="contact-item">
                <span>📞</span>
                <span>+91 484 123 4567</span>
              </div>
              <div className="contact-item">
                <span>📍</span>
                <span>GMEC, Thrikkakara, Kochi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media and Newsletter */}
        <div className="footer-bottom-section">
          <div className="newsletter">
            <h3 className="newsletter-title">Stay Updated</h3>
            <p className="newsletter-desc">Subscribe to get notified about upcoming events and announcements.</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>

          <div className="social-section">
            <h3 className="social-title">Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-link" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" title="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" title="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" title="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="social-link" title="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <div className="copyright-left">
            <p>© {currentYear} Campus Pulse - Government Model Engineering College. All rights reserved.</p>
          </div>
          <div className="copyright-right">
            <a href="#" className="copyright-link">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#" className="copyright-link">Terms of Service</a>
            <span className="separator">|</span>
            <a href="#" className="copyright-link">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="footer-decorations">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </footer>
  );
};

export default Footer;