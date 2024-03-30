import React, { useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { NavLink } from 'react-router-dom';
import './Clubs.css';

function Clubs() {
  const initialClubs = [
    { id: 1, name: 'Tech Club', photo: '/images/ClubImages/techclub.png', description: 'A club for tech enthusiasts.', members: 120, day: 'Friday', time: '5 PM' },
    { id: 2, name: 'Science Club', photo: '/images/ClubImages/scienceclub.png', description: 'Exploring the wonders of science.', members: 95, day: 'Friday', time: '5 PM' },
    { id: 3, name: 'Sports Club', photo: '/images/ClubImages/sportsclub.png', description: 'For all sports enthusiasts.', members: 80, day: 'Friday', time: '5 PM' },
    { id: 4, name: 'Drama Club', photo: '/images/ClubImages/dramaclub.png', description: 'A club for drama enthusiasts.', members: 83, day: 'Tuesday', time: '5 PM' },
    { id: 9, name: 'Art Club', photo: '/images/ClubImages/artclub.png', description: 'Express your creativity through various art forms.', members: 50, day: 'Wednesday', time: '4 PM' },
    { id: 10, name: 'Music Club', photo: '/images/ClubImages/musicclub.png', description: 'For music lovers and performers.', members: 70, day: 'Thursday', time: '6 PM' },
    { id: 11, name: 'Debate Club', photo: '/images/ClubImages/debateclub.png', description: 'Engage in lively discussions and debates.', members: 65, day: 'Wednesday', time: '5 PM' },
  ];
  

  const [clubs, setClubs] = useState(initialClubs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiping, setSwiping] = useState({ deltaX: 0, deltaY: 0 });
  const [swipeFeedback, setSwipeFeedback] = useState('');
  const cardRef = useRef(null);

  const resetClubs = () => {
    setClubs(initialClubs); // Reset clubs to initial list
    setCurrentIndex(0); // Reset current index to 0
  };

  const removeClub = (clubId) => {
    setClubs(prevClubs => prevClubs.filter(club => club.id !== clubId));
  };

  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => {
      // Show feedback based on the direction of the swipe
      if (eventData.dir === 'Left') {
        setSwipeFeedback('dislike');
      } else if (eventData.dir === 'Right') {
        setSwipeFeedback('like');
      }
      setSwiping({ deltaX: eventData.deltaX, deltaY: eventData.deltaY });
    },
    onSwiped: () => {
      const nextIndex = currentIndex < clubs.length - 1 ? currentIndex + 1 : 0;
      removeClub(clubs[currentIndex].id);
      setCurrentIndex(nextIndex); // Move to the next club
      setSwipeFeedback('');
      setSwiping({ deltaX: 0, deltaY: 0 });
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const getCardStyle = (index) => {
    if (index === 0) {
      const rotate = swiping.deltaX / 10; // Adjust rotation sensitivity
      return {
        transform: `translate(${swiping.deltaX}px, ${swiping.deltaY}px) rotate(${rotate}deg)`,
        zIndex: clubs.length - index,
        transition: 'none', // Remove transition during swiping for instant feedback
      };
    }
    return {
      transform: `translateX(${index * 20}px)`,
      zIndex: clubs.length - index,
      transition: 'transform 0.3s ease-in-out',
    };
  };

  const renderFeedbackIcon = () => {
    if (swipeFeedback === 'like') {
      return <div className="feedback-icon">❤️</div>;
    } else if (swipeFeedback === 'dislike') {
      return <div className="feedback-icon">💔</div>;
    }
    return null;
  };

  return (
    <div className="Club-App">
      <div className="back-button">
        <NavLink to="/home">
          <button className="home-button">Back</button>
        </NavLink>
      </div>

      {clubs.length > 0 ? (
        <div className="Clubs-Swipe">
          <h1 className="slogan">University Clubs</h1>
          <div className="club-container">
            {clubs.slice(currentIndex, currentIndex + 1).map((club, index) => (
              <div
                key={club.id}
                ref={cardRef}
                {...swipeHandlers}
                className="club"
                style={getCardStyle(index)}
              >
                {renderFeedbackIcon()}
                <img
                  src={club.photo}
                  alt={club.name}
                  className="club-photo"
                  onDragStart={(event) => event.preventDefault()}
                />
                <div className="club-info">
                  <div className="club-name">{club.name}</div>
                  <div className="club-description">{club.description}</div>
                  <div className="club-members">{`${club.members} Members`}</div>
                  <div className='meetingDays'>Meeting Days: {club.day}</div>
                  <div className='meetingTime'>Meeting Times: {club.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-clubs-message">
          <p>That's all for now! Check back later to see if more clubs come back or hit the reset button below to reswipe all clubs again.</p>
          <button onClick={resetClubs} className="reset-button">Reset Clubs</button>
        </div>
      )}

      <div className="pistol-pete">
        <img src="/images/clipart1541960.png" alt="Pistol Pete" />
      </div>
    </div>
  );
}

export default Clubs;
