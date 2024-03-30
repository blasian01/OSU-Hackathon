import React, { useEffect } from 'react';
import Footer from './Footer/Footer';
import Classes from './ClassesPage/Classes';

const ClassesPage = () => {  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Classes />
    </div>
  );
}

export default ClassesPage;