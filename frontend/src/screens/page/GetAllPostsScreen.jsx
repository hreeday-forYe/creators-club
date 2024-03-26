import React from 'react';
import { Stack } from '@mui/material';
import DashboardHeader from '../../components/Page/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Page/Layout/DashboardSidebar.jsx';
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
      {/* <Stack direction="row" spacing={6} justifyContent={'space-between'}>
        <DashboardSideBar active={3} />
        <GetAllPosts />
      </Stack> */}
    </div>
  );
};

export default CreatePostScreen;
