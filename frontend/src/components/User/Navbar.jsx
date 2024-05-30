import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoNotificationsOutline } from 'react-icons/io5';
import { AiOutlineSearch } from 'react-icons/ai';
import { useGetAllCreatorsQuery } from '../../redux/slices/pagesApiSlice';
import { Avatar } from '@mui/material';
import logo from '../../assets/logo.png';
import {
  useGetUserNotificationsQuery,
  useUpdateUserNotificationsMutation,
} from '../../redux/slices/usersApiSlice';
import { useSelector } from 'react-redux';
import socketIO from 'socket.io-client';
import { socket_server_url } from '../../constants';
const socketId = socketIO(socket_server_url, { transports: ['websocket'] });

const Navbar = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const { user } = authInfo;

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState(null);
  const { data: creatorsData, isLoading: creatorsLoading } =
    useGetAllCreatorsQuery();
  const creators = creatorsData?.creators;
  console.log(creators);

  // Handle Notifications
  const { data, refetch, isLoading } = useGetUserNotificationsQuery();

  const [updateNotificationStatus, { isSuccess }] =
    useUpdateUserNotificationsMutation();

  const [notifications, setNotifications] = useState([]);
  // console.log(notifications);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      creators &&
      creators.filter(
        (creator) =>
          !creator.isBanned &&
          creator.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener('scroll', () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item) => item.status === 'unread')
      );
    }
    // audio.load();
    if (isSuccess) {
      refetch();
    }
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on('notification', async (data) => {
      // playerNotificationSound();
      await refetch();
    });
  }, []);

  //  handle notification status
  const changeNotificationStatus = async (id) => {
    await updateNotificationStatus({ id }).unwrap();
  };

  // format date and time
  const timeAgo = (getDate) => {
    const date = new Date(getDate);
    const timeAgo = formatDistanceToNow(date, { addSuffix: true });
    return timeAgo;
  };

  return (
    <div className="w-full h-[65px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/feed">
          <img src={logo} className="w-52" alt="" />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4 space-x-4">
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Creators..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute w-full min-h-[40vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/page/${i._id}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${i.avatar?.url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          {/* Space for avatar */}
          <Link to={`/profile`}>
            <div className="flex items-center space-x-2">
              <Avatar
                sx={{ width: 46, height: 46, backgroundColor: '#FFA500' }}
                alt="Jack Sparrow"
                src={user?.avatar?.url}
                className="hover:animate-pulse transition duration-50"
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <h5 className="text-gray-600 text-lg font-medium hover:text-gray-900 transition duration-200 capitalize ">
                {user?.name}
              </h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
