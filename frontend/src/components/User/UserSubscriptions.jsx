import React, { useState } from 'react';
import { useGetUserSubscriptionsQuery } from '../../redux/slices/subscriptionApiSlice';
import { Link } from 'react-router-dom';
import { Dialog } from '@mui/material';
import Loader from '../Loader';
const UserSubscriptions = () => {
  // Get the user Subscriptions Creators
  const { data: subscriptions, isLoading } = useGetUserSubscriptionsQuery();
  console.log(subscriptions);
  const userSubscriptions = subscriptions?.subscriptions;
  console.log(userSubscriptions);
  const formatDate = (date) => {
    const formattedExpiryDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedExpiryDate;
  };

  const [open, setOpen] = useState(false);

  const handleSubmit = (subscriptionId, pageId) => {
    const confirm = confirm(
      'Are you Sure You want to cancel the subscription? '
    );
  };
  return (
    <div>
      <h1 className="font-Roboto text-xl">User Subscriptions</h1>
      {userSubscriptions ? (
        <p className="text-gray-600 mt-2 text-sm">
          You're subscribed to these creators exclusively, you can also view
          their private posts along with public ones
        </p>
      ) : (
        <p>
          Subscribe to some users to view their private posts and support their
          content
        </p>
      )}
      <div className="border mr-4 800px:ml-0 mt-4">
        {isLoading && <Loader />}
        {userSubscriptions ? (
          userSubscriptions.map((subscription) => (
            <div
              className="w-[100%] bg-white shadow-md rounded-lg overflow-hidden"
              key={subscription._id}
            >
              <div className="p-4">
                <div className="flex items-start">
                  <img
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                    src={subscription.creator.avatar.url}
                    alt="Avatar"
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
                    onClick={() => setOpen(!open)}
                    className="text-red-500 font-semibold rounded-md border-red-500 border-2 p-2"
                  >
                    Cancel Subscription
                  </button>
                </div>
              </div>
              <hr className="border-t" />
            </div>
          ))
        ) : (
          <p className="text-gray-600 mt-2 text-base">
            You have no subscriptions. Subscribe to some Creators to view their
            private posts and support their content
          </p>
        )}
        {
          <Dialog open={open} onClose={() => setOpen(!open)}>
            <div className="min-w-[350px] 800px:min-w-[500px] p-6">
              <p className="text-center text-lg">
                Are you sure you want to cancel the Subscription?
              </p>
              <p className="p-2 text-gray-400">
                Only 10% of the subscription amount will be refunded to you. You
                will also lose access to creator's private posts
              </p>
              <div className="flex items-center justify-center gap-12 mt-4">
                <button className="bg-red-500 p-2 text-white rounded-md hover:shadow-2xl hover:bg-red-700 transition duration-300">
                  I'm Sure
                </button>
                <button
                  className="bg-blue-700 p-2 text-white rounded-md hover:bg-blue-900 transition duration-300 hover:shadow-lg"
                  onClick={() => setOpen(false)}
                >
                  Return Back
                </button>
              </div>
            </div>
          </Dialog>
        }
      </div>
    </div>
  );
};

export default UserSubscriptions;
