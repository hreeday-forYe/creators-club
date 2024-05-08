import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { usePagePostsQuery } from '../../../redux/slices/postApiSlice';
import Post from '../../utils/Post';
import Loader from '../../Loader';
const PageProfileData = () => {
  const { id: pageId } = useParams();
  // console.log(pageId);
  const { data, isLoading, refetch } = usePagePostsQuery(pageId);
  let posts = data?.posts;
  // console.log(posts);
  const { authInfo } = useSelector((state) => state.auth);
  // console.log(authInfo);
  const user = authInfo?.user;
  return (
    <div className="w-[80vw] 800px:p-8 flex flex-col items-center">
      {isLoading && <Loader />}

      {posts?.length > 0 ? (
        <div className=" w-full 800px:w-[55vw]">
          {posts.map((post, index) => {
            return (
              <Post post={post} refetch={refetch} user={user} key={index} />
            );
          })}
        </div>
      ) : user?.role === 'Admin' ? (
        <p className="font-medium text-gray-500 text-lg">
          Creator has no posts
        </p>
      ) : (
        <p className="font-medium text-gray-500 text-lg">
          Creator has no Public posts
        </p>
      )}
    </div>
  );
};

export default PageProfileData;
