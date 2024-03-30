import React, { useEffect } from 'react';
import Professors from './ProfessorsPage/Professors';

const ProfessorsPage = () => {  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Professors />
    </div>
  );
}

export default ProfessorsPage;