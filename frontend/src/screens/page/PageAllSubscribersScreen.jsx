import React from 'react';
import DashboardHeader from '../../components/Page/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Page/Layout/DashboardSidebar';
import GetPageSubscribers from '../../components/Page/GetPageSubscribers';
const CreatePostScreen = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={2} />
        </div>
        <GetPageSubscribers />
      </div>
    </div>
  );
};

export default CreatePostScreen;
