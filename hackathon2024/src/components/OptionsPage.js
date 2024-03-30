import React, { useEffect } from 'react';
import Option from './OptionsPage/OptionsPage';

const OptionsPage = () => {  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Option />
    </div>
  );
}

export default OptionsPage;