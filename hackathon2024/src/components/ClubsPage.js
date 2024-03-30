import React, { useEffect } from 'react';
import Footer from './Footer/Footer';
import Clubs from './ClubPage/Clubs';

const ClubsPage = () => {  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Clubs />
    </div>
  );
}

export default ClubsPage;