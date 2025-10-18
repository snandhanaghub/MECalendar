import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Home.css';
import DUMMY_EVENTS from '../../data/events';

const SubscribedEvents = () => {
  const navigate = useNavigate();
  const [, setSubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [tab, setTab] = useState('upcoming'); // upcoming | ongoing | past

  useEffect(() => {
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    setSubs(subscriptions);
    const stored = JSON.parse(localStorage.getItem('events') || 'null');
    const list = Array.isArray(stored) && stored.length ? stored : DUMMY_EVENTS;
    setEvents(list.filter(e => subscriptions.includes(e.id)));
  }, []);

  const now = new Date();
  const filtered = events.filter(ev => {
    if (!ev.datetime) return tab === 'upcoming';
    const when = new Date(ev.datetime);
    const end = ev.endDatetime ? new Date(ev.endDatetime) : new Date(when.getTime() + 2 * 60 * 60 * 1000);
    if (tab === 'upcoming') return when > now;
    if (tab === 'ongoing') return when <= now && end >= now;
    if (tab === 'past') return end < now;
    return true;
  });

  const handleUnsubscribe = (id) => {
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    const updated = subscriptions.filter(s => s !== id);
    localStorage.setItem('subscriptions', JSON.stringify(updated));
    setSubs(updated);
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="home-main">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>Subscribed Events</h2>
        <div>
          <select value={tab} onChange={e => setTab(e.target.value)}>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>

      <div style={{marginTop:16}}>
        {filtered.length === 0 && <div className="no-events">No subscribed events</div>}
        <div className="events-grid" style={{marginTop:12}}>
          {filtered.map(ev => (
            <div className="event-card" key={ev.id}>
              <div className="event-poster">{ev.poster ? <img src={ev.poster} alt={ev.name} /> : <div className="poster-placeholder">Poster</div>}</div>
              <div className="event-body">
                <h3>{ev.name}</h3>
                <div className="event-meta">{ev.datetime ? new Date(ev.datetime).toLocaleString() : '—'} • {ev.organizer}</div>
                <p className="event-desc" style={{marginTop:8}}>{ev.description}</p>
                <div style={{display:'flex', gap:8, marginTop:12}}>
                  <button className="btn" onClick={() => handleUnsubscribe(ev.id)}>Unsubscribe</button>
                  <button className="btn" onClick={() => navigate(`/event/${ev.id}`)}>Go to event</button>
                </div>
                <div style={{marginTop:8, color:'rgba(0,0,0,0.6)'}}>
                  Reminder set for 24 hours before
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscribedEvents;
