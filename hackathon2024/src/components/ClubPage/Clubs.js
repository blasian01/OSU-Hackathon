import React from 'react';
import { NavLink } from 'react-router-dom';
import './Clubs.css'; // Assuming your CSS is in Option.css

function Clubs() {

  return (
    <div className="App">
      <div className="Clubs-Swipe">
        <h1 className="slogan">Clubs</h1>
        <div className="button-container">
          <NavLink to="/home">
            <button className="join-us-button">
              Back
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Clubs;
