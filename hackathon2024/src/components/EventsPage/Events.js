import React from 'react';
import { NavLink } from 'react-router-dom';
import './Events.css'; // Assuming your CSS is in Option.css

function Events() {

  return (
    <div className="App">
      <div className="back-button">
        <NavLink to="/home">
          <button className="home-button">Back</button>
        </NavLink>
      </div>
      
      <div className="events-app">
        <h1 className="slogan">Events</h1>
        <div className="button-container">

        </div>
      </div>
    </div>
  );
}

export default Events;
