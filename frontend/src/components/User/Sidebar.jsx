import { Box } from '@mui/material';
import { IoIosHome } from 'react-icons/io';
import { MdExplore } from 'react-icons/md';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { FaUserFriends } from 'react-icons/fa';
import React from 'react';
import { Link } from 'react-router-dom';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { CiLogout } from 'react-icons/ci';
import { useLogoutMutation } from '../../redux/slices/usersApiSlice';
import { logout } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
const Sidebar = ({ active }) => {
  const [logoutApiCall, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <Box>
      <div className="w-full mr-2 h-[90vh] bg-white p-4 border shadow-sm sticky top-7 left-4 z-10">
        {/* single item */}
        <div className="w-full flex items-center p-4">
          <Link to="/feed" className="w-full flex items-center">
            <IoIosHome size={30} color={`${active === 1 ? 'blue' : '#555'}`} />
            <h5
              className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                active === 1 ? 'text-blue-700' : 'text-[#555]'
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
              color={`${active === 2 ? 'blue' : '#555'}`}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                active === 2 ? 'text-blue-700' : 'text-[#555]'
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
              Followings
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4">
          <Link to="/explore" className="w-full flex items-center">
            <MdExplore size={30} color={`${active === 6 ? 'blue' : '#555'}`} />
            <h5
              className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                active === 6 ? 'text-blue-600' : 'text-[#555]'
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
          <button onClick={logoutHandler}>
            <Link className="w-full flex items-center">
              <CiLogout
                size={30}
                color={`${active === 11 ? 'crimson' : '#555'}`}
              />
              <h5
                className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                  active === 11 ? 'text-[crimson]' : 'text-[#555]'
                }`}
              >
                Logout
              </h5>
            </Link>
          </button>
        </div>
      </div>
    </Box>
  );
};

export default Sidebar;
