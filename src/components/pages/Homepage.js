import React from 'react';

const Homepage = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #2b2d42 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '2rem',
      padding: '2rem'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        fontWeight: '700',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textAlign: 'center'
      }}>
        Welcome to MECalendar Dashboard!
      </h1>
      <p style={{ 
        fontSize: '1.2rem', 
        opacity: 0.8,
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        You have successfully logged in. This is your dashboard where you can manage events, view your calendar, and more.
      </p>
      <div style={{
        background: 'rgba(239, 35, 60, 0.1)',
        border: '1px solid rgba(239, 35, 60, 0.3)',
        padding: '1rem 2rem',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)'
      }}>
        <p style={{ margin: 0, color: '#ef233c', fontWeight: '600' }}>
          Dashboard features coming soon!
        </p>
      </div>
    </div>
  );
};

export default Homepage;