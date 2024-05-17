import React from 'react';
import { RxDashboard } from 'react-icons/rx';
import { VscNewFile } from 'react-icons/vsc';
import { CiSettings } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { MdExplore, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { CiMoneyBill } from 'react-icons/ci';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { Button } from '@mui/base';
import { CiLogout } from 'react-icons/ci';
import { RxAvatar } from 'react-icons/rx';
import { page_url } from '../../../constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdBarChart } from "react-icons/md";
import { IoPeopleSharp } from 'react-icons/io5';
import { GrWorkshop } from 'react-icons/gr';
import { logout } from '../../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
// import { useLogoutPageMutation } from '../../../redux/slices/pagesApiSlice';
import { useLogoutMutation } from '../../../redux/slices/usersApiSlice';
const AdminSidebar = ({ active }) => {
  const { authInfo } = useSelector((state) => state.auth);
  const creator = authInfo.user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      const response = await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success(response.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-[80px] h-[100vh] bg-white shadow-sm border border-3 fixed top-15 left-0 z-10 overflow-y-auto 800px:w-[250px]">
      {/* single item */}
      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Link to="/admin-dashboard" className="w-full flex items-center">
          <RxDashboard size={30} color={`${active === 1 ? 'blue' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            Admin Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Link to="/all-subscriptions" className="w-full flex items-center">
          <BiSolidPurchaseTag
            size={30}
            color={`${active === 2 ? 'blue ' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            All Subscriptions
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Link to="/all-posts" className="w-full flex items-center">
          <BsFillFileEarmarkPostFill
            size={30}
            color={`${active === 3 ? 'blue' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            All Posts
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Link to="/all-creators" className="w-full flex items-center">
          <GrWorkshop size={30} color={`${active === 4 ? 'blue' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            All Creators
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Link to="/all-users" className="w-full flex items-center">
          <IoPeopleSharp
            size={30}
            color={`${active === 5 ? 'blue' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            All Users
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Link to="/admin-withdraw-request" className="w-full flex items-center">
          <CiMoneyBill size={30} color={`${active === 6 ? 'blue' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            Withdraw Requests
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Link to="/site-analytics" className="w-full flex items-center">
          <MdBarChart size={30} color={`${active === 7 ? 'blue' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            Site Analytics
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Link to="/admin-profile" className="w-full flex items-center">
          <RxAvatar size={30} color={`${active === 8 ? 'blue' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? 'text-[blue]' : 'text-[#555]'
            }`}
          >
            Admin Profile
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Button onClick={logoutHandler} className="w-full flex items-center">
          <CiLogout size={30} color={`${active === 11 ? 'crimson' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Logout
          </h5>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
