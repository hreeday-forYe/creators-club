import React from 'react';
import Navbar from '../../components/User/Navbar';
import Sidebar from '../../components/User/Sidebar';
import UserSubscriptions from '../../components/User/UserSubscriptions';
import Rightbar from '../../components/User/Rightbar';
const UserSubscriptionScreen = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-start w-full">
        <div className="w-[25vw] 800px:w-[330px]">
          <Sidebar active={2} />
        </div>
        <div className="w-full border  800px:w-[50vw]">
          <UserSubscriptions />
        </div>
        <div className="hidden w-[25vw] 800px:block">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default UserSubscriptionScreen;
