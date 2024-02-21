import React from 'react';
import { RxDashboard } from 'react-icons/rx';
import { VscNewFile } from 'react-icons/vsc';
import { CiSettings } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { MdExplore } from 'react-icons/md';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? 'crimson' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Page Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/page-subscribers" className="w-full flex items-center">
          <BiSolidPurchaseTag
            size={30}
            color={`${active === 2 ? 'crimson' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            All Subscribers
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/page-posts" className="w-full flex items-center">
          <BsFillFileEarmarkPostFill
            size={30}
            color={`${active === 3 ? 'crimson' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            All Posts
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/page-create-post" className="w-full flex items-center">
          <VscNewFile
            size={30}
            color={`${active === 4 ? 'crimson' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Create Post
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/explore" className="w-full flex items-center">
          <MdExplore size={30} color={`${active === 6 ? 'crimson' : '#555'}`} />
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
        <Link to="/page-withdraw-money" className="w-full flex items-center">
          <FaMoneyCheckAlt
            size={30}
            color={`${active === 7 ? 'crimson' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Withdraw Money
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
            Page Inbox
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/page-settings" className="w-full flex items-center">
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
  );
};

export default DashboardSideBar;