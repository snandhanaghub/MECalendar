import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Home.css';

const NavBar = () => {
	return (
		<aside className="cp-sidebar">
			<div className="sidebar-top">
				<Link to="/homepage" className="logo"><span className="me">ME</span><span className="calendar">Calendar</span></Link>
			</div>
			<nav className="sidebar-nav">
				<Link to="/homepage" className="sidebar-link">Home</Link>
				<Link to="/submit" className="sidebar-link">Submit Event</Link>
				{/* Managed Events and Subscribed are now part of Profile */}
				{localStorage.getItem('role') === 'superadmin' && (
					<Link to="/admin" className="sidebar-link">Admin</Link>
				)}
				<Link to="/profile" className="sidebar-link">Profile</Link>
			</nav>
			<div className="sidebar-bottom">
				<Link to="/" className="sidebar-link sidebar-logout" onClick={() => { localStorage.removeItem('isAuthenticated'); localStorage.removeItem('role'); }}>Log out</Link>
			</div>
		</aside>
	);
};

export default NavBar;
 
