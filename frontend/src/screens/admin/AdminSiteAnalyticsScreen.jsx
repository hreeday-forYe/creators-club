import React from 'react';
import AdminHeader from '../../components/admin/Layout/AdminHeader';
import AdminSidebar from '../../components/admin/Layout/AdminSidebar';
import PostsAnalytics from '../../components/admin/analytics/PostsAnalytics';
import CreatorAnalytics from '../../components/admin/analytics/CreatorAnalytics';
import SubscriptionAnalyticss from '../../components/admin/analytics/SubscriptionAnalytics';
import UserAnalytics from '../../components/admin/analytics/UserAnalytics';
import { useEffect } from 'react';
const AdminSiteAnalyticsScreen = () => {
  useEffect(() => {
    // refetch();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex flex-col">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={7} />
          </div>
          <div className="flex flex-col w-[80vw] 800px:p-8">
            <PostsAnalytics />
            <SubscriptionAnalyticss />
            <UserAnalytics />
            <CreatorAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSiteAnalyticsScreen;
