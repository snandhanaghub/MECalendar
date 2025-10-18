import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/Submit.css';

const TAGS = ['Sports', 'Cultural', 'Technical', 'Workshop', 'Fest'];
const EVENT_TYPES = ['Club', 'College', 'External'];

const getInitialRole = () => {
  // try to read a role from localStorage for realistic testing; fall back to empty
  return localStorage.getItem('role') || '';
};

const SubmitEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(getInitialRole());
  const [form, setForm] = useState({
    name: '',
    description: '',
    organizer: '',
    tags: [],
    venue: '',
    datetime: '',
    posterDataUrl: '',
    type: 'Club'
  });
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const editId = params.get('edit');
    if (editId) {
      const stored = JSON.parse(localStorage.getItem('events') || '[]');
      const ev = Array.isArray(stored) ? stored.find(x => x.id === editId) : null;
      if (ev) {
        setForm({
          name: ev.name || '',
          description: ev.description || '',
          organizer: ev.organizer || '',
          tags: ev.tags || [],
          venue: ev.venue || '',
          datetime: ev.datetime || '',
          posterDataUrl: ev.poster || ev.posterDataUrl || '',
          type: ev.type || 'Club'
        });
        setEditingId(editId);
      }
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleTagToggle = (tag) => {
    setForm(prev => {
      const has = prev.tags.includes(tag);
      return { ...prev, tags: has ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag] };
    });
  };

  const handlePoster = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm(prev => ({ ...prev, posterDataUrl: reader.result }));
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Event name is required';
    if (!form.organizer.trim()) errs.organizer = 'Organizer is required';
    if (!form.venue.trim()) errs.venue = 'Venue is required';
    if (!form.datetime) errs.datetime = 'Date & time required';
    if (!role) errs.role = 'Select a role (for demo) or set localStorage.role';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const computeStatus = (roleValue, typeValue) => {
    // simple mapping: CR/Moderator approves; Club Secretary approves club events; others pending
    const r = roleValue?.toLowerCase();
    const t = typeValue?.toLowerCase();
    if (r === 'cr' || r === 'cr/moderator' || r === 'cr/moderator' || r === 'cr/mod') return 'approved';
    if (r.includes('cr') || r.includes('moderator')) return 'approved';
    if (r.includes('club') && t === 'club') return 'approved';
    return 'pending';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const status = computeStatus(role, form.type);
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    if (editingId) {
      const idx = events.findIndex(e => e.id === editingId);
      if (idx > -1) {
        events[idx] = { ...events[idx], ...form, poster: form.posterDataUrl || events[idx].poster, status, updatedAt: new Date().toISOString() };
        localStorage.setItem('events', JSON.stringify(events));
        alert('Event updated');
        navigate('/profile');
        return;
      }
    }
    const id = 'ev_' + Date.now();
    const newEvent = { id, ...form, status, createdAt: new Date().toISOString(), submittedByRole: role };
    events.unshift(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    // simple feedback and navigate back
    alert('Event submitted — status: ' + status);
    navigate('/homepage');
  };

  return (
    <div className="submit-page">
      <div className="submit-card">
        <h2>Submit Event</h2>

        <form className="submit-form" onSubmit={handleSubmit}>
          <label>Role (who you are submitting as)</label>
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="">-- choose role (demo) --</option>
            <option>Club Secretary</option>
            <option>Student</option>
            <option>CR/Moderator</option>
          </select>
          {errors.role && <div className="error">{errors.role}</div>}

          <label>Event Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <div className="error">{errors.name}</div>}

          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} />

          <label>Organizer</label>
          <input name="organizer" value={form.organizer} onChange={handleChange} />
          {errors.organizer && <div className="error">{errors.organizer}</div>}

          <label>Tags</label>
          <div className="tag-row">
            {TAGS.map(t => (
              <label key={t} className="tag-checkbox">
                <input type="checkbox" checked={form.tags.includes(t)} onChange={() => handleTagToggle(t)} /> {t}
              </label>
            ))}
          </div>

          <label>Venue</label>
          <input name="venue" value={form.venue} onChange={handleChange} />
          {errors.venue && <div className="error">{errors.venue}</div>}

          <label>Date &amp; Time</label>
          <input type="datetime-local" name="datetime" value={form.datetime} onChange={handleChange} />
          {errors.datetime && <div className="error">{errors.datetime}</div>}

          <label>Poster Upload</label>
          <input type="file" accept="image/*" onChange={handlePoster} />
          {form.posterDataUrl && <div className="poster-preview"><img src={form.posterDataUrl} alt="poster" /></div>}

          <label>Event Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <div className="form-actions">
            <button type="submit" className="btn primary">Submit</button>
            <button type="button" className="btn" onClick={() => navigate('/homepage')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitEvent;
