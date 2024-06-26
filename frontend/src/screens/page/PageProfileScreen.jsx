import React, { useEffect, useState } from 'react';
import PageProfile from '../../components/Page/profile/PageProfile';
import DashboardHeader from '../../components/Page/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Page/Layout/DashboardSidebar';
import AdminHeader from '../../components/admin/Layout/AdminHeader';
import AdminSidebar from '../../components/admin/Layout/AdminSidebar';
import Navbar from '../../components/User/Navbar';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/User/Sidebar';
import { useParams } from 'react-router-dom';
const PageProfileScreen = () => {
  const { authInfo } = useSelector((state) => state.auth);
  // console.log(authInfo);
  const { id: pageId } = useParams();
  const [isCreator, setIsCreator] = useState(false);
  useEffect(() => {
    if (authInfo?.creator) {
      if (authInfo?.creator?._id === pageId) {
        setIsCreator(true);
      }
    }
  }, [authInfo, pageId]);
  return (
    <div>
      {authInfo?.creator ? ( // Check if authInfo has a creator
        <>
          <DashboardHeader />
          <div className="flex w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar />
            </div>
            <PageProfile isCreator={isCreator} user={authInfo.creator} />
          </div>
        </>
      ) : authInfo?.user && authInfo?.user?.role === 'Admin' ? ( // Check if authInfo has a user with role 'ADMIN'
        <>
          <AdminHeader />
          <div className="flex w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <AdminSidebar active={4} />
            </div>
            <PageProfile
              isCreator={isCreator}
              user={authInfo.user}
            ></PageProfile>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div className="flex w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <Sidebar active={4} />
            </div>
            <PageProfile isCreator={isCreator} user={authInfo.user} />
          </div>
        </>
      )}
    </div>
  );
};

export default PageProfileScreen;
