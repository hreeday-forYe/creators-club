import React from 'react';
import Navbar from '../../components/User/Navbar';
import Rightbar from '../../components/User/Rightbar';
import Sidebar from '../../components/User/Sidebar';
import Feed from '../../components/User/Feed';
import { Box, Stack } from '@mui/material';
const UserFeedScreen = () => {
  return (
    <div>
      <Box>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent={'space-between'}>
          <Sidebar />
          <Feed />
          <Rightbar />
        </Stack>
      </Box>
    </div>
  );
};

export default UserFeedScreen;
