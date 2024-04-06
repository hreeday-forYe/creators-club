import React from 'react';
import Navbar from '../../components/User/Navbar';
import Sidebar from '../../components/User/Sidebar';
import UserSubscriptions from '../../components/User/UserSubscriptions';
import Rightbar from '../../components/User/Rightbar';
const UserSubscriptionScreen = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-start gap-12 w-full">
        <div className="w-[80px] 800px:w-[250px]">
          <Sidebar active={2} />
        </div>
        <div className="w-full mt-12 800px:w-[50vw]">
          <UserSubscriptions />
        </div>
        <div className="hidden w-[25vw] border 800px:block">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default UserSubscriptionScreen;
