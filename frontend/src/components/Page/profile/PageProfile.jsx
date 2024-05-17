import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPageInfoQuery } from '../../../redux/slices/pagesApiSlice';
import { useFollowUnfollowPageMutation } from '../../../redux/slices/usersApiSlice';
import { Link } from 'react-router-dom';
import PageProfileData from './PageProfileData';
import { toast } from 'react-hot-toast';
import GetAllPosts from '../GetAllPosts';
import {
  useGetStripePublishableKeyQuery,
  useCreatePaymentIntentMutation,
} from '../../../redux/slices/subscriptionApiSlice';
import { Dialog } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../../utils/CheckOutForm';
import { TbMessage } from 'react-icons/tb';
import { useAdminFeatureCreatorMutation } from '../../../redux/slices/pagesApiSlice';
import socketIO from 'socket.io-client';
import { server } from '../../../constants';
const socketId = socketIO(server, { transports: ['websocket'] });

const PageProfile = ({ user, isCreator }) => {
  // Getting the user details based on the id;
  const { id: pageId } = useParams();

  // Get the page Information using the Id
  const { data, refetch } = useGetPageInfoQuery(pageId);
  // console.log(data);
  const creator = data?.creator;
  // console.log(creator);
  // console.log(user);
  // Using the follow unfollow query
  const [following, setFollowing] = useState(
    creator?.followers?.includes(user?._id)
  );
  const [subscription, setSubscription] = useState(
    creator?.subscribers?.includes(user?._id)
  );
  // const [isCreator, setIsCreator] = useState(creator?._id === user?._id);
  // console.log(isCreator);
  const [followUnfollow, { isLoading: followLoading }] =
    useFollowUnfollowPageMutation();
  // Follow Unfollow Page Handler
  const followUnfollowPage = async (e) => {
    try {
      await followUnfollow({ pageId }).unwrap();
      if (!creator.followers.includes(user._id)) {
        socketId.emit('notification', {
          title: 'New following',
          message: `You have a new following from ${user.name}`,
          from: user._id,
          to: creator._id,
        });
      }
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  useEffect(() => {
    refetch();
    if (creator?.subscribers?.includes(user?._id)) {
      setSubscription(true);
    } else {
      setSubscription(false);
    }
    if (creator?.followers?.includes(user?._id)) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [creator, user]);

  // Subscription handler
  const [openPay, setOpenPay] = useState(false);
  const { data: config, isLoading } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState();
  const [adminFeatureCreator, { isLoading: featureLoading }] =
    useAdminFeatureCreatorMutation();
  // console.log(config);
  // console.log(paymentIntentData);
  useEffect(() => {
    if (config && data?.creator && data?.creator.subscriptionCharge) {
      const publishablekey = config?.publishablekey;
      // console.log(publishablekey);
      setStripePromise(loadStripe(publishablekey));
      if (data) {
        const amount = Math.round(creator?.subscriptionCharge);
        createPaymentIntent(amount);
      }
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  // Handle Payment and subscription
  // const handleSubscription = async (e) => {
  //   setOpenPay(true);
  // };

  const handleFeature = async () => {
    const response = await adminFeatureCreator(pageId).unwrap();
    refetch()
    // console.log(response)
    toast.success(response.message)
  };

  return (
    <div className="w-[100%]">
      <div className="px-3 py-2">
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="h-[320px] relative w-[70vw]">
            {creator?.coverImage ? (
              <div>
                <img
                  className="w-[100%] h-[250px] object-cover shadow-md rounded-md"
                  src={creator?.coverImage?.url}
                  alt="coverImage"
                />
              </div>
            ) : (
              // Skeleton
              <div className="w-full h-[250px] border bg-gray-300 relative rounded-md"></div>
            )}

            <div className="w-full flex absolute top-[150px] left-0 right-0 items-center justify-center">
              <div className="relative cursor-pointer">
                <>
                  <img
                    src={`${creator?.avatar?.url}`}
                    alt=""
                    className="w-[150px] h-[150px] rounded-full cursor-pointer object-cover"
                  />
                </>
              </div>
            </div>
          </div>
          {/* Image handle complete */}
          <p className="font-serif font-semibold text-2xl -mt-4">
            {creator?.name}
          </p>
          <span className="text-sm text-gray-600 font-normal mb-6">
            {creator?.address}
          </span>
          <span className="w-[80%] 800px:w-[30%] text-sm text-center 800px:text-justify font-normal -mt-4 text-gray-500">
            {creator?.description && creator.description}
          </span>
        </div>
        <div className="flex justify-center items-center gap-1 my-6">
          <div className="font-semibold text-center text-lg px-2 w-28 mx-1">
            <p className="text-black">{creator?.posts.length}</p>
            <span className="text-gray-400">Posts</span>
          </div>
          <div className="font-semibold text-center text-lg px-2 w-28 mx-1">
            <p className="text-black">{creator?.followers.length}</p>
            <span className="text-gray-400">Followers</span>
          </div>
          <div className="font-semibold text-center text-lg px-2 w-28 mx-1">
            <p className="text-black">{creator?.subscribers.length}</p>
            <span className="text-gray-400">Subscribers</span>
          </div>
        </div>
        {isCreator ? (
          <div className="flex justify-center gap-4 mt-6 mb-5">
            <Link
              className="bg-white text-blue-500 hover:shadow-lg shadow-md font-Roboto border-2 border-blue-500 px-10 py-2 rounded-2xl font-semibold"
              to={'/page-settings'}
            >
              Edit Profile
            </Link>
          </div>
        ) : user?.role === 'Admin' ? (
          // Render specific logic for admin
          <div className="flex justify-center gap-4 mt-6 mb-5">
            {creator?.isFeatured ? (
              <button onClick={handleFeature} className='border-red-500 p-2 border-2 font-semibold hover:scale-105 text-red-500 transition duration-100 shadow-md capitalize'>Remove from feature</button>
            ) : (
              <button
                className="border-blue-500 p-2 border-2 rounded-md font-semibold hover:scale-105 text-blue-500 transition duration-100 shadow-md"
                onClick={handleFeature}
              >
                Feature this Creator
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-center gap-4 mt-6 mb-5">
            {subscription ? (
              <button
                className={`bg-blue-600 text-white px-4 py-2 font-semibold hover:shadow-lg rounded-xl  shadow-md flex items-center space-x-6`}
              >
                Message <TbMessage size={30} className="ml-2" />
              </button>
            ) : (
              <button
                onClick={() => setOpenPay(!openPay)}
                className={`bg-blue-600 text-white px-10 py-2 font-semibold hover:shadow-lg rounded-2xl  shadow-md`}
                disabled={subscription}
              >
                {subscription
                  ? 'Subscribed'
                  : `Subscribe for $${creator?.subscriptionCharge}`}
              </button>
            )}
            <button
              className="bg-white text-blue-500 hover:shadow-lg shadow-md font-Roboto border-2 border-blue-500 px-10 py-2 rounded-2xl font-semibold"
              onClick={followUnfollowPage}
              disabled={followLoading}
            >
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
        )}
        {/* Profile Navigation */}
        <div className="flex justify-between items-center">
          <button className="w-full py-2 border-b-2 border-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Posts
          </button>
        </div>
        {/* Posts component */}

        {isCreator ? <GetAllPosts /> : <PageProfileData />}
      </div>
      <>
        <Dialog open={openPay} onClose={() => setOpenPay(!openPay)}>
          <div className=" min-w-[350px] 800px:min-w-[500px]  h-auto p-6">
            {stripePromise && clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckOutForm
                  setOpenPay={setOpenPay}
                  data={data}
                  userData={user}
                />
              </Elements>
            )}
          </div>
        </Dialog>
      </>
    </div>
  );
};

export default PageProfile;
