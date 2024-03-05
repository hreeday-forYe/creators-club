import React from 'react';
import AdminHeader from '../../components/admin/Layout/AdminHeader';
import AdminDashboardMain from '../../components/admin/Layout/AdminDashboardMain';
import AdminSideBar from '../../components/admin/Layout/AdminSidebar';
const AdminDashboardScreen = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={1} />
          </div>
          <AdminDashboardMain />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardScreen;
