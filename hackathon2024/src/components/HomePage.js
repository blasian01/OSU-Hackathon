import React, { useEffect } from 'react';
import Footer from './Footer/Footer';
import Welcome from './HomePage/Welcome';

const HomePage = () => {  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Welcome />
    </div>
  );
}

export default HomePage;