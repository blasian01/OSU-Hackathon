// Classes.js
import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import './Classes.css'; 

const initialClasses = [
  { 
    id: 1, 
    major: 'CS', 
    name: 'Introduction to Programming', 
    photo: '/images/ClassImages/introProgramming.png', 
    description: 'Learn the basics of programming.', 
    members: 30, 
    meetingDays: 'TR',
    meetingTime: '2 PM' 
  },
  { 
    id: 2, 
    major: 'ENG', 
    name: 'British Literature', 
    photo: '/images/ClassImages/britLit.png', 
    description: 'Explore British literature.', 
    members: 25, 
    meetingDays: 'MW',
    meetingTime: '11 AM' 
  },
  { 
    id: 3, 
    major: 'BUS', 
    name: 'Marketing Principles', 
    photo: '/images/ClassImages/marketingPrinciples.png', 
    description: 'Introduction to marketing concepts and strategies.', 
    members: 35, 
    meetingDays: 'MWF',
    meetingTime: '3 PM' 
  },
  { 
    id: 4, 
    major: 'EE', 
    name: 'Circuit Analysis', 
    photo: '/images/ClassImages/circuitAnalysis.png', 
    description: 'Study of electrical circuits and their behavior.', 
    members: 20, 
    meetingDays: 'TR',
    meetingTime: '9 AM' 
  },
  { 
    id: 5, 
    major: 'ME', 
    name: 'Mechanics of Materials', 
    photo: '/images/ClassImages/mechanicsMaterials.png', 
    description: 'Understanding the behavior of materials under stress.', 
    members: 28, 
    meetingDays: 'MW',
    meetingTime: '1 PM' 
  },
];

function Classes() {
  const [classes, setClasses] = useState(initialClasses);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiping, setSwiping] = useState({ deltaX: 0, deltaY: 0 });
  const [swipeFeedback, setSwipeFeedback] = useState('');
  const [filterMajor, setFilterMajor] = useState('All');
  const cardRef = useRef(null);

  const filteredClasses = classes.filter(c => filterMajor === 'All' || c.major === filterMajor);

  const resetClasses = () => {
    setClasses(initialClasses); // Reset classes to initial list
    setCurrentIndex(0); // Reset current index to 0
  };

  const removeClass = (classId) => {
    setClasses(prevClasses => prevClasses.filter(c => c.id !== classId));
  };

  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === 'Left') {
        setSwipeFeedback('dislike');
      } else if (eventData.dir === 'Right') {
        setSwipeFeedback('like');
      }
      setSwiping({ deltaX: eventData.deltaX, deltaY: eventData.deltaY });
    },
    onSwiped: () => {
      const nextIndex = currentIndex < filteredClasses.length - 1 ? currentIndex + 1 : 0;
      removeClass(filteredClasses[currentIndex].id);
      setCurrentIndex(nextIndex); // Move to the next class
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
        zIndex: filteredClasses.length - index,
        transition: 'none',
      };
    }
    return {
      transform: `translateX(${index * 20}px)`,
      zIndex: filteredClasses.length - index,
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

  const handleMajorChange = (event) => {
    setFilterMajor(event.target.value);
    setCurrentIndex(0); // Reset to the first class of the filtered list
  };

  return (
    <div className="Class-App">
      <div className="filter-menu">
        <select onChange={handleMajorChange} value={filterMajor} className="major-filter-select">
        <option value="All">All Majors</option>
        <option value="ACC">Accounting</option>
        <option value="AGR">Agricultural Economics</option>
        <option value="AGB">Agricultural Education</option>
        <option value="AGED">Agricultural Communications</option>
        <option value="AEC">Agricultural Leadership</option>
        <option value="ANSC">Animal Science</option>
        <option value="ARCH">Architecture</option>
        <option value="AST">Astronomy</option>
        <option value="BIO">Biology</option>
        <option value="CHEM">Chemistry</option>
        <option value="CHIN">Chinese</option>
        <option value="COMM">Communication</option>
        <option value="CRP">Community Resource Planning</option>
        <option value="DANCE">Dance</option>
        <option value="ECON">Economics</option>
        <option value="EDUC">Education</option>
        <option value="ENSC">Environmental Science</option>
        <option value="FREN">French</option>
        <option value="GEO">Geology</option>
        <option value="GER">German</option>
        <option value="HIST">History</option>
        <option value="HORT">Horticulture</option>
        <option value="ITAL">Italian</option>
        <option value="JAPN">Japanese</option>
        <option value="JMC">Journalism and Media Communication</option>
        <option value="LATN">Latin</option>
        <option value="LING">Linguistics</option>
        <option value="MAT">Mathematics</option>
        <option value="MKTG">Marketing</option>
        <option value="MUSIC">Music</option>
        <option value="PHIL">Philosophy</option>
        <option value="PHYS">Physics</option>
        <option value="PSY">Psychology</option>
        <option value="SOC">Sociology</option>
        <option value="SPAN">Spanish</option>
        <option value="STAT">Statistics</option>
        <option value="TH">Theatre</option>
        <option value="VMC">Veterinary Medicine</option>
        <option value="ZOO">Zoology</option>
        </select>
      </div>

      <div className="back-button">
        <NavLink to="/home">
          <button className="classes-home-button">Back</button>
        </NavLink>
      </div>

      {filteredClasses.length > 0 ? (
        <div className="Classes-Swipe">
          <h1 className="slogan">University Classes</h1>
          <div className="class-container">
            {filteredClasses.slice(currentIndex, currentIndex + 1).map((c, index) => (
              <div
                key={c.id}
                ref={cardRef}
                {...swipeHandlers}
                className="class"
                style={getCardStyle(index)}
              >
                {renderFeedbackIcon()}
                <img
                  src={c.photo}
                  alt={c.name}
                  className="class-photo"
                  onDragStart={(event) => event.preventDefault()}
                />
                <div className="class-info">
                  <div className="class-name">{c.name}</div>
                  <div className="class-description">{c.description}</div>
                  <div className="class-members">{`${c.members} Members`}</div>
                  <div className='meetingDays'>Meeting Days: {c.meetingDays}</div>
                  <div className='meetingTime'>Meeting Times: {c.meetingTime}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-classes-message">
          <p>No more classes available. Please select a different major or reset.</p>
          <button onClick={resetClasses} className="reset-button">Reset Classes</button>
        </div>
      )}

    </div>
  );
}

export default Classes;
