import React from 'react';
import { useGetCreatorSubcriptionsQuery } from '../../redux/slices/subscriptionApiSlice';
import { DataGrid } from '@mui/x-data-grid';

const GetPageSubscribers = () => {
  const {data:creatorSubscription, isLoading, refetch} = useGetCreatorSubcriptionsQuery()
  console.log(creatorSubscription)


  
  

  return (
    <div className="w-full p-8">
      <h1 className="text-2xl mb-4 font-normal">Page Subscriptions</h1>
      <div className='border'></div>
    </div>
  );
};

export default GetPageSubscribers;
