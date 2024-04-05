import React, { useEffect } from 'react';
import DashboardHeader from '../../components/Page/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Page/Layout/DashboardSidebar';
import DashboardHero from '../../components/Page/Layout/DashboardHero';
// import { usePageProfileQuery } from '../../../redux/slices/pagesApiSlice';
import { usePageProfileQuery } from '../../redux/slices/pagesApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/slices/authSlice';
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
