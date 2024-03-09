import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetMyPostsQuery } from '../../redux/slices/postApiSlice';
import Loader from '../Loader';
import Post from '../utils/Post';
const GetAllPosts = () => {
  const { data, isLoading, error } = useGetMyPostsQuery();
  console.log(data);
  const posts = data?.posts;
  const { authInfo } = useSelector((state) => state.auth);
  const { creator } = authInfo;
  return (
    <>
      <div className="w-full p-8">
        <h1>My Posts</h1>
        <div className="w-[80%] px-16 flex flex-col">
          {isLoading ? <Loader /> : <Post posts={posts} creator={creator} />}
        </div>
      </div>
    </>
  );
};

export default GetAllPosts;
