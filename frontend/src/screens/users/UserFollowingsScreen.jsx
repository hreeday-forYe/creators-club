import React from 'react';
import Navbar from '../../components/User/Navbar';
import Rightbar from '../../components/User/Rightbar';
import Sidebar from '../../components/User/Sidebar';
const UserFollowingsScreen = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-start w-full">
        <div className="w-[25vw] 800px:w-[330px]">
          <Sidebar active={1} />
        </div>
        <div className="w-full 800px:w-[50vw]">
          {/* //#TODO: keep the user following list here */}
          USER FOLLOWINGS
        </div>
        <div className="hidden w-[25vw] 800px:block">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default UserFollowingsScreen;
