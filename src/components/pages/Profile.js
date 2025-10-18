import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Profile.css';
import DUMMY_EVENTS from '../../data/events';

const RoleTransferModal = ({ open, onClose, onTransfer }) => {
  const [email, setEmail] = useState('');
  if (!open) return null;
  return (
    <div className="modal">
      <div className="modal-inner">
        <h3>Transfer Role</h3>
        <input placeholder="Target email" value={email} onChange={e=>setEmail(e.target.value)} />
        <div style={{marginTop:12}}>
          <button className="btn" onClick={() => { onTransfer(email); setEmail(''); }}>Send transfer</button>
          <button className="btn" onClick={onClose} style={{marginLeft:8}}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const DefineRoleModal = ({ open, onClose, onDefine }) => {
  const [otp, setOtp] = useState('');
  const [selectedRole, setSelectedRole] = useState('cr');
  if (!open) return null;
  return (
    <div className="modal">
      <div className="modal-inner">
        <h3>Define Role (enter OTP)</h3>
        <div style={{display:'flex', gap:8}}>
          <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
            <option value="cr">Class Representative</option>
            <option value="clubrep">Club Representative</option>
            <option value="collegerep">College Representative</option>
          </select>
          <input placeholder="OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
        </div>
        <div style={{marginTop:12}}>
          <button className="btn" onClick={() => { onDefine(otp, selectedRole); setOtp(''); }}>Confirm</button>
          <button className="btn" onClick={onClose} style={{marginLeft:8}}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '', dept: '', role: '' });
  // default to approvals if user can approve, otherwise roles
  const [activeTab, setActiveTab] = useState('approvals');
  const [events, setEvents] = useState([]);
  const [managedEvents, setManagedEvents] = useState([]);
  const [managedFilter, setManagedFilter] = useState('upcoming');
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscribedEvents, setSubscribedEvents] = useState([]);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showDefine, setShowDefine] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser) setProfile(storedUser);
    const stored = JSON.parse(localStorage.getItem('events') || 'null');
    const list = Array.isArray(stored) && stored.length ? stored : DUMMY_EVENTS;
    setEvents(list.filter(e => e.status === 'pending' || !e.status));
    // managed events list (all events organized by the user's clubs / role)
    setManagedEvents(list);
    // subscriptions
    const subs = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    setSubscriptions(subs);
    setSubscribedEvents(list.filter(e => subs.includes(e.id)));

    // default active tab: approvals if user can approve, otherwise roles
    const storedRole = (localStorage.getItem('role') || (storedUser && storedUser.role) || '').toString().toLowerCase();
    const canApproveLocal = ['cr','coordinator','moderator'].includes(storedRole);
    setActiveTab(canApproveLocal ? 'approvals' : 'roles');
  }, []);

  // normalize role to lowercase to avoid case mismatches from storage
  const role = (localStorage.getItem('role') || profile.role || '').toString().toLowerCase();
  const canApprove = ['cr','coordinator','moderator'].includes(role);
  // representative roles that are allowed to transfer roles
  const repRoles = ['cr','clubrep','collegerep'];
  const isRep = repRoles.includes(role);

  // profile is displayed on the left card; editing removed for modular UI

  const handleApprove = (id, approve) => {
    const stored = JSON.parse(localStorage.getItem('events') || 'null');
    if (Array.isArray(stored)) {
      const idx = stored.findIndex(e => e.id === id);
      if (idx > -1) {
        stored[idx].status = approve ? 'approved' : 'rejected';
        localStorage.setItem('events', JSON.stringify(stored));
      }
    }
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const openTransfer = (email) => {
    // pretend to send OTP and create a pending transfer record in localStorage
    const transfers = JSON.parse(localStorage.getItem('roleTransfers') || '[]');
    // include the role being transferred for clarity
    transfers.push({ from: profile.email, to: email, at: new Date().toISOString(), otp: '123456', role: role });
    localStorage.setItem('roleTransfers', JSON.stringify(transfers));
    setShowTransfer(false);
    alert('Transfer initiated (OTP: 123456) - for demo only');
  };

  const defineRole = (otp, selectedRole) => {
    // verify OTP against transfers
    const transfers = JSON.parse(localStorage.getItem('roleTransfers') || '[]');
    const match = transfers.find(t => t.to === profile.email && t.otp === otp);
    if (match) {
      // only allow one of the representative roles to be defined here
      const allowed = ['cr','clubrep','collegerep'];
      const finalRole = allowed.includes((selectedRole || '').toString().toLowerCase()) ? selectedRole : match.role || 'cr';
      localStorage.setItem('role', finalRole);
      alert(`Role defined: ${finalRole}`);
      setShowDefine(false);
    } else alert('Invalid OTP');
  };

  return (
    <div className="home-main profile-page">
      <div style={{display:'flex', gap:20}}>
        <aside style={{width:260}}>
          <div className="profile-card">
            <div className="avatar">{profile.name ? profile.name[0].toUpperCase() : 'U'}</div>
            <h3 style={{margin:0}}>{profile.name || 'Unnamed'}</h3>
            <div style={{opacity:0.8, marginTop:4}}>{profile.email || '—'}</div>
            {role && <div className="badge-red" style={{marginTop:8, display:'inline-block'}}>{role}</div>}
            {/* Persistent role action buttons - always visible in profile card */}
            <div style={{marginTop:16, display:'flex', gap:8}}>
              <button
                className="btn"
                onClick={() => isRep ? setShowTransfer(true) : null}
                disabled={!isRep}
                title={!isRep ? 'Only representatives can transfer roles' : 'Transfer role to another user'}
              >
                Transfer Role
              </button>

              <button className="btn" onClick={() => setShowDefine(true)} title="Define your role via OTP">Define Role</button>
            </div>
          </div>
        </aside>

        <main style={{flex:1}}>
          <div className="tabs">
            <button className={activeTab==='approvals' ? 'btn active' : 'btn'} onClick={() => setActiveTab('approvals')} disabled={!canApprove}>Pending Approvals</button>
            <button className={activeTab==='managed' ? 'btn active' : 'btn'} onClick={() => setActiveTab('managed')}>Managed Events</button>
            <button className={activeTab==='subscribed' ? 'btn active' : 'btn'} onClick={() => setActiveTab('subscribed')}>Subscribed Events</button>
            <button className={activeTab==='roles' ? 'btn active' : 'btn'} onClick={() => setActiveTab('roles')}>Role Management</button>
          </div>

          <div style={{marginTop:16}}>
            {/* My Details removed — profile displayed on left card */}

            {activeTab === 'approvals' && (
              <div>
                {events.length === 0 && <div className="no-events">No pending approvals</div>}
                <div className="events-grid" style={{marginTop:8}}>
                  {events.map(ev => (
                    <div className="event-card" key={ev.id}>
                      <div className="event-poster">{ev.poster ? <img src={ev.poster} alt={ev.name} /> : <div className="poster-placeholder">Poster</div>}</div>
                      <div className="event-body">
                        <h3>{ev.name}</h3>
                        <div className="event-meta">{ev.date} • {ev.organizer}</div>
                        <p className="event-desc">{ev.description}</p>
                        <div style={{display:'flex', gap:8}}>
                          <button className="btn btn-approve" onClick={() => handleApprove(ev.id, true)}>Approve</button>
                          <button className="btn btn-reject" onClick={() => handleApprove(ev.id, false)}>Reject</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'managed' && (
              <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <h3>Managed Events</h3>
                  <div>
                    {(role.includes('club') || role.includes('secretary') || role === 'clubrep') && <button className="btn" onClick={() => navigate('/submit')} style={{marginRight:8}}>Create Event</button>}
                    <select value={managedFilter} onChange={e => setManagedFilter(e.target.value)}>
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div style={{marginTop:16}}>
                  {managedEvents.filter(ev => {
                    if (managedFilter === 'draft') return ev.status === 'draft';
                    if (!ev.datetime) return managedFilter === 'draft' ? ev.status === 'draft' : true;
                    const when = new Date(ev.datetime);
                    const now = new Date();
                    if (managedFilter === 'upcoming') return when >= now && ev.status !== 'closed';
                    if (managedFilter === 'past') return when < now;
                    return true;
                  }).length === 0 && <div className="no-events">No events for this filter</div>}

                  <div className="events-grid" style={{marginTop:12}}>
                    {managedEvents.filter(ev => {
                      if (managedFilter === 'draft') return ev.status === 'draft';
                      if (!ev.datetime) return managedFilter === 'draft' ? ev.status === 'draft' : true;
                      const when = new Date(ev.datetime);
                      const now = new Date();
                      if (managedFilter === 'upcoming') return when >= now && ev.status !== 'closed';
                      if (managedFilter === 'past') return when < now;
                      return true;
                    }).map(ev => (
                      <div className="event-card" key={ev.id}>
                        <div className="event-poster">{ev.poster ? <img src={ev.poster} alt={ev.name} /> : <div className="poster-placeholder">Poster</div>}</div>
                        <div className="event-body">
                          <h3>{ev.name}</h3>
                          <div className="event-meta">{ev.datetime ? new Date(ev.datetime).toLocaleString() : '—'} • {ev.organizer}</div>
                          <p className="event-desc" style={{marginTop:8}}>{ev.description}</p>
                          <div style={{display:'flex', gap:8, marginTop:12}}>
                            <button className="btn" onClick={() => navigate(`/event/${ev.id}`)}>View</button>
                            <button className="btn" onClick={() => navigate(`/submit?edit=${encodeURIComponent(ev.id)}`)}>Edit</button>
                            <button className="btn" onClick={() => {
                              const stored = JSON.parse(localStorage.getItem('events') || '[]');
                              const idx = stored.findIndex(e => e.id === ev.id);
                              if (idx > -1) { stored[idx].status = 'closed'; localStorage.setItem('events', JSON.stringify(stored)); setManagedEvents(stored); }
                            }}>Close Event</button>
                            <button className="btn" onClick={() => navigate(`/event/${ev.id}`)}>Participants</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'subscribed' && (
              <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <h3>Subscribed Events</h3>
                  <div>
                    <select value={activeTab} style={{display:'none'}}> 
                      {/* placeholder to match layout */}
                    </select>
                  </div>
                </div>

                <div style={{marginTop:16}}>
                  {subscribedEvents.length === 0 && <div className="no-events">No subscribed events</div>}
                  <div className="events-grid" style={{marginTop:12}}>
                    {subscribedEvents.map(ev => (
                      <div className="event-card" key={ev.id}>
                        <div className="event-poster">{ev.poster ? <img src={ev.poster} alt={ev.name} /> : <div className="poster-placeholder">Poster</div>}</div>
                        <div className="event-body">
                          <h3>{ev.name}</h3>
                          <div className="event-meta">{ev.datetime ? new Date(ev.datetime).toLocaleString() : '—'} • {ev.organizer}</div>
                          <p className="event-desc" style={{marginTop:8}}>{ev.description}</p>
                          <div style={{display:'flex', gap:8, marginTop:12}}>
                            <button className="btn" onClick={() => {
                              const updated = subscriptions.filter(s => s !== ev.id);
                              localStorage.setItem('subscriptions', JSON.stringify(updated));
                              setSubscriptions(updated);
                              setSubscribedEvents(prev => prev.filter(e => e.id !== ev.id));
                            }}>Unsubscribe</button>
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
            )}

            {activeTab === 'roles' && (
              <div>
                <div>Current role: <strong>{role || '—'}</strong></div>
                <div style={{marginTop:12}}>
                  {/* Always show both buttons; disable transfer if user is not a representative */}
                  <button
                    className="btn"
                    onClick={() => isRep ? setShowTransfer(true) : null}
                    style={{opacity: isRep ? 1 : 0.5}}
                    disabled={!isRep}
                  >
                    Transfer Role
                  </button>

                  <button className="btn" onClick={() => setShowDefine(true)} style={{marginLeft:8}}>Define Role</button>
                </div>

                <div style={{marginTop:16}}>
                  <h4>Role history</h4>
                  <div className="no-events">(role history will appear here)</div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <RoleTransferModal open={showTransfer} onClose={() => setShowTransfer(false)} onTransfer={openTransfer} />
      <DefineRoleModal open={showDefine} onClose={() => setShowDefine(false)} onDefine={defineRole} />
    </div>
  );
};

export default Profile;
