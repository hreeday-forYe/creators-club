import React, { useEffect, useState } from 'react';
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from 'react-icons/ai';
import styles from '../../../styles/styles';
import { Link } from 'react-router-dom';
import { MdBorderClear } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMyPostsQuery } from '../../../redux/slices/postApiSlice';
import { usePageProfileQuery } from '../../../redux/slices/pagesApiSlice';
// import {useGetMySubscriptions} from '../../../redux/slices/subscriptionApiSlice.js'
import Button from '@mui/material/Button';

import { DataGrid } from '@mui/x-data-grid';
import { setCredentials } from '../../../redux/slices/authSlice';
import { useGetCreatorSubcriptionsQuery } from '../../../redux/slices/subscriptionApiSlice';

const DashboardHero = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const { creator } = authInfo;
  // console.log(creator);

  const availableBalance = creator?.availableBalance.toFixed(2);
  const { data, refetch: postRefetch } = useGetMyPostsQuery();
  const posts = data?.posts;

  const { data: loadPage } = usePageProfileQuery();
  const loadCreator = loadPage?.creator;
  const { data: getSubscriptions, refetch: subscrptionRefetch } =
    useGetCreatorSubcriptionsQuery();
  // console.log(getSubscriptions);

  const subscriptions = getSubscriptions?.subscriptions;

  // console.log(subscriptions);

  useEffect(() => {
    postRefetch();
    subscrptionRefetch();
  }, [postRefetch, subscrptionRefetch]);
  const columns = [
    { field: 'id', headerName: 'Subscription ID', minWidth: 150, flex: 0.8 },

    {
      field: 'subscriberName',
      headerName: 'Subscriber Name',
      type: 'number',
      minWidth: 130,
      flex: 0.6,
    },

    {
      field: 'startedDate',
      headerName: 'Started Date',
      minWidth: 130,
      flex: 0.6,
      type: 'number',
    },
    {
      field: 'expiryDate',
      headerName: 'Expiry Date',
      type: 'number',
      minWidth: 130,
      flex: 0.6,
    },

    {
      field: 'total',
      headerName: 'Price',
      type: 'number',
      minWidth: 130,
      flex: 0.6,
    },

    {
      field: 'More',
      flex: 0.7,
      minWidth: 100,
      headerName: 'More',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/page-subscribers`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  const formatDate = (date) => {
    const formattedExpiryDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedExpiryDate;
  };

  subscriptions &&
    subscriptions.forEach((subscription, index) => {
      // console.log(subscription);
      row.push({
        id: subscription._id,
        subscriberName: subscription?.subscriber?.name,
        startedDate: formatDate(subscription.startedAt),
        // itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: 'US$ ' + subscription.totalPrice,
        expiryDate: formatDate(subscription.expiryDate),
      });
    });

  // custom no rows overlay
  // Custom "No rows" overlay component
  const CustomNoRowsOverlay = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <span>No Latest Subscriptions</span>
      </div>
    );
  };
  return (
    <div className="w-[85vw] p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Page Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Account Balance{' '}
              <span className="text-[16px]">(with 2% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            ${loadCreator?.availableBalance.toFixed(2)}
          </h5>
          <Link to="/page-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Subscriptions
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {subscriptions && subscriptions.length}
          </h5>
          <Link to="/page-subscribers">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Subscribers</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Posts
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {posts && posts.length}
          </h5>
          <Link to="/page-posts">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Posts</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Latest Subscriptions</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={row ? row : 'No Subscriptions'}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      </div>
    </div>
  );
};

export default DashboardHero;
