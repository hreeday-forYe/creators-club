import React from 'react';
import { AiOutlineGift } from 'react-icons/ai';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import logo from '../../../assets/logo.png';

const AdminHeader = () => {
  const { authInfo } = useSelector((state) => state.auth);
  console.log(authInfo);
  const creator = authInfo.user;
  console.log(creator);

  return (
    <div className="w-full h-[65px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/admin-dashboard">
          <img src={logo} className="w-52" alt="Creators Club Logo" />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          {/* <Link to="/dashboard/cupouns" className="800px:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link> */}
          {/* <img
            src={`${creator?.avatar?.url || 'Hello'}`}
            alt="Hello"
            className="w-[50px] h-[50px] rounded-full object-cover"
          /> */}
          <Avatar alt="Cindy Baker" src={`${creator?.avatar?.url}`}>
            {!creator?.avatar && 'A'}
          </Avatar>
          <span className="text-lg ml-2 font-semibold">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
