import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { IoIosHome } from 'react-icons/io';
import { MdExplore } from 'react-icons/md';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { FaUserFriends } from 'react-icons/fa';
import { RxDashboard } from 'react-icons/rx';
import React from 'react';
import { Link } from 'react-router-dom';
// import CreatePost from './CreatePost';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { VscNewFile } from 'react-icons/vsc';
import { CiSettings } from 'react-icons/ci';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { MdOutlinePostAdd } from 'react-icons/md';
import { FaMoneyCheckAlt } from 'react-icons/fa';
const Sidebar = ({ active }) => {
  return (
    <Box>
      <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
        {/* single item */}
        <div className="w-full flex items-center p-4">
          <Link to="/feed" className="w-full flex items-center">
            <IoIosHome
              size={30}
              color={`${active === 1 ? 'crimson' : '#555'}`}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                active === 1 ? 'text-[crimson]' : 'text-[#555]'
              }`}
            >
              Home
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4">
          <Link to="/dashboard-orders" className="w-full flex items-center">
            <BiSolidPurchaseTag
              size={30}
              color={`${active === 2 ? 'crimson' : '#555'}`}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                active === 2 ? 'text-[crimson]' : 'text-[#555]'
              }`}
            >
              Subscriptions
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4">
          <Link to="/my-followings" className="w-full flex items-center">
            <FaUserFriends
              size={30}
              color={`${active === 3 ? 'crimson' : '#555'}`}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                active === 3 ? 'text-[crimson]' : 'text-[#555]'
              }`}
            >
              Following
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4">
          <Link
            to="/dashboard-create-event"
            className="w-full flex items-center"
          >
            <MdExplore
              size={30}
              color={`${active === 6 ? 'crimson' : '#555'}`}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                active === 6 ? 'text-[crimson]' : 'text-[#555]'
              }`}
            >
              Explore
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4">
          <Link to="/dashboard-messages" className="w-full flex items-center">
            <BiMessageSquareDetail
              size={30}
              color={`${active === 8 ? 'crimson' : '#555'}`}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                active === 8 ? 'text-[crimson]' : 'text-[#555]'
              }`}
            >
              Inbox
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4">
          <Link to="/settings" className="w-full flex items-center">
            <CiSettings
              size={30}
              color={`${active === 11 ? 'crimson' : '#555'}`}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                active === 11 ? 'text-[crimson]' : 'text-[#555]'
              }`}
            >
              Settings
            </h5>
          </Link>
        </div>
      </div>
    </Box>
  );
};

export default Sidebar;
