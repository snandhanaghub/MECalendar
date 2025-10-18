import React from 'react';
import '../../styles/Home.css';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-poster">{event.poster ? <img src={event.poster} alt={event.name} /> : <div className="poster-placeholder">Poster</div>}</div>
      <div className="event-body">
        <h3 className="event-title">{event.name}</h3>
        <p className="event-desc">{event.description}</p>
        <div className="event-meta">
          <span>{event.date} • {event.time}</span>
          <span>{event.venue}</span>
          <span>By {event.organizer}</span>
        </div>
        <div className="event-tags">
          {event.tags.map(t => (
            <span key={t} className="tag badge-red">{t}</span>
          ))}
        </div>
        <div className="event-actions">
          <a className="btn" href={`/event/${event.id}`}>View Details</a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
