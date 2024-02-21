import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineGift } from 'react-icons/ai';
const DashboardHeader = () => {
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
          <Link to="/dashboard/cupouns" className="800px:block hidden">
            <AiOutlineGift
              color="#fff"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          {/* Space for avatar */}
          <Link to={`/page/${creator._id}`}>
            <img
              src={`${creator.avatar?.url}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
