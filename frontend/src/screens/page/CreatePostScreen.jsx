import React from 'react';
import DashboardHeader from '../../components/Page/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Page/Layout/DashboardSidebar';
import CreatePost from '../../components/Page/CreatePost';
const CreatePostScreen = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={4} />
        </div>
        <CreatePost />
      </div>
    </div>
  );
};

export default CreatePostScreen;
