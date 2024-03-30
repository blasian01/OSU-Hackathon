import React, { useEffect } from 'react';
import Footer from './Footer/Footer';

const AboutPage = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Footer />
    </div>
  );
}

export default AboutPage;
