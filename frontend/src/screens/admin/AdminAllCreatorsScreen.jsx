import React from 'react';
import AdminHeader from '../../components/admin/Layout/AdminHeader';
import AdminSidebar from '../../components/admin/Layout/AdminSidebar';
import AllCreators from '../../components/admin/AllCreators';
const AdminAllCreatorsScreen = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={4} />
          </div>
          <AllCreators />
        </div>
      </div>
    </div>
  );
};

export default AdminAllCreatorsScreen;
