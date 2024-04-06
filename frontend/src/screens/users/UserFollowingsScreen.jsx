import React from 'react';
import Navbar from '../../components/User/Navbar';
import Rightbar from '../../components/User/Rightbar';
import Sidebar from '../../components/User/Sidebar';
import UserFollowings from '../../components/User/UserFollowings';
const UserFollowingsScreen = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-start gap-12 w-full">
        <div className="w-[80px] 800px:w-[250px]">
          <Sidebar active={3} />
        </div>
        <div className="w-full mt-12 800px:w-[50vw]">
          {/* //#TODO: keep the user following list here */}
          <UserFollowings />
        </div>
        <div className="hidden w-[25vw] 800px:block">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default UserFollowingsScreen;
