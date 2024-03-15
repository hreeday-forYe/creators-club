import React from 'react';
import Navbar from '../../components/User/Navbar';
import Rightbar from '../../components/User/Rightbar';
import Sidebar from '../../components/User/Sidebar';
import Feed from '../../components/User/Feed';
import { Box, Stack } from '@mui/material';
const UserFeedScreen = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-start w-full">
        <div className="w-[25vw] 800px:w-[330px]">
          <Sidebar active={1} />
        </div>
        <div className="w-full 800px:w-[50vw]">
          <Feed />
        </div>
        <div className="hidden w-[25vw] 800px:block">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default UserFeedScreen;
