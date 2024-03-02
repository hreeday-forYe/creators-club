import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineGift } from 'react-icons/ai';
import { Avatar } from '@mui/material';
const DashboardHeader = () => {
  const creator = JSON.parse(localStorage.getItem('pageInfo'));
  console.log(creator);
  return (
    <div className="w-full h-[65px] bg-black shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/page-dashboard">
          {/* <img src="" alt="Creators Club Logo" /> */}
          <h6 className="text-white font-medium text-xl">Creators Club</h6>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/subscribers" className="800px:block hidden">
            My Subscribers
          </Link>

          {/* Space for avatar */}
          <Link to={`/page/${creator._id}`}>
            <div className="flex items-center space-x-2">
              <Avatar
                sx={{ width: 46, height: 46 }}
                alt="Jack Sparrow"
                src={creator.avatar?.url}
                className="hover:animate-pulse transition duration-100"
              ></Avatar>
              <h5 className="text-white text-lg hover:text-gray-200 transition duration-200 capitalize ">
                {creator.name}
              </h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
