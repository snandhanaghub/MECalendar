import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/Home.css';
import DUMMY_EVENTS from '../../data/events';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // try localStorage first, then fallback to bundled data
    const stored = JSON.parse(localStorage.getItem('events') || 'null');
    const list = Array.isArray(stored) && stored.length ? stored : DUMMY_EVENTS;
    const found = list.find(e => e.id === id);
    setEvent(found || null);
  }, [id]);

  if (!event) {
    return (
      <div className="event-details empty">
        <p>Event not found.</p>
      </div>
    );
  }

  const calendarHref = (() => {
    // Create a simple Google Calendar event insert URL (dates in YYYYMMDD format)
    try {
      const start = event.date.replace(/-/g, '') + 'T' + event.time.replace(':', '') + '00Z';
      // For simplicity use same end +2 hours
      const end = event.date.replace(/-/g, '') + 'T' + (Number(event.time.split(':')[0]) + 2).toString().padStart(2, '0') + event.time.split(':')[1] + '00Z';
      const details = encodeURIComponent(event.description || '');
      const location = encodeURIComponent(event.venue || '');
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${start}/${end}&details=${details}&location=${location}`;
    } catch (e) {
      return '#';
    }
  })();

  const handleSubscribe = () => {
    // Simple subscription mock: save event id to localStorage.subscriptions
    const subs = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    if (!subs.includes(event.id)) {
      subs.push(event.id);
      localStorage.setItem('subscriptions', JSON.stringify(subs));
      setSubscribed(true);
    }
  };

  const role = localStorage.getItem('role') || 'student';

  const handleApprove = (approve) => {
    // Update stored events if present
    const stored = JSON.parse(localStorage.getItem('events') || 'null');
    if (Array.isArray(stored)) {
      const idx = stored.findIndex(e => e.id === event.id);
      if (idx > -1) {
        stored[idx].status = approve ? 'approved' : 'rejected';
        localStorage.setItem('events', JSON.stringify(stored));
        setEvent({ ...event, status: stored[idx].status });
        return;
      }
    }
    // otherwise just update local state
    setEvent({ ...event, status: approve ? 'approved' : 'rejected' });
  };

  return (
    <div className="event-details">
      <div className="event-banner">
        {event.poster ? <img src={event.poster} alt={event.name} /> : <div className="poster-placeholder large">Poster</div>}
      </div>
      <div className="event-meta-card">
        <h2>{event.name} <span className="muted">• {event.type}</span></h2>
        <p className="muted">By {event.organizer}</p>

        <div className="event-tags" style={{marginTop:8}}>
          {event.tags.map(t => <span key={t} className="tag badge-red">{t}</span>)}
        </div>

        <p className="event-desc" style={{marginTop:12}}>{event.description}</p>

        <div className="event-info" style={{marginTop:12}}>
          <div><strong>Date:</strong> {event.date}</div>
          <div><strong>Time:</strong> {event.time}</div>
          <div><strong>Venue:</strong> {event.venue}</div>
          {/* registration link moved to action buttons for prominence */}
          <div><strong>Registration:</strong> {event.registration ? 'Available' : '—'}</div>
          <div><strong>Contact:</strong> {event.contact || '—'}</div>
        </div>

        <div className="event-actions" style={{marginTop:16}}>
          {event.registration && (
            <a className="btn btn-register" href={event.registration} target="_blank" rel="noreferrer">Complete your Registration</a>
          )}
          <a className="btn" href={calendarHref} target="_blank" rel="noreferrer">Add to Google Calendar</a>
          <button className="btn" onClick={handleSubscribe} disabled={subscribed}>{subscribed ? 'Subscribed' : 'Get Email Notification'}</button>
          {['cr','coordinator','moderator'].includes(role) && (
            <>
              <button className="btn btn-approve" onClick={() => handleApprove(true)}>Approve</button>
              <button className="btn btn-reject" onClick={() => handleApprove(false)}>Reject</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
