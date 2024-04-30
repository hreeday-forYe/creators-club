import React from 'react';
import AdminHeader from '../../components/admin/Layout/AdminHeader';
import AdminSidebar from '../../components/admin/Layout/AdminSidebar';
import AllSubscriptions from '../../components/admin/AllSubscriptions';
const AdminAllSubscriptionsScreen = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={2} />
          </div>
          <AllSubscriptions />
        </div>
      </div>
    </div>
  );
};

export default AdminAllSubscriptionsScreen;
