import React from 'react';
import { NavLink } from 'react-router-dom';
import './Option.css';

function Option() {
  const options = [
    { name: 'Clubs', path: '/clubs', img: 'images/Clubs.png' }, // Update the image file names as needed
    { name: 'Classes', path: '/classes', img: 'images/Classes.png' },
    { name: 'Events', path: '/events', img: 'images/Events.png' },
    { name: 'What You Like', path: '/professors', img: 'images/Likes.png' }
  ];

  return (
    <div className="App">
      <div className="option-back-button">
        <NavLink to="/">
          <button className="option-home-button">LogOut</button>
        </NavLink>
      </div>

      <h1 className="title">Let's See What You Like!</h1>
      <div className="options-container">
        {options.map(option => (
          <NavLink key={option.name} to={option.path} className="option-tile">
            <div className="option-image" style={{ backgroundImage: `url(${option.img})` }}></div>
            <h2>{option.name}</h2>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Option;
