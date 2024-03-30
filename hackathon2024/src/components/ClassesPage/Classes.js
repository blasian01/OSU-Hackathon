import React from 'react';
import { NavLink } from 'react-router-dom';
import './Classes.css'; // Assuming your CSS is in Option.css

function Classes() {

  return (
    <div className="App">
      <div className="Clubs-Swipe">
        <h1 className="slogan">Classes</h1>
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

export default Classes;
