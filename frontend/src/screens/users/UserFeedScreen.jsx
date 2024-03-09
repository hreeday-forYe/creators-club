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
        <Stack direction="row" spacing={6} justifyContent={'space-between'}>
          <Sidebar active={1} />
          <Feed />
          <Rightbar />
        </Stack>
      </Box>
    </div>
  );
};

export default UserFeedScreen;
