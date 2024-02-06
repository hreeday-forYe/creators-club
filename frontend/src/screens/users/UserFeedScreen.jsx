import React from 'react';
import Navbar from '../../components/main/Navbar';
import Rightbar from '../../components/main/Rightbar';
import Sidebar from '../../components/main/Sidebar';
import Feed from '../../components/main/Feed';
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
