import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Home.css';
import DUMMY_EVENTS from '../../data/events';

const ManagedEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('upcoming'); // upcoming | past | draft

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('events') || 'null');
    const list = Array.isArray(stored) && stored.length ? stored : DUMMY_EVENTS;
    setEvents(list);
  }, []);

  const role = (localStorage.getItem('role') || '').toLowerCase();
  const canCreate = role.includes('club') || role.includes('secretary') || role === 'clubrep';

  const goCreate = () => navigate('/submit');

  const handleEdit = (id) => {
    navigate(`/submit?edit=${encodeURIComponent(id)}`);
  };

  const handleView = (id) => {
    navigate(`/event/${id}`);
  };

  const handleClose = (id) => {
    const stored = JSON.parse(localStorage.getItem('events') || '[]');
    const idx = stored.findIndex(e => e.id === id);
    if (idx > -1) {
      stored[idx].status = 'closed';
      localStorage.setItem('events', JSON.stringify(stored));
      setEvents(stored);
    }
  };

  const filtered = events.filter(ev => {
    if (filter === 'draft') return ev.status === 'draft';
    // upcoming/past by datetime when available
    if (!ev.datetime) return filter === 'draft' ? ev.status === 'draft' : true;
    const when = new Date(ev.datetime);
    const now = new Date();
    if (filter === 'upcoming') return when >= now && ev.status !== 'closed';
    if (filter === 'past') return when < now;
    return true;
  });

  return (
    <div className="home-main">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>Managed Events</h2>
        <div>
          {canCreate && <button className="btn" onClick={goCreate} style={{marginRight:8}}>Create Event</button>}
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div style={{marginTop:16}}>
        {filtered.length === 0 && <div className="no-events">No events for this filter</div>}
        <div className="events-grid" style={{marginTop:12}}>
          {filtered.map(ev => (
            <div className="event-card" key={ev.id}>
              <div className="event-poster">{ev.poster ? <img src={ev.poster} alt={ev.name} /> : <div className="poster-placeholder">Poster</div>}</div>
              <div className="event-body">
                <h3>{ev.name}</h3>
                <div className="event-meta">{ev.datetime ? new Date(ev.datetime).toLocaleString() : '—'} • {ev.organizer}</div>
                <p className="event-desc" style={{marginTop:8}}>{ev.description}</p>
                <div style={{display:'flex', gap:8, marginTop:12}}>
                  <button className="btn" onClick={() => handleView(ev.id)}>View</button>
                  <button className="btn" onClick={() => handleEdit(ev.id)}>Edit</button>
                  <button className="btn" onClick={() => handleClose(ev.id)}>Close Event</button>
                  <button className="btn" onClick={() => handleView(ev.id)}>Participants</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagedEvents;
