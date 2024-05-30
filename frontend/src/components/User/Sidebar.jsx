import React from 'react';
import { RxDashboard } from 'react-icons/rx';
import { VscNewFile } from 'react-icons/vsc';
import { CiSettings } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { MdExplore, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { Button } from '@mui/base';
import { CiLogout } from 'react-icons/ci';
import { IoHome, IoPeopleSharp } from 'react-icons/io5';
import { RxAvatar } from 'react-icons/rx';
import { logout } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../redux/slices/usersApiSlice';

const Sidebar = ({ active }) => {
  const [logoutApiCall] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <div className="w-[80px] h-[100vh] bg-white shadow-lg border border-3 fixed top-15 left-0 z-10 overflow-x-hidden overflow-y-auto 800px:w-[250px]">
      {/* single item */}
      <div className="w-full flex items-center p-4 hover:shadow-md  hover:translate-y-1 transition duration-100">
        <Link to="/feed" className="w-full flex items-center">
          <IoHome size={30} color={`${active === 1 ? 'blue' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 1 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            Home
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md  hover:translate-y-1 transition duration-100">
        <Link to="/my-subscriptions" className="w-full flex items-center">
          <BiSolidPurchaseTag
            size={30}
            color={`${active === 2 ? 'blue ' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 2 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            My Subscriptions
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md  hover:translate-y-1 transition duration-100">
        <Link to="/my-followings" className="w-full flex items-center">
          <IoPeopleSharp
            size={30}
            color={`${active === 3 ? 'blue' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 3 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            My Followings
          </h5>
        </Link>
      </div>

      {/* <div className="w-full flex items-center p-4 hover:shadow-md  hover:translate-y-1 transition duration-100">
        <Link to="/explore" className="w-full flex items-center">
          <MdExplore size={30} color={`${active === 4 ? 'blue' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 4 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            Explore
          </h5>
        </Link>
      </div> */}

      {/* <div className="w-full flex items-center p-4 hover:shadow-md  hover:translate-y-1 transition duration-100">
        <Link to="/inbox" className="w-full flex items-center">
          <BiMessageSquareDetail
            size={30}
            color={`${active === 5 ? 'blue' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 5 ? 'text-blue-500' : 'text-[#555]'
            }`}
          >
            Inbox
          </h5>
        </Link>
      </div> */}

      <div className="w-full flex items-center p-4 hover:shadow-md  hover:translate-y-1 transition duration-100">
        <Link to="/profile" className="w-full flex items-center">
          <RxAvatar size={30} color={`${active === 6 ? 'blue' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 6 ? 'text-[blue]' : 'text-[#555]'
            }`}
          >
            Profile
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md  hover:translate-y-1 transition duration-100">
        <Button onClick={logoutHandler} className="w-full flex items-center">
          <CiLogout size={30} color={`${active === 12 ? 'crimson' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 12 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Logout
          </h5>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
