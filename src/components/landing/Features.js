import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Quick Event Registration",
      description: "Register for events with just a few clicks. Never miss out on exciting campus activities.",
      icon: "🚀"
    },
    {
      title: "Discover Campus Fests",
      description: "Stay updated with all cultural, technical, and sports events happening across the college.",
      icon: "🎉"
    },
    {
      title: "Stay Notified",
      description: "Never miss an event! Get instant updates on all campus activities and competitions.",
      icon: "🔔"
    },
    {
      title: "Organize with Ease",
      description: "Create and manage events effortlessly with our intuitive event management tools.",
      icon: "⚡"
    }
  ];

  return (
    <section style={{ padding: '4rem 2rem', backgroundColor: '#f8f9fa', color: '#2b2d42' }} id="features">
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#2b2d42', fontWeight: 800 }}>Why Choose MECalendar?</h2>
          <p style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>Discover the features that make campus event management effortless</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginTop: '3rem' }}>
          {features.map((feature, index) => (
            <div key={index} style={{ 
              padding: '2rem', 
              background: 'white', 
              borderRadius: '15px', 
              border: '1px solid #e9ecef',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2b2d42', fontWeight: 700 }}>{feature.title}</h3>
              <p style={{ color: '#6c757d', lineHeight: '1.6' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
