import React from 'react';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

const Subsriptionsbox = ({ subscription }) => {
  const formatDate = (date) => {
    const formattedExpiryDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedExpiryDate;
  };
  return (
    <div
      className="w-[100%] bg-white shadow-sm rounded-lg border-b mb-4 overflow-hidden"
      key={subscription._id}
    >
      <div className="p-4">
        <div className="flex items-start">
          <Avatar
            sx={{ width: 45, height: 45, backgroundColor: '#FFA500' }}
            alt="Jack Sparrow"
            src={subscription?.creator?.avatar?.url}
            className="hover:animate-pulse transition duration-50 mr-2"
          />
          <div>
            <p className="font-semibold text-gray-800">
              {subscription.creator.name}
            </p>
            <p className="text-sm text-gray-600">
              {subscription.creator.description}
            </p>
            <div className="mt-2 font-medium text-gray-600 flex items-center gap-4">
              <p>Subscription Price: ${subscription.totalPrice}</p>
              <p>Expiry Date: {formatDate(subscription.expiryDate)}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 mx-3 mt-6">
          <Link
            to={`/page/${subscription.creator._id}`}
            className=" border-2 p-2 rounded-md font-semibold bg-blue-500 text-white"
          >
            Profile
          </Link>
          <button
            onClick={(e) => setOpen(true)}
            className="text-red-500 font-semibold rounded-md  border-red-500 border-2 p-2"
          >
            Cancel subscription
          </button>
        </div>
      </div>
      <hr className="border-t" />
    </div>
  );
};

export default Subsriptionsbox;
