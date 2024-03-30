import React, { useEffect } from 'react';
import UserLikes from './UserLikesPage/UserLikes';

const UserLikesPage = () => {  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <UserLikes />
    </div>
  );
}

export default UserLikesPage;