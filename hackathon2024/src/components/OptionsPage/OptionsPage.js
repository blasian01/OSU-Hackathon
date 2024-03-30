import React from 'react';
import { NavLink } from 'react-router-dom';
import './Option.css'; // Assuming your CSS is in Option.css

function Option() {
  const options = [
    { name: 'What You Like', path: '/likes', img: 'images/Likes.png' }, // New Tile
    { name: 'Clubs', path: '/clubs', img: 'images/Clubs.png' },
    { name: 'Classes', path: '/classes', img: 'images/Classes.png' },
    { name: 'Professors', path: '/professors', img: 'images/Professors.png' },
    { name: 'Events', path: '/events', img: 'images/Events.png' }
  ];

  return (
    <div className="App">
      <h1 className="slogan">Let's See What You Like!</h1>
      <div className="options-container">
        {options.map((option, index) => (
          <NavLink key={option.name} to={option.path} className={`option-tile ${index === 0 ? 'special-tile' : ''}`}>
            <div className="option-image" style={{ backgroundImage: `url(${option.img})` }}></div>
            <h2>{option.name}</h2>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Option;
