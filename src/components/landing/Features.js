import React from 'react';
import { Zap, Calendar, Trophy, Settings } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Quick Event Registration",
      description: "Register for events with just a few clicks. Never miss out on exciting campus activities.",
      detailedDescription: "Streamlined registration process with instant confirmation, calendar integration, and automatic reminders. Browse events by category, date, or department and secure your spot in seconds.",
      icon: Zap,
      color: "#ef233c"
    },
    {
      title: "Discover Campus Fests",
      description: "Stay updated with all cultural, technical, and sports events happening across the college.",
      detailedDescription: "Comprehensive event discovery with advanced filters, personalized recommendations, and real-time updates. Explore cultural festivals, technical symposiums, sports competitions, and academic conferences all in one place.",
      icon: Calendar,
      color: "#2b2d42"
    },
    {
      title: "Earn Participation Points",
      description: "Get rewarded for your active participation in college events and competitions.",
      detailedDescription: "Gamified participation system with points, badges, and leaderboards. Track your involvement across different event categories, compete with peers, and unlock exclusive rewards and recognition certificates.",
      icon: Trophy,
      color: "#ef233c"
    },
    {
      title: "Organize with Ease",
      description: "Create and manage events effortlessly with our intuitive event management tools.",
      detailedDescription: "Professional event management suite with venue booking, participant tracking, automated notifications, and comprehensive analytics. Perfect for clubs, departments, and student organizations.",
      icon: Settings,
      color: "#2b2d42"
    }
  ];

  return (
    <section style={{ 
      padding: '5rem 2rem', 
      backgroundColor: '#f8f9fa', 
      color: '#2b2d42',
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif"
    }} id="features">
      <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '1.5rem', 
            color: '#2b2d42', 
            fontWeight: 800,
            fontFamily: "'Poppins', 'Inter', sans-serif",
            letterSpacing: '-0.02em'
          }}>Why Choose MECalendar?</h2>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#6c757d', 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: 400
          }}>Discover the comprehensive features that make campus event management effortless and engaging</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem', marginTop: '4rem' }}>
          {features.map((feature, index) => (
            <div key={index} style={{ 
              padding: '2.5rem 2rem', 
              background: 'white', 
              borderRadius: '20px', 
              border: '1px solid #e9ecef',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
              cursor: 'pointer',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.08)';
            }}
            >
              {/* Custom Icon */}
              <div style={{ 
                width: '70px',
                height: '70px',
                background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
                boxShadow: `0 8px 25px ${feature.color}40`
              }}>
                <feature.icon size={32} color="white" strokeWidth={2} />
              </div>
              
              {/* Content */}
              <h3 style={{ 
                fontSize: '1.6rem', 
                marginBottom: '1rem', 
                color: '#2b2d42', 
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                lineHeight: '1.3'
              }}>{feature.title}</h3>
              
              <p style={{ 
                color: '#6c757d', 
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                fontSize: '1rem',
                fontWeight: 500
              }}>{feature.description}</p>
              
              {/* Detailed Description */}
              <p style={{ 
                color: '#8e9aaf', 
                lineHeight: '1.7',
                fontSize: '0.9rem',
                fontWeight: 400,
                paddingTop: '1rem',
                borderTop: `1px solid #f1f3f5`
              }}>{feature.detailedDescription}</p>
              
              {/* Decorative Element */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: `linear-gradient(135deg, ${feature.color}15, transparent)`,
                borderRadius: '0 20px 0 100px'
              }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
