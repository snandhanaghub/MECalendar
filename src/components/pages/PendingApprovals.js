import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Home.css';
import DUMMY_EVENTS from '../../data/events';

const PendingApprovals = () => {
  const [events, setEvents] = useState([]);
  const [comments, setComments] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('events') || 'null');
    const list = Array.isArray(stored) && stored.length ? stored : DUMMY_EVENTS;
    // filter only pending
    setEvents(list.filter(e => e.status === 'pending' || !e.status));
  }, []);

  const role = localStorage.getItem('role') || 'student';
  const allowed = ['cr', 'coordinator', 'moderator'].includes(role);

  const handleApprove = (id, approve) => {
    // update localStorage if present
    const stored = JSON.parse(localStorage.getItem('events') || 'null');
    if (Array.isArray(stored)) {
      const idx = stored.findIndex(e => e.id === id);
      if (idx > -1) {
        stored[idx].status = approve ? 'approved' : 'rejected';
        stored[idx].moderatorComment = comments[id] || '';
        localStorage.setItem('events', JSON.stringify(stored));
      }
    }
    // update UI
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  if (!allowed) {
    return (
      <div className="home-main">
        <h2>Access denied</h2>
        <p>You do not have permission to view pending approvals.</p>
        <Link to="/homepage" className="btn">Back → Homepage</Link>
      </div>
    );
  }

  return (
    <div className="home-main">
      <h2>Pending Approvals</h2>
      {events.length === 0 && (
        <div className="no-events">No pending approvals</div>
      )}
      <div className="events-grid">
        {events.map(ev => (
          <div key={ev.id} className="event-card">
            <div className="event-poster">
              {ev.poster ? <img src={ev.poster} alt={ev.name} /> : <div className="poster-placeholder">Poster</div>}
            </div>
            <div className="event-body">
              <h3 className="event-title">{ev.name}</h3>
              <div className="event-meta">{ev.date} • {ev.organizer}</div>
              <p className="event-desc">{ev.description}</p>
              <div style={{display:'flex', gap:8, marginTop:8}}>
                <button className="btn btn-approve" onClick={() => handleApprove(ev.id, true)}>Approve</button>
                <button className="btn btn-reject" onClick={() => handleApprove(ev.id, false)}>Reject</button>
              </div>
              <textarea placeholder="Optional comment" value={comments[ev.id] || ''} onChange={(e) => setComments(s => ({...s, [ev.id]: e.target.value}))} style={{marginTop:8, width:'100%', minHeight:60}} />
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:16}}>
        <button className="btn" onClick={() => navigate('/homepage')}>Back → Homepage</button>
      </div>
    </div>
  );
};

export default PendingApprovals;
