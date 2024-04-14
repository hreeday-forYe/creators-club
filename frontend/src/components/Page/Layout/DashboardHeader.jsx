import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Dialog } from '@mui/material';
import { useSelector } from 'react-redux';
import { IoNotificationsOutline } from 'react-icons/io5';
import {
  useGetCreatorsNotificationsQuery,
  useUpdateCreatorsNotificationsMutation,
} from '../../../redux/slices/pagesApiSlice';
import { formatDistanceToNow, format } from 'date-fns';
import socketIO from 'socket.io-client';
import { socket_server_url } from '../../../constants';
import notification from '../../../assets/notification.mp3';
const socketId = socketIO(socket_server_url, { transports: ['websocket'] });

const DashboardHeader = () => {
  const { authInfo } = useSelector((state) => state.auth);

  const { creator } = authInfo;

  const [open, setOpen] = useState(false);
  // console.log(creator);

  // Handle Notifications
  const { data, refetch, isLoading } = useGetCreatorsNotificationsQuery();

  const [updateNotificationStatus, { isSuccess }] =
    useUpdateCreatorsNotificationsMutation();

  const [notifications, setNotifications] = useState([]);
  // console.log(notifications);

  const [audio] = useState(new Audio(notification));

  const playerNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item) => item.status === 'unread')
      );
    }
    audio.load();
    if (isSuccess) {
      refetch();
    }
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on('newNotification', (data) => {
      refetch();
      playerNotificationSound();
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
        <Link to="/page-dashboard">
          {/* <img src="" alt="Creators Club Logo" /> */}
          <h6 className="text-black font-medium text-xl">Creators Club</h6>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4 space-x-4">
          <div
            className="800px:block relative cursor-pointer m-2"
            onClick={() => setOpen(!open)}
          >
            <IoNotificationsOutline size={30} />
            <span className="absolute -top-2 -right-2 bg-blue-500 font-medium rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
              {notifications?.length}
            </span>
          </div>
          {open && (
            <div className="w-[350px] h-[50vh] overflow-y-auto bg-white shadow-xl absolute top-16 right-5 z-10 rounded">
              <h4 className="text-center text-[18px] p-3 mt-1 font-Poppins border-b-2">
                Notifications
              </h4>
              {notifications &&
                notifications.map((notification, index) => (
                  <div className="border-b-2 border-gray-300" key={index}>
                    <div className="w-full flex items-center justify-between p-2">
                      <p className="font-medium">{notification?.title}</p>
                      <p
                        className="cursor-pointer hover:text-blue-500 text-blue-900"
                        onClick={() =>
                          changeNotificationStatus(notification._id)
                        }
                      >
                        Mark as read
                      </p>
                    </div>
                    <p className="px-2">{notification?.message}</p>
                    <p className="px-2 py-1 text-[12px]">
                      {timeAgo(notification?.createdAt)}
                    </p>
                  </div>
                ))}
            </div>
          )}

          {/* Space for avatar */}
          <Link to={`/page/${creator._id}`}>
            <div className="flex items-center space-x-2">
              <Avatar
                sx={{ width: 46, height: 46 }}
                alt="Jack Sparrow"
                src={creator.avatar?.url}
                className="hover:animate-pulse transition duration-50"
              ></Avatar>
              <h5 className="text-gray-600 800px:block hidden text-lg font-medium hover:text-gray-900 transition duration-200 capitalize ">
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
