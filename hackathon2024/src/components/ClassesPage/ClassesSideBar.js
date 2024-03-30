import React, { useState } from 'react';
import './ClassesSideBar.css';

function ClassesSideBar({ likedClubs = [], dislikedClubs = [], filterClubs }) {
    
    const [memberFilter, setMemberFilter] = useState(0); // For member size filter
    const [timeFilter, setTimeFilter] = useState(''); // For meeting time filter
  
    const handleFilterChange = () => {
      filterClubs(memberFilter, timeFilter);
    };
  
    return (
      <div className="classes-sidebar">
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
        <div className="classes-filters">
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

export default ClassesSideBar;
