import React from 'react';
import PageProfile from '../../components/Page/profile/PageProfile';
import DashboardSideBar from '../../components/Page/Layout/DashboardSideBar';
import DashboardHeader from '../../components/Page/Layout/DashboardHeader';
const PageProfileScreen = () => {
  return (
    <>
      <div>
        {/* <DashboardHeader /> */}
        <div className="flex items-start justify-between">
          <PageProfile />
        </div>
      </div>
    </>
  );
};

export default PageProfileScreen;
