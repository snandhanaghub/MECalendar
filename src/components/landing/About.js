import React from 'react';

const About = () => {
  return (
    <section style={{ 
      padding: '5rem 2rem', 
      backgroundColor: '#edf2f4', 
      color: '#2b2d42',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center'
    }} id="about">
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem', 
            color: '#2b2d42', 
            fontWeight: 800,
            fontFamily: 'Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif'
          }}>About MECalendar</h2>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#6c757d', 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Your ultimate companion for navigating college life at MEC
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '3rem', 
          marginTop: '4rem' 
        }}>
          <div style={{
            textAlign: 'left',
            padding: '2rem',
            background: 'white',
            borderRadius: '15px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ 
              fontSize: '1.8rem', 
              marginBottom: '1rem', 
              color: '#ef233c',
              fontWeight: 700
            }}>Our Mission</h3>
            <p style={{ 
              color: '#6c757d', 
              lineHeight: '1.7',
              fontSize: '1.1rem'
            }}>
              To streamline campus event management and enhance student engagement by providing 
              a centralized platform where students can discover, register for, and organize 
              college events seamlessly.
            </p>
          </div>
          
          <div style={{
            textAlign: 'left',
            padding: '2rem',
            background: 'white',
            borderRadius: '15px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ 
              fontSize: '1.8rem', 
              marginBottom: '1rem', 
              color: '#ef233c',
              fontWeight: 700
            }}>Why MECalendar?</h3>
            <p style={{ 
              color: '#6c757d', 
              lineHeight: '1.7',
              fontSize: '1.1rem'
            }}>
              Built specifically for Model Engineering College, MECalendar understands the unique 
              needs of our campus community. From cultural fests to technical symposiums, 
              we make sure you never miss out on what matters most.
            </p>
          </div>
        </div>
        

      </div>
    </section>
  );
};

export default About;