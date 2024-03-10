import React from 'react';
import DashboardHeader from '../../components/Page/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Page/Layout/DashboardSideBar';
import DashboardHero from '../../components/Page/Layout/DashboardHero';
const PageDashboardScreen = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
        <DashboardHero />
      </div>
    </div>
  );
};

export default PageDashboardScreen;
