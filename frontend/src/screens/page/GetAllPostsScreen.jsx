import React from 'react';
import DashboardHeader from '../../components/Page/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Page/Layout/DashboardSidebar';
import GetAllPosts from '../../components/Page/GetAllPosts.jsx';
const CreatePostScreen = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={3} />
        </div>
        <GetAllPosts />
      </div>
    </div>
  );
};

export default CreatePostScreen;
