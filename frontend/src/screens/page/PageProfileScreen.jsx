import React from 'react';
import PageProfile from '../../components/Page/profile/PageProfile';
import DashboardHeader from '../../components/Page/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Page/Layout/DashboardSidebar';
import Navbar from '../../components/User/Navbar';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/User/Sidebar';
const PageProfileScreen = () => {
  const { authInfo } = useSelector((state) => state.auth);
  console.log(authInfo);
  return (
    <div>
      {authInfo.creator ? (
        <>
          <DashboardHeader />
          <div className="flex w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar />
            </div>
            <PageProfile isCreator={true} user={authInfo.creator} />
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div className="flex w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <Sidebar active={4} />
            </div>
            <PageProfile user={authInfo.user} />
          </div>
        </>
      )}
    </div>
  );
};

export default PageProfileScreen;
