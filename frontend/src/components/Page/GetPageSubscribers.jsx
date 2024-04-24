import React from 'react';
import { useGetCreatorSubcriptionsQuery } from '../../redux/slices/subscriptionApiSlice';
import { DataGrid } from '@mui/x-data-grid';

const GetPageSubscribers = () => {
  const {
    data,
    isLoading,
    refetch,
  } = useGetCreatorSubcriptionsQuery();
  const subscriptions = data?.subscriptions
  const columns = [
    { field: 'id', headerName: 'Subscription ID', minWidth: 150, flex: 0.6 },

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
    <div className="w-full p-8">
      <h1 className="text-[22px] mb-4 font-normal font-Poppins">
        Page Subscriptions
      </h1>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={row ? row : 'No Subscriptions'}
          className='text-center'
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

export default GetPageSubscribers;
