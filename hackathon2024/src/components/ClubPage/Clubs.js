import React, { useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { NavLink } from 'react-router-dom';
import ClubSideBar from './ClubSideBar';
import './Clubs.css';

function Clubs() {
  const initialClubs = [
    { id: 1, name: 'Tech Club', photo: '/images/ClubImages/techclub.png', description: 'A club for tech enthusiasts.', members: 120, day: 'Friday', time: '5 PM', category: 'Tech', acceptingMembers: true },
    { id: 2, name: 'Science Club', photo: '/images/ClubImages/scienceclub.png', description: 'Exploring the wonders of science.', members: 95, day: 'Friday', time: '5 PM', category: 'Science', acceptingMembers: true },
    { id: 3, name: 'Art Club', photo: '/images/ClubImages/artclub.png', description: 'A club for artists.', members: 110, day: 'Friday', time: '5 PM', category: 'Art', acceptingMembers: true },
    { id: 4, name: 'Music Club', photo: '/images/ClubImages/musicclub.png', description: 'Music lovers unite!', members: 80, day: 'Friday', time: '5 PM', category: 'Music', acceptingMembers: true },
    { id: 5, name: 'Dance Club', photo: '/images/ClubImages/danceclub.png', description: 'Dancing is fun!', members: 60, day: 'Friday', time: '5 PM', category: 'Dance', acceptingMembers: true },
    { id: 6, name: 'Food Club', photo: '/images/ClubImages/foodclub.png', description: 'A club for foodies.', members: 50, day: 'Friday', time: '5 PM', category: 'Food', acceptingMembers: true },
    { id: 7, name: 'Sports Club', photo: '/images/ClubImages/sportsclub.png', description: 'Sports fans unite!', members: 30, day: 'Friday', time: '5 PM', category: 'Sports', acceptingMembers: true },
    { id: 8, name: 'Art Club', photo: '/images/ClubImages/artclub.png', description: 'A club for artists.', members: 110, day: 'Friday', time: '5 PM', category: 'Art', acceptingMembers: true },
    { id: 9, name: 'Music Club', photo: '/images/ClubImages/musicclub.png', description: 'Music lovers unite!', members: 80, day: 'Friday', time: '5 PM', category: 'Music', acceptingMembers: true },
    { id: 10, name: 'Dance Club', photo: '/images/ClubImages/danceclub.png', description: 'Dancing is fun!', members: 60, day: 'Friday', time: '5 PM', category: 'Dance', acceptingMembers: true },
  ];

  const [clubs, setClubs] = useState(initialClubs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiping, setSwiping] = useState({ deltaX: 0, deltaY: 0 });
  const [swipeFeedback, setSwipeFeedback] = useState('');
  const [likedClubs, setLikedClubs] = useState([]);
  const [dislikedClubs, setDislikedClubs] = useState([]);
  const cardRef = useRef(null);

  const resetClubs = () => {
    setClubs(initialClubs);
    setCurrentIndex(0);
    setLikedClubs([]);
    setDislikedClubs([]);
  };

  const removeClub = (clubId, direction) => {
    setClubs(prevClubs => prevClubs.filter(club => club.id !== clubId));
    if (direction === 'right') {
      setLikedClubs(prevLikedClubs => [...prevLikedClubs, clubs.find(club => club.id === clubId)]);
    } else if (direction === 'left') {
      setDislikedClubs(prevDislikedClubs => [...prevDislikedClubs, clubs.find(club => club.id === clubId)]);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => {
      setSwipeFeedback(eventData.dir === 'Left' ? 'dislike' : 'like');
      setSwiping({ deltaX: eventData.deltaX, deltaY: eventData.deltaY });
    },
    onSwiped: (eventData) => {
      const nextIndex = currentIndex < clubs.length - 1 ? currentIndex + 1 : 0;
      const direction = eventData.dir === 'Right' ? 'right' : 'left';
      removeClub(clubs[currentIndex].id, direction);
      setCurrentIndex(nextIndex);
      setSwipeFeedback('');
      setSwiping({ deltaX: 0, deltaY: 0 });
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const getCardStyle = (index) => {
    if (index === 0) {
      const rotate = swiping.deltaX / 10;
      return {
        transform: `translate(${swiping.deltaX}px, ${swiping.deltaY}px) rotate(${rotate}deg)`,
        zIndex: clubs.length - index,
        transition: 'none',
      };
    }
    return {
      transform: `translateX(${index * 20}px)`,
      zIndex: clubs.length - index,
      transition: 'transform 0.3s ease-in-out',
    };
  };

  const filterClubs = (memberFilter, timeFilter, categoryFilter, acceptingMembersFilter) => {
    const filteredClubs = initialClubs.filter(club => {
      const filterChecks = [
        (!memberFilter || club.members >= memberFilter),
        (!timeFilter || club.time.includes(timeFilter)),
        (!categoryFilter || club.category === categoryFilter),
        (acceptingMembersFilter === undefined || club.acceptingMembers === acceptingMembersFilter)
      ];
      return filterChecks.every(Boolean);
    });
    setClubs(filteredClubs);
  };

  return (
    <div className="Club-App">
      <div className="back-button">
        <NavLink to="/home">
          <button className="home-button">Back</button>
        </NavLink>
      </div>

      <div className="app-container">
        <div className="Clubs-Swipe">
          <h1 className="slogan">University Clubs</h1>
          <div className="club-container">
          {clubs.length > 0 && clubs[currentIndex] && (
          <div
            key={clubs[currentIndex].id}
            ref={cardRef}
            {...swipeHandlers}
            className="club"
            style={getCardStyle(0)}
          >
            {renderFeedbackIcon(swipeFeedback)}
            <img
              src={clubs[currentIndex].photo}
              alt={clubs[currentIndex].name}
              className="club-photo"
              onDragStart={(event) => event.preventDefault()}
            />
            <div className="club-info">
              <div className="club-name">{clubs[currentIndex].name}</div>
              <div className="club-description">{clubs[currentIndex].description}</div>
              <div className="club-members">{`${clubs[currentIndex].members} Members`}</div>
              <div className="meetingDays">Meeting Days: {clubs[currentIndex].day}</div>
              <div className="meetingTime">Meeting Times: {clubs[currentIndex].time}</div>
            </div>
          </div>
        )}
            
          </div>
        </div>

        <ClubSideBar
          likedClubs={likedClubs}
          dislikedClubs={dislikedClubs}
          filterClubs={filterClubs}
        />
      </div>

      {clubs.length === 0 && (
        <div className="no-clubs-message">
          <p>That's all for now! Check back later to see if more clubs come back or hit the reset button below to reswipe all clubs again.</p>
          <button onClick={resetClubs} className="reset-button">Reset Clubs</button>
        </div>
      )}

      <div className="club-pistol-pete">
        <img src="/images/clipart1541960.png" alt="Pistol Pete" />
      </div>
    </div>
  );
}

export default Clubs;

function renderFeedbackIcon(swipeFeedback) {
  if (swipeFeedback === 'like') {
    return <div className="feedback-icon">❤️</div>;
  } else if (swipeFeedback === 'dislike') {
    return <div className="feedback-icon">💔</div>;
  }
  return null;
}