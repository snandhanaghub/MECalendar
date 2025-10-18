import React from 'react';
import { Mail, Phone, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section style={{ 
      padding: '5rem 2rem', 
      backgroundColor: '#2b2d42', 
      color: 'white',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center'
    }} id="contact">
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem', 
            color: '#ffffff', 
            fontWeight: 800,
            fontFamily: 'Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif'
          }}>Get In Touch</h2>
          <p style={{ 
            fontSize: '1.3rem', 
            color: 'rgba(255, 255, 255, 0.8)', 
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Have questions about MECalendar? We'd love to hear from you!
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Contact Information */}
          <div>
            <h3 style={{ 
              fontSize: '2rem', 
              marginBottom: '2rem', 
              color: '#ef233c',
              fontWeight: 700
            }}>Contact Information</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(239, 35, 60, 0.1)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(239, 35, 60, 0.3)'
                }}>
                  <Mail size={24} color="#ef233c" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Email</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>info@mecalendar.edu</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(239, 35, 60, 0.1)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(239, 35, 60, 0.3)'
                }}>
                  <Phone size={24} color="#ef233c" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Phone</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>+91 484 257 5779</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(239, 35, 60, 0.1)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(239, 35, 60, 0.3)'
                }}>
                  <Clock size={24} color="#ef233c" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Office Hours</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>
                    Mon - Fri: 9:00 AM - 5:00 PM<br />
                    Sat: 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>
            
            {/* Google Maps */}
            <div style={{ marginTop: '2rem' }}>
              <h4 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#ef233c'
              }}>Our Location</h4>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '1rem',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <a 
                  href="https://www.google.com/maps/dir//28HH%2B8CR,+Model+Engineering+College+Road,+Karimakkad,+Thrikkakara,+Edappally,+Kochi,+Kerala+682021/@10.0283535,76.2461105,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b080c5006491601:0xcf23e14245d4694d!2m2!1d76.3285124!2d10.0283637?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.02)';
                    e.target.style.boxShadow = '0 10px 30px rgba(239, 35, 60, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <img
                    src="https://maps.googleapis.com/maps/api/staticmap?center=10.0147764,76.343114&zoom=16&size=600x300&maptype=roadmap&markers=color:red%7Clabel:M%7C10.0147764,76.343114&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dF8XS4dS2_Vbhw&style=feature:administrative%7Celement:geometry%7Ccolor:0x2b2d42&style=feature:administrative%7Celement:labels.text.fill%7Ccolor:0xffffff&style=feature:landscape%7Celement:all%7Ccolor:0x1a1c2e&style=feature:poi%7Celement:all%7Cvisibility:off&style=feature:road%7Celement:all%7Csaturation:-100%7Clightness:45&style=feature:road.highway%7Celement:all%7Cvisibility:simplified&style=feature:road.arterial%7Celement:labels.icon%7Cvisibility:off&style=feature:transit%7Celement:all%7Cvisibility:off&style=feature:water%7Celement:all%7Ccolor:0x46bcec%7Cvisibility:on"
                    alt="Model Engineering College Location - Click to open in Google Maps"
                    style={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '2.5rem',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ 
              fontSize: '2rem', 
              marginBottom: '2rem', 
              color: '#ef233c',
              fontWeight: 700
            }}>Send us a Message</h3>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="First Name"
                  style={{
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                />
                <input 
                  type="text" 
                  placeholder="Last Name"
                  style={{
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <input 
                type="email" 
                placeholder="Your Email"
                style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem'
                }}
              />
              
              <input 
                type="text" 
                placeholder="Subject"
                style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem'
                }}
              />
              
              <textarea 
                rows="5" 
                placeholder="Your Message"
                style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
              
              <button 
                type="submit"
                style={{
                  background: '#ef233c',
                  color: 'white',
                  border: 'none',
                  padding: '1.2rem 2rem',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;