import React, { useEffect } from 'react';
import {
  useGetUserFollowingsQuery,
  useFollowUnfollowPageMutation,
} from '../../redux/slices/usersApiSlice';
import Loader from '../Loader';
import { Dialog, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
const UserFollowings = () => {
  const {
    data: usersFollowing,
    isLoading,
    refetch,
  } = useGetUserFollowingsQuery();
  const followings = usersFollowing?.followings;
  console.log(followings);

  const [followUnfollow, { isLoading: followLoading }] =
    useFollowUnfollowPageMutation();
  // Follow Unfollow Page Handler
  const followUnfollowPage = async (e, pageId) => {
    // console.log(pageId);
    try {
      await followUnfollow({ pageId }).unwrap();
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [followings]);
  return (
    <div>
      <h1 className="font-Roboto text-xl">User Followings</h1>
      {isLoading && <Loader />}
      {followings && followings.length > 0 ? (
        <p className="text-gray-600 mt-2 text-sm">
          You have followed the below creators you can view their public posts
        </p>
      ) : (
        <p className="text-gray-600 mt-2 text-base">
          You dont follow any creators, follow creators to view their public
          posts
        </p>
      )}
      <div className="mr-4 800px:ml-0 mt-4">
        {followings &&
          followings.map((following) => (
            <div
              className="w-[100%] bg-white shadow-sm rounded-lg overflow-hidden mb-4"
              key={following._id}
            >
              <div className="p-4">
                <div className="flex items-start">
                  <Avatar
                    sx={{ width: 45, height: 45, backgroundColor: '#FFA500' }}
                    alt="Jack Sparrow"
                    src={following?.avatar?.url}
                    className="hover:animate-pulse transition duration-50 mr-2"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {following.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {following.description}
                    </p>
                    {/* <div className="mt-2 font-medium text-gray-600 flex items-center gap-4">
                      <p>Subscription Price: ${subscription.totalPrice}</p>
                      <p>Expiry Date: {formatDate(subscription.expiryDate)}</p>
                    </div> */}
                  </div>
                </div>
                <div className="flex items-center gap-6 mx-3 mt-6">
                  <Link
                    to={`/page/${following._id}`}
                    className=" border-2 p-2 rounded-md font-semibold bg-blue-500 text-white"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={(e) => followUnfollowPage(e, following._id)}
                    disabled={followLoading}
                    className="text-blue-500 font-semibold rounded-md border-blue-500 border-2 p-2"
                  >
                    Unfollow
                  </button>
                </div>
              </div>
              <hr className="border-t" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserFollowings;
