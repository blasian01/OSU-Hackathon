import React, { useEffect } from 'react';
import Footer from './Footer/Footer';
import Classes from './ClassesPage/Classes';
import ClassesSideBar from './ClassesPage/ClassesSideBar';

const ClassesPage = () => {  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Classes />
      <ClassesSideBar />
    </div>
  );
}

export default ClassesPage;