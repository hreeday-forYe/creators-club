import React, { useState, useEffect } from 'react';
import SubscriptionAnalytics from '../analytics/SubscriptionAnalytics';
import { AiOutlineMoneyCollect } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';
import { useGetAllCreatorsQuery } from '../../../redux/slices/pagesApiSlice';
import { useAdminGetAllUsersQuery } from '../../../redux/slices/usersApiSlice';
import { useAdminAllSubscriptionsQuery } from '../../../redux/slices/subscriptionApiSlice';
import { useAdminAllPostsQuery } from '../../../redux/slices/postApiSlice';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import WithdrawRequest from '../WithdrawRequest';
import { IoPeopleSharp } from 'react-icons/io5';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { GrWorkshop } from 'react-icons/gr';
import Loader from '../../Loader';

const AdminDashboardMain = () => {
  const { data, isLoading } = useGetAllCreatorsQuery();
  const { data: userdata } = useAdminGetAllUsersQuery();
  const { data: subscriptionData } = useAdminAllSubscriptionsQuery();
  const { data: postsData } = useAdminAllPostsQuery();
  const users = userdata?.users?.length;
  const creators = data?.creators?.length;
  const subscriptions = subscriptionData?.subscriptions?.length;
  const posts = postsData?.posts?.length;
  const profit = subscriptionData?.subscriptions.reduce(
    (acc, item) => acc + item.totalPrice * 0.2,
    0
  );

  const calculateBalance = (subscriptionData) => {
    let balance = 0;
    subscriptionData?.subscriptions.map((item) => {
      balance += item.totalPrice;
    });
    return balance;
  };

  // console.log(profit);

  return (
    <div className="w-full p-8">
      <h1 className="text-xl font-Poppins font-medium">Welcome to Dashboard</h1>
      <div className="flex flex-wrap gap-3 mt-2 flex-col  800px:flex-row">
        {/* <div>Total Balance</div> */}
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Total Balance <span className="text-[16px]"></span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500] mb-2">
            {/* ${adminBalance?.toFixed(2)} */}
            {isLoading && <Loader />}${calculateBalance(subscriptionData)}
            {/* 2% of totalPrice */}
          </h5>
          <Link className="mt-2 text-green-500 font-medium font-Poppins text-md">
            <span className='text-sm'>2% service charge profit:</span> ${profit}
          </Link>
        </div>
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <GrWorkshop size={30} className="mr-2" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Total Creators <span className="text-[16px]"></span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] mb-2 font-[500]">
            {/* ${adminBalance?.toFixed(2)} */}
            {isLoading && <Loader />}

            {creators}
          </h5>
          <Link to={'/all-creators'} className=" text-sm text-blue-700">
            View all Creators
          </Link>
        </div>
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <IoPeopleSharp size={30} className="mr-2" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Total Users <span className="text-[16px]"></span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] mb-2 font-[500]">
            {/* ${adminBalance?.toFixed(2)} */}
            {isLoading && <Loader />}

            {users}
          </h5>
          <Link to={'/all-users'} className=" text-sm text-blue-700">
            View all Users
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <BiSolidPurchaseTag size={30} className="mr-2" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Total Subscriptions <span className="text-[16px]"></span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] mb-2 font-[500]">
            {/* ${adminBalance?.toFixed(2)} */}
            {isLoading && <Loader />}

            {subscriptions}
          </h5>
          <Link to={'/all-subscriptions'} className=" text-sm text-blue-700">
            View all Subscriptions
          </Link>
        </div>
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <BsFillFileEarmarkPostFill size={30} className="mr-2" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Total Posts <span className="text-[16px]"></span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] mb-2 font-[500]">
            {/* ${adminBalance?.toFixed(2)} */}
            {isLoading && <Loader />}

            {posts}
          </h5>
          <Link to={'/all-posts'} className=" text-sm text-blue-700">
            View all Posts
          </Link>
        </div>
      </div>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <WithdrawRequest />
      </div>
      <div className="w-[90%]">
        <Link
          to={'/site-analytics'}
          className="p-2 text-blue-700 font-medium border-2 border-blue-700 hover:shadow-mdx"
        >
          View full Analytics
        </Link>
        {/* <PostsAnalytics /> */}
        <SubscriptionAnalytics />
      </div>
    </div>
  );
};

export default AdminDashboardMain;
