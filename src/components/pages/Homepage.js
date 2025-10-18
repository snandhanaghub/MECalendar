import React, { useMemo, useState } from 'react';
// routing Link not needed in this file
import EventCard from '../common/EventCard';
import '../../styles/Home.css';
import DUMMY_EVENTS from '../../data/events';

const Homepage = () => {
  const [query, setQuery] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const tags = ['Sports', 'Cultural', 'Technical', 'Workshop', 'Fest'];

  const events = useMemo(() => {
    let list = DUMMY_EVENTS.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(e => (
        e.name.toLowerCase().includes(q) ||
        e.organizer.toLowerCase().includes(q) ||
        e.tags.join(' ').toLowerCase().includes(q)
      ));
    }
    if (filterTag) {
      list = list.filter(e => e.tags.includes(filterTag));
    }
    if (sortBy === 'popularity') {
      list.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'latest') {
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else { // date
      list.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return list;
  }, [query, filterTag, sortBy]);

  return (
    <div className="home-page">

      <main className="home-main">
        <h1 className="home-title">Home</h1>
        <section className="home-controls">
          <div className="search-row">
            <input
              className="search-input"
              placeholder="Search by name, organizer or tags"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <div className="filters">
              <select value={filterTag} onChange={e => setFilterTag(e.target.value)}>
                <option value="">All Tags</option>
                {tags.map(t => <option key={t} value={t}>{t}</option>)}
              </select>

              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="date">Sort: Date</option>
                <option value="popularity">Sort: Popularity</option>
                <option value="latest">Sort: Latest</option>
              </select>
            </div>
          </div>
        </section>

        <section className="events-grid">
          {events.map(ev => (
            <EventCard key={ev.id} event={ev} />
          ))}
          {events.length === 0 && (
            <div className="no-events">No events found</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Homepage;