
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  return (
    <div className="App">
      <h1 className="slogan">Welcome To UniSwipe</h1>
      <h2>Go Pokes!</h2>
      <div className="button-container">
        <NavLink to="/login">
          <button className="join-us-button">
            Get Started
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Welcome;