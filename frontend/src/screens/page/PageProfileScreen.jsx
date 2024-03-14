import React from 'react';
import PageProfile from '../../components/Page/profile/PageProfile';
import DashboardHeader from '../../components/Page/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Page/Layout/DashboardSideBar';
const PageProfileScreen = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={2} />
        </div>
        <PageProfile />
      </div>
    </div>
  );
};

export default PageProfileScreen;
