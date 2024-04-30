import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import logo from '../../../assets/logo.png';

const AdminHeader = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const admin = authInfo.user;

  return (
    <div className="w-full h-[65px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/admin-dashboard">
          <img src={logo} className="w-52" alt="Creators Club Logo" />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Avatar alt="Cindy Baker" src={`${admin?.avatar?.url}`}>
            {!admin?.avatar && 'A'}
          </Avatar>
          <span className="text-lg ml-2 font-semibold">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
