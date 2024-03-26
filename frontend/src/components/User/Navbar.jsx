import React from 'react';
import { Link } from 'react-router-dom';
import { IoNotificationsOutline } from 'react-icons/io5';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
const Navbar = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const { user } = authInfo;
  return (
    <div className="w-full h-[65px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/feed">
          {/* <img src="" alt="Creators Club Logo" /> */}
          <h6 className="text-black font-medium text-xl">Creators Club</h6>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4 space-x-4">
          <Link to="/dashboard/subscribers" className="800px:block hidden">
            <div className="flex items-center space-x-2">
              <IoNotificationsOutline size={30} />
            </div>
          </Link>

          {/* Space for avatar */}
          <Link to={`/profile`}>
            <div className="flex items-center space-x-2">
              <Avatar
                sx={{ width: 46, height: 46, backgroundColor: '#FFA500' }}
                alt="Jack Sparrow"
                src={user?.avatar?.url}
                className="hover:animate-pulse transition duration-50"
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <h5 className="text-gray-600 text-lg font-medium hover:text-gray-900 transition duration-200 capitalize ">
                {user?.name}
              </h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
