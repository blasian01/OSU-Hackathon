import logo from './logo.svg';
import './App.css';
import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Background from './background/background.js';
import HomePage from './components/HomePage.js';
import AboutPage from './components/AboutPage.js';
import OptionsPage from './components/OptionsPage.js';
import LoginPage from './components/LoginPage.js';
import ClubsPage from './components/ClubsPage.js';
import ClassesPage from './components/ClassesPage.js';
import ProfessorsPage from './components/ProfessorsPage.js';
import EventsPage from './components/EventsPage.js';
import UserLikesPage from './components/UserLikesPage.js';
import ParticleBackground from './background/particlebackground.js';

function App() {
  const appRef = useRef(null);

  return (
    <Router>
      <div className="app content" ref={appRef}>
        <Background />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/home" element={<OptionsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/professors" element={<ProfessorsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/likes" element={<UserLikesPage />} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
