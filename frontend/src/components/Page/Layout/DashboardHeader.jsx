import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineGift } from 'react-icons/ai';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { IoNotificationsOutline } from 'react-icons/io5';
import socketIO from 'socket.io-client';
import { socket_server_url } from '../../../constants';
const socketId = socketIO(socket_server_url, { transports: ['websocket'] });

const DashboardHeader = () => {
  const { authInfo } = useSelector((state) => state.auth);

  const { creator } = authInfo;
  console.log(creator);
  return (
    <div className="w-full h-[65px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/page-dashboard">
          {/* <img src="" alt="Creators Club Logo" /> */}
          <h6 className="text-black font-medium text-xl">Creators Club</h6>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4 space-x-4">
          <Link to="/page-notifications" className="800px:block hidden">
            <div className="flex items-center space-x-2">
              <IoNotificationsOutline size={30} />
            </div>
          </Link>

          {/* Space for avatar */}
          <Link to={`/page/${creator._id}`}>
            <div className="flex items-center space-x-2">
              <Avatar
                sx={{ width: 46, height: 46 }}
                alt="Jack Sparrow"
                src={creator.avatar?.url}
                className="hover:animate-pulse transition duration-50"
              ></Avatar>
              <h5 className="text-gray-600 text-lg font-medium hover:text-gray-900 transition duration-200 capitalize ">
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
