import React, { useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import './Clubs.css';

function Clubs() {
  const [clubs, setClubs] = useState([
    { id: 1, name: 'Tech Club', photo: 'path/to/tech-club-photo.jpg', description: 'A club for tech enthusiasts.', members: 120 },
    { id: 2, name: 'Science Club', photo: 'path/to/science-club-photo.jpg', description: 'Exploring the wonders of science.', members: 95 },
    // Add more clubs as needed
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiping, setSwiping] = useState({ deltaX: 0, deltaY: 0 });
  const [swipeFeedback, setSwipeFeedback] = useState(''); // New state for swipe feedback
  const cardRef = useRef(null);

  const removeClub = (clubId) => {
    // This updates the state to remove the club, but we should not increase currentIndex here directly
    setClubs(prevClubs => prevClubs.filter(club => club.id !== clubId));
  };

  const swipeHandlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === 'Left' || eventData.dir === 'Right') {
        removeClub(clubs[currentIndex].id);
        // Only increment currentIndex if there are more clubs to show
        setCurrentIndex(prevIndex => (prevIndex < clubs.length - 1 ? prevIndex : prevIndex));
      }
      // Reset swiping state after swipe
      setSwiping({ deltaX: 0, deltaY: 0 });
    },
    onSwiping: (eventData) => {
      setSwiping({ deltaX: eventData.deltaX, deltaY: eventData.deltaY });
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
      return <div className="feedback-icon">❤️</div>; // Heart for liking
    } else if (swipeFeedback === 'dislike') {
      return <div className="feedback-icon">💔</div>; // Broken heart for disliking
    }
    return null; // No icon if no feedback
  };


  return (
    <div className="Club-App">
      <div className="Clubs-Swipe">
        <h1 className="slogan">University Clubs</h1>
        <div className="club-container">
          {clubs.slice(currentIndex).map((club, index) => (
            <div
              key={club.id}
              ref={index === 0 ? cardRef : null}
              {...swipeHandlers}
              className="club"
              style={getCardStyle(index)}
            >
              {index === 0 && renderFeedbackIcon()} {/* Only show feedback icon on the top card */}
              <img src={club.photo} alt={club.name} className="club-photo" />
              <div className="club-info">
                <div className="club-name">{club.name}</div>
                <div className="club-description">{club.description}</div>
                <div className="club-members">{`${club.members} Members`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Clubs;
