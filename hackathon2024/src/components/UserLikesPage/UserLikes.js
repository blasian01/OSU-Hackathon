import React from 'react';
import { NavLink } from 'react-router-dom';
import './UserLikes.css'; // Ensure your CSS styles the cards nicely

// Dummy data simulating liked clubs
const likedClubs = [
  {
    orgId: 1,
    name: 'Tech Innovators',
    description: 'A club for tech enthusiasts looking to innovate.',
    imageUrl: 'https://example.com/images/tech-innovators.jpg'
  },
  {
    orgId: 2,
    name: 'Future Business Leaders',
    description: 'Preparing the next generation of business leaders.',
    imageUrl: 'https://example.com/images/future-business-leaders.jpg'
  },
  {
    orgId: 2,
    name: 'Future Business Leaders',
    description: 'Preparing the next generation of business leaders.',
    imageUrl: 'https://example.com/images/future-business-leaders.jpg'
  },
  {
    orgId: 2,
    name: 'Future Business Leaders',
    description: 'Preparing the next generation of business leaders.',
    imageUrl: 'https://example.com/images/future-business-leaders.jpg'
  },
  {
    orgId: 2,
    name: 'Future Business Leaders',
    description: 'Preparing the next generation of business leaders.',
    imageUrl: 'https://example.com/images/future-business-leaders.jpg'
  },
  {
    orgId: 2,
    name: 'Future Business Leaders',
    description: 'Preparing the next generation of business leaders.',
    imageUrl: 'https://example.com/images/future-business-leaders.jpg'
  },
  {
    orgId: 2,
    name: 'Future Business Leaders',
    description: 'Preparing the next generation of business leaders.',
    imageUrl: 'https://example.com/images/future-business-leaders.jpg'
  },
  // Add more clubs as needed
];

function UserLikes() {
  return (
    <div className="likes-app">
      <div className="back-button">
        <NavLink to="/home">
          <button className="home-button">Back</button>
        </NavLink>
      </div>

      <div className="likes-container">
        <h1 className="likes-heading">Your Likes</h1>
        <div className="card-wrapper">
          {likedClubs.map(club => (
            <div key={club.orgId} className="club-card">
              <img src={club.imageUrl} alt={club.name} className="club-image" />
              <div className="club-details">
                <h2>{club.name}</h2>
                <p>{club.description}</p>
                <NavLink to={`/clubs/${club.orgId}`} className="more-info-link">Learn More</NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserLikes;
