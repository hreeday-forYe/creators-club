import React from 'react';
import AdminHeader from '../../components/admin/Layout/AdminHeader';
import AdminSidebar from '../../components/admin/Layout/AdminSidebar';
import AdminProfile from '../../components/admin/AdminProfile';
const AdminProfileScreen = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={8} />
          </div>
          <AdminProfile />
        </div>
      </div>
    </div>
  );
};

export default AdminProfileScreen;
