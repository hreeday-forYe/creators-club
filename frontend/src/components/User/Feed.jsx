import React, { useEffect } from 'react';
import Post from '../utils/Post';
import { usePostsOfFollowingsQuery } from '../../redux/slices/postApiSlice';
import Loader from '../Loader';
import { useSelector } from 'react-redux';

const Feed = () => {
  const { data, isLoading, refetch } = usePostsOfFollowingsQuery();
  // console.log(data);
  const posts = data?.posts;
  // console.log(posts);
  const { authInfo } = useSelector((state) => state.auth);
  // console.log(authInfo);
  const user = authInfo.user;
  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {isLoading && <Loader />}
      {posts && posts.length > 0 ? (
        <div className="w-[80vw] 800px:w-full p-1 800px:p-4">
          {posts.map((post, index) => (
            <Post post={post} user={user} refetch={refetch} key={index} />
          ))}
        </div>
      ) : (
        <div className="text-2xl text-gray-600 mt-6">
          Follow some Pages to see their posts
        </div>
      )}
    </div>
  );
};

export default Feed;
