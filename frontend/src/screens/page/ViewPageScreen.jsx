import React from 'react';
import Navbar from '../../components/User/Navbar';
import Sidebar from '../../components/User/Sidebar';
import Feed from '../../components/User/Feed';
// import Rightbar from '../../components/User/Rightbar';
import { SlUserFollow } from 'react-icons/sl';
import { Button } from '@mui/material';
import './Profile.css';
const ViewPageScreen = () => {
  return (
    <>
      <Navbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="h-[3]">
              <img
                className="profileCoverImg"
                src="https://images.unsplash.com/photo-1598395927056-8d895e701c3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JlZWNlfGVufDB8fDB8fHww"
                alt=""
              />
              <img
                className="profileUserImg"
                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">John Doelu</h4>
              <span className="profileInfoDesc">
                Hola! <Button className=""></Button>
              </span>
            </div>
            <div className="flex items-center">
              <Button className="p-4 rounded-sm">
                <h4 className="ml-4 p-2 bg-blue-600 text-white rounded-md">
                  Posts
                </h4>
              </Button>
              <Button className="p-4">
                <h4 className="ml-4 p-2 bg-gray-200 text-black rounded-md">
                  Photos
                </h4>
              </Button>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            {/* <Rightbar profile /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPageScreen;
