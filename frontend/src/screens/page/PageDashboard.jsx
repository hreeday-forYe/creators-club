import React from 'react';
import { Avatar, Button } from '@mui/material';
// import Topbar from '../../components/Topbar';

const PageDashboard = () => {
  let creatorInfo = localStorage.getItem('creatorInfo');
  creatorInfo = JSON.parse(creatorInfo);
  console.log('This is creatorInfo', creatorInfo);
  return <>Page Dashboard</>;
};

export default PageDashboard;
