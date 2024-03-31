import React, { useEffect } from 'react';
import Footer from './Footer/Footer';
import Clubs from './ClubPage/Clubs';
import ClubSideBar from './ClubPage/ClubSideBar';

const ClubsPage = () => {  
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