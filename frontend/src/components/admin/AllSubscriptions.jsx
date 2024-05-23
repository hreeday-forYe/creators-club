import React from 'react';
import { useAdminAllSubscriptionsQuery } from '../../redux/slices/subscriptionApiSlice';
import { DataGrid } from '@mui/x-data-grid';

const AllSubscriptions = () => {
  const { data, isLoading, refetch } = useAdminAllSubscriptionsQuery();
  const subscriptions = data?.subscriptions;
  console.log(data);

  const columns = [
    { field: 'id', headerName: 'Subscription Id', minWidth: 150, flex: 1 },
    {
      field: 'avatarUrl', // Field name for avatar URL
      headerName: 'Avatar',
      minWidth: 120,
      flex: 0.5,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Avatar"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      ),
    },

    {
      field: 'name',
      headerName: 'Page Name',
      minWidth: 180,
      flex: 0.5,
    },
    {
      field: 'user',
      headerName: 'Subscriber',
      minWidth: 180,
      flex: 1,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      minWidth: 100,
      flex: 0.6,
    },

    {
      field: 'expiry',
      headerName: 'Expiry Date',
      type: 'number',
      minWidth: 130,
      flex: 0.4,
    },
    {
      field: 'status',
      headerName: 'Payment',
      type: 'text',
      minWidth: 80,
      flex: 0.7,
      renderCell: (params) => (
        <span
          style={{
            color: params.row.status === 'succeeded' ? '#274C2F' : '#fff',
            fontWeight: 'medium',
            textTransform: 'capitalize',
            backgroundColor: params.row.status === 'succeeded' ? '#A5F5B8' : '#333',
            padding: '10px'
          }}
        >
          {params.value}
        </span>
      ),
    },
  ];
  const row = [];

  subscriptions &&
    subscriptions.forEach((item) => {
      row.push({
        id: item._id,
        avatarUrl: item.creator.avatar.url,
        name: item.creator?.name,
        user: item.subscriber?.name,
        amount: 'US $' + item.totalPrice,
        expiry: item.expiryDate.slice(0, 10),
        status: item.paymentInfo.status,
      });
    });
  return (
    <div className="w-[100%] 800px:p-8 ">
      <h1 className="text-2xl mb-4 font-normal text-center md:text-left">
        Latest Subscriptions
      </h1>
      <div className="w-full flex items-center pt-5 justify-center">
        <div className="w-[95%] bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default AllSubscriptions;
