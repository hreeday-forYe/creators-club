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

import { logout } from '../../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogoutPageMutation } from '../../../redux/slices/pagesApiSlice';

const DashboardSideBar = ({ active }) => {
  const { authInfo } = useSelector((state) => state.auth);
  const { creator } = authInfo;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutPageMutation();
  // Logout Page Profile
  // const logoutHandler = async () => {
  //   try {
  //     axios.defaults.withCredentials = true;
  //     const response = await axios(`${page_url}/logout-page`, {
  //       method: 'POST',
  //       withCredentials: true,
  //     });
  //     localStorage.clear();
  //     toast.success(response.data.message);
  //     navigate('/');
  //   } catch (error) {
  //     console.log(error.message);
  //     toast.error(error.message);
  //   }
  // };

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
    <div className="w-[80px] h-[100vh] bg-white shadow-sm border border-3 fixed top-15 left-0 z-10 overflow-x-hidden overflow-y-auto 800px:w-[250px]">
      {/* single item */}
      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Link to="/page-dashboard" className="w-full flex items-center">
          <RxDashboard size={30} color={`${active === 1 ? 'blue' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            Page Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Link to="/page-subscribers" className="w-full flex items-center">
          <BiSolidPurchaseTag
            size={30}
            color={`${active === 2 ? 'blue ' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            All Subscribers
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Link to="/page-posts" className="w-full flex items-center">
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
        <Link to="/create-post" className="w-full flex items-center">
          <VscNewFile size={30} color={`${active === 4 ? 'blue' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            Create Post
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Link to="/explore" className="w-full flex items-center">
          <MdExplore size={30} color={`${active === 6 ? 'blue' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            Explore
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Link to="/page-withdraw-money" className="w-full flex items-center">
          <FaMoneyCheckAlt
            size={30}
            color={`${active === 7 ? 'blue' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? 'text-blue-700' : 'text-[#555]'
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Link to="/page-messages" className="w-full flex items-center">
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

      {creator && creator.role === 'Admin' && (
        <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
          <Link to="/admin-dashboard" className="w-full flex items-center">
            <MdOutlineAdminPanelSettings
              size={30}
              color={`${active === 8 ? 'crimson' : '#555'}`}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                active === 8 ? 'text-[crimson]' : 'text-[#555]'
              }`}
            >
              Admin Dashboard
            </h5>
          </Link>
        </div>
      )}

      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Link to="/page-settings" className="w-full flex items-center">
          <CiSettings size={30} color={`${active === 11 ? 'blue' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? 'text-[blue]' : 'text-[#555]'
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:shadow-md hover:translate-y-1 transition duration-100">
        <Button onClick={logoutHandler} className="w-full flex items-center">
          <CiLogout size={30} color={`${active === 12 ? 'crimson' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
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

export default DashboardSideBar;
