import React, { useState } from 'react';
import './ClubSideBar.css';

function ClubSideBar({ likedClubs = [], dislikedClubs = [], filterClubs }) {
    
    const [memberFilter, setMemberFilter] = useState(0);
    const [timeFilter, setTimeFilter] = useState(''); 
  
    const handleFilterChange = () => {
      filterClubs(memberFilter, timeFilter);
    };
  
    return (
      <div className="sidebar">
        <h2>Liked Clubs</h2>
        <ul>
          {likedClubs.map(club => (
            <li key={club.id}>{club.name}</li>
          ))}
        </ul>
        <h2>Disliked Clubs</h2>
        <ul>
          {dislikedClubs.map(club => (
            <li key={club.id}>{club.name}</li>
          ))}
        </ul>
        <div className="filters">
          <h3>Filters</h3>
          <div>
            <label>Member Size Greater Than</label>
            <input type="number" value={memberFilter} onChange={(e) => setMemberFilter(e.target.value)} />
          </div>
          <div>
            <label>Meeting Time</label>
            <input type="text" placeholder="e.g., Fridays at 5 PM" value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} />
          </div>
          <button onClick={handleFilterChange}>Apply Filters</button>
        </div>
      </div>
    );
}

export default ClubSideBar;
