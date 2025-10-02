import React from 'react';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import '../../styles/Events.css';

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'TechFest 2025',
      date: 'Dec 15-17, 2024',
      time: '9:00 AM',
      location: 'Main Auditorium',
      category: 'Technical',
      image: '/assets/techfest.jpg',
      attendees: 500,
      organizer: 'Computer Science Club',
      description: 'The biggest technical symposium featuring coding competitions, tech talks, and innovation showcases.',
      isFeature: true
    },
    {
      id: 2,
      title: 'Cultural Carnival',
      date: 'Jan 20, 2025',
      time: '6:00 PM',
      location: 'Open Grounds',
      category: 'Cultural',
      image: '/assets/cultural.jpg',
      attendees: 800,
      organizer: 'Arts & Culture Club',
      description: 'A vibrant celebration of arts, music, dance, and cultural performances.',
      isFeature: false
    },
    {
      id: 3,
      title: 'Sports Championship',
      date: 'Feb 5-7, 2025',
      time: '8:00 AM',
      location: 'Sports Complex',
      category: 'Sports',
      image: '/assets/sports.jpg',
      attendees: 300,
      organizer: 'Sports Committee',
      description: 'Inter-departmental sports competition featuring various indoor and outdoor games.',
      isFeature: false
    },
    {
      id: 4,
      title: 'Entrepreneurship Summit',
      date: 'Feb 15, 2025',
      time: '10:00 AM',
      location: 'Seminar Hall',
      category: 'Business',
      image: '/assets/business.jpg',
      attendees: 200,
      organizer: 'E-Cell',
      description: 'Connect with successful entrepreneurs and learn about startup ecosystem.',
      isFeature: false
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Technical: '#3b82f6',
      Cultural: '#ef233c',
      Sports: '#10b981',
      Business: '#f59e0b'
    };
    return colors[category] || '#6b7280';
  };

  return (
    <section className="events" id="events">
      <div className="events-container">
        <div className="events-header">
          <h2 className="events-title">Upcoming Events Preview</h2>
          <p className="events-subtitle">
            Don't miss out on the exciting events happening at Govt Model Engineering College
          </p>
        </div>

        {/* Featured Event */}
        <div className="featured-event">
          <div className="featured-event-content">
            <div className="featured-left">
              <div className="event-category" style={{ backgroundColor: getCategoryColor(upcomingEvents[0].category) }}>
                {upcomingEvents[0].category}
              </div>
              <h3 className="featured-title">{upcomingEvents[0].title}</h3>
              <p className="featured-description">{upcomingEvents[0].description}</p>
              
              <div className="featured-details">
                <div className="detail-item">
                  <Calendar size={18} />
                  <span>{upcomingEvents[0].date}</span>
                </div>
                <div className="detail-item">
                  <MapPin size={18} />
                  <span>{upcomingEvents[0].location}</span>
                </div>
                <div className="detail-item">
                  <Users size={18} />
                  <span>{upcomingEvents[0].attendees}+ Expected</span>
                </div>
              </div>

              <button className="featured-cta">
                Register Now
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="featured-right">
              <div className="featured-image-container">
                <img 
                  src={upcomingEvents[0].image} 
                  alt={upcomingEvents[0].title}
                  className="featured-image"
                />
                <div className="featured-overlay">
                  <div className="organizer-info">
                    <span className="organizer-label">Organized by</span>
                    <span className="organizer-name">{upcomingEvents[0].organizer}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {upcomingEvents.slice(1).map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image-container">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="event-image"
                />
                <div className="event-badge" style={{ backgroundColor: getCategoryColor(event.category) }}>
                  {event.category}
                </div>
              </div>

              <div className="event-content">
                <h4 className="event-title">{event.title}</h4>
                <p className="event-description">{event.description}</p>

                <div className="event-meta">
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="event-footer">
                  <span className="event-organizer">by {event.organizer}</span>
                  <button className="event-cta">Know More</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events CTA */}
        <div className="events-cta-container">
          <button className="view-all-events">
            See All Events
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Events;