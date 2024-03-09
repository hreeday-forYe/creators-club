import React from 'react';
import SuggestedPages from './SuggestedPages';
import { Box, Typography } from '@mui/material';
const Rightbar = () => {
  return (
    <>
      <Box flex={3} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Box position={'relative'}>
          <Typography variant="h6" fontWeight={300}>
            Suggested Pages
          </Typography>
          <SuggestedPages />
          <SuggestedPages />
          <SuggestedPages />
          <SuggestedPages />
          <SuggestedPages />
        </Box>
      </Box>
    </>
  );
};

export default Rightbar;
