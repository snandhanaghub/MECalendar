import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: '#2b2d42',
      color: 'white',
      padding: '2rem',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <p style={{
          margin: 0,
          fontSize: '0.9rem',
          opacity: 0.8
        }}>
          © 2025 MECalendar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
