import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

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
                  <MapPin size={24} color="#ef233c" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Address</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>
                    Model Engineering College<br />
                    Thrikkakara, Ernakulam<br />
                    Kerala 682021, India
                  </p>
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