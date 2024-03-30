import React, { useEffect } from 'react';
import Events from './EventsPage/Events';

const EventsPage = () => {  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Events />
    </div>
  );
}

export default EventsPage;