import React from 'react';
import DashboardHeader from '../../components/Page/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Page/Layout/DashboardSidebar';
import PageMessages from '../../components/Page/PageMessages';
const PageInboxScreen = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={6} />
        </div>
        <PageMessages />
      </div>
    </div>
  );
};

export default PageInboxScreen;
