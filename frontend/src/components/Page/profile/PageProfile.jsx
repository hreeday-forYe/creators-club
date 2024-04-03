import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPageInfoQuery } from '../../../redux/slices/pagesApiSlice';
import { useFollowUnfollowPageMutation } from '../../../redux/slices/usersApiSlice';
import { Link } from 'react-router-dom';
import PageProfileData from './PageProfileData';
import { toast } from 'react-hot-toast';
import GetAllPosts from '../GetAllPosts';

const PageProfile = ({ user, isCreator }) => {
  // Getting the user details based on the id;
  const { id: pageId } = useParams();

  // Get the page Information using the Id
  const { data, refetch } = useGetPageInfoQuery(pageId);
  console.log(data);
  const creator = data?.creator;
  console.log(creator);
  console.log(user);
  // Using the follow unfollow query
  const [following, setFollowing] = useState(
    creator?.followers?.includes(user?._id)
  );
  // const [isCreator, setIsCreator] = useState(creator?._id === user?._id);
  // console.log(isCreator);
  const [followUnfollow, { isLoading: followLoading }] =
    useFollowUnfollowPageMutation();

  useEffect(() => {
    refetch();
    if (creator?.followers?.includes(user?._id)) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [creator, user]);

  // Follow Unfollow Page Handler
  const followUnfollowPage = async (e) => {
    try {
      await followUnfollow({ pageId }).unwrap();
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
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
        ) : (
          <div className="flex justify-center gap-4 mt-6 mb-5">
            <Link
              to={`/page/subscribe/${pageId}`}
              className="bg-blue-500 px-10 py-2 font-bold hover:shadow-lg rounded-2xl text-white shadow-md"
            >
              Subscribe for ${creator?.subscriptionCharge}
            </Link>
            <button
              className="bg-white text-blue-500 hover:shadow-lg shadow-md font-Roboto border-2 border-blue-500 px-10 py-2 rounded-2xl font-semibold"
              onClick={followUnfollowPage}
              disabled={followLoading}
            >
              {following ? 'Unfollow' : 'Follow'}
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
        {/* <div className="grid grid-cols-3 gap-2 my-3">
          <a
            className="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
            href
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg")',
            }}
          />
          <a
            className="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
            href
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/247287/pexels-photo-247287.jpeg")',
            }}
          />
          <a
            className="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
            href
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/6169/woman-hand-girl-professional.jpg")',
            }}
          />
          <a
            className="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
            href
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/3851790/pexels-photo-3851790.jpeg")',
            }}
          />
          <a
            className="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
            href
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/3852159/pexels-photo-3852159.jpeg")',
            }}
          />
          <a
            className="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
            href
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/4491173/pexels-photo-4491173.jpeg")',
            }}
          />
          <a
            className="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
            href
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg")',
            }}
          />
          <a
            className="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
            href
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/6019812/pexels-photo-6019812.jpeg")',
            }}
          />
          <a
            className="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
            href
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/40751/running-runner-long-distance-fitness-40751.jpeg")',
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default PageProfile;
