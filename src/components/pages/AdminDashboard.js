import React, { useEffect, useState } from 'react';
import '../../styles/Home.css';
import DUMMY_EVENTS from '../../data/events';

const AdminDashboard = () => {
  const [tab, setTab] = useState('pending');
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || 'null');
    setEvents(Array.isArray(storedEvents) && storedEvents.length ? storedEvents : DUMMY_EVENTS);
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
    setTransfers(JSON.parse(localStorage.getItem('roleTransfers') || '[]'));
    setLogs(JSON.parse(localStorage.getItem('adminLogs') || '[]'));
  }, []);

  const writeLog = (entry) => {
    const l = [{ at: new Date().toISOString(), entry }, ...logs];
    setLogs(l);
    localStorage.setItem('adminLogs', JSON.stringify(l));
  };

  const approveEvent = (id) => {
    const evs = [...events];
    const idx = evs.findIndex(e => e.id === id);
    if (idx > -1) {
      evs[idx].status = 'approved';
      setEvents(evs);
      localStorage.setItem('events', JSON.stringify(evs));
      writeLog(`Admin approved event ${id}`);
    }
  };

  const assignRole = (email, role) => {
    const us = [...users];
    const idx = us.findIndex(u => u.email === email);
    if (idx > -1) {
      us[idx].role = role;
      setUsers(us);
      localStorage.setItem('users', JSON.stringify(us));
      writeLog(`Assigned role ${role} to ${email}`);
    }
  };

  const resetPassword = (email) => {
    // demo: we can't access real passwords; just log the reset
    writeLog(`Password reset for ${email}`);
    alert('Password reset (demo)');
  };

  const overrideTransfer = (transferIndex, approve) => {
    const tr = [...transfers];
    if (tr[transferIndex]) {
      tr[transferIndex].overridden = approve ? 'accepted' : 'rejected';
      setTransfers(tr);
      localStorage.setItem('roleTransfers', JSON.stringify(tr));
      writeLog(`Transfer ${transferIndex} overridden: ${approve}`);
    }
  };

  return (
    <div className="home-main">
      <h2>Admin Dashboard</h2>
      <div className="tabs" style={{marginTop:12}}>
        <button className={tab==='pending' ? 'btn active' : 'btn'} onClick={() => setTab('pending')}>Pending Events</button>
        <button className={tab==='users' ? 'btn active' : 'btn'} onClick={() => setTab('users')}>Users</button>
        <button className={tab==='clubs' ? 'btn active' : 'btn'} onClick={() => setTab('clubs')}>Clubs</button>
        <button className={tab==='transfers' ? 'btn active' : 'btn'} onClick={() => setTab('transfers')}>Role Overrides</button>
        <button className={tab==='logs' ? 'btn active' : 'btn'} onClick={() => setTab('logs')}>Logs</button>
        <button className={tab==='reports' ? 'btn active' : 'btn'} onClick={() => setTab('reports')}>Reports</button>
      </div>

      <div style={{marginTop:16}}>
        {tab === 'pending' && (
          <div>
            {events.filter(e => e.status === 'pending').map(ev => (
              <div key={ev.id} className="event-card" style={{marginBottom:12}}>
                <div className="event-poster">{ev.poster ? <img src={ev.poster} alt={ev.name} /> : <div className="poster-placeholder">Poster</div>}</div>
                <div className="event-body">
                  <h3>{ev.name}</h3>
                  <div className="event-meta">{ev.datetime || '—'} • {ev.organizer}</div>
                  <div style={{marginTop:8}}>{ev.description}</div>
                  <div style={{marginTop:8}}>
                    <button className="btn" onClick={() => approveEvent(ev.id)}>Approve</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'users' && (
          <div>
            {users.length === 0 && <div className="no-events">No users stored</div>}
            {users.map(u => (
              <div key={u.email} style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'#fff', padding:12, borderRadius:8, marginBottom:8}}>
                <div>
                  <div><strong>{u.name || u.email}</strong></div>
                  <div style={{opacity:0.7}}>{u.email}</div>
                </div>
                <div style={{display:'flex', gap:8}}>
                  <select defaultValue={u.role} onChange={e => assignRole(u.email, e.target.value)}>
                    <option value="student">student</option>
                    <option value="cr">cr</option>
                    <option value="coordinator">coordinator</option>
                    <option value="clubRep">clubRep</option>
                    <option value="superadmin">superadmin</option>
                  </select>
                  <button className="btn" onClick={() => resetPassword(u.email)}>Reset Password</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'transfers' && (
          <div>
            {transfers.length === 0 && <div className="no-events">No transfers</div>}
            {transfers.map((t, i) => (
              <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'#fff', padding:12, borderRadius:8, marginBottom:8}}>
                <div>
                  <div><strong>{t.from} → {t.to}</strong></div>
                  <div style={{opacity:0.7}}>{t.at}</div>
                </div>
                <div style={{display:'flex', gap:8}}>
                  <button className="btn" onClick={() => overrideTransfer(i, true)}>Force Accept</button>
                  <button className="btn" onClick={() => overrideTransfer(i, false)}>Force Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'logs' && (
          <div>
            {logs.length === 0 && <div className="no-events">No logs</div>}
            {logs.map((l, i) => (
              <div key={i} style={{background:'#fff', padding:12, borderRadius:8, marginBottom:8}}>
                <div style={{fontSize:12, opacity:0.7}}>{l.at}</div>
                <div>{l.entry}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'reports' && (
          <div>
            <div className="no-events">(reports will be generated here)</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
