import React from 'react';
import DashboardHeader from '../../components/Page/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Page/Layout/DashboardSideBar';
import PageSettings from '../../components/Page/profile/PageSettings';
const PageSettingsScreen = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
        <PageSettings />
      </div>
    </div>
  );
};

export default PageSettingsScreen;
