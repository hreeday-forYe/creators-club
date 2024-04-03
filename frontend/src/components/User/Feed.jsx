import React, { useEffect } from 'react';
import Post from '../utils/Post';
import { usePostsOfFollowingsQuery } from '../../redux/slices/postApiSlice';
import Loader from '../Loader';
import { useSelector } from 'react-redux';

const Feed = () => {
  const { data, isLoading, refetch } = usePostsOfFollowingsQuery();
  const posts = data?.posts;
  console.log(posts);
  const { authInfo } = useSelector((state) => state.auth);
  console.log(authInfo);
  const user = authInfo.user;
  useEffect(() => {
    refetch();
  }, []);
  return isLoading ? (
    <Loader />
  ) : posts[0] ? (
    <div className="w-[80vw] 800px:w-full p-1 800px:p-4">
      {posts.map((post) => {
        return <Post post={post} user={user} refetch={refetch} />;
      })}
    </div>
  ) : (
    <div className="text-2xl text-gray-600">
      Follow some Pages to see their posts
    </div>
  );
};

export default Feed;
