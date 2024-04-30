import React, { useEffect } from 'react';
import UserProfile from '../../components/User/UserProfile';
import Navbar from '../../components/User/Navbar';
import Sidebar from '../../components/User/Sidebar';
import Rightbar from '../../components/User/Rightbar';
const UserProfileScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div className="flex items-start w-full">
          <div className="w-[25vw] 800px:w-[330px]">
            <Sidebar active={6} />
          </div>
          <div className="w-full  800px:w-[50vw]">
            <UserProfile />
          </div>
          <div className="hidden w-[25vw] 800px:block">
            <Rightbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileScreen;
