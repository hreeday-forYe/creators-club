import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { usePagePostsQuery } from '../../../redux/slices/postApiSlice';
import Post from '../../utils/Post';
import Loader from '../../Loader';
const PageProfileData = () => {
  const { id: pageId } = useParams();
  console.log(pageId);
  const { data, isLoading, refetch } = usePagePostsQuery(pageId);
  let posts = data?.posts;
  console.log(posts);
  const { authInfo } = useSelector((state) => state.auth);
  console.log(authInfo);
  const user = authInfo?.user;
  return (
    <div className="w-[80vw] 800px:p-8 flex flex-col items-center">
      {/* <h1 className="mb-4 text-2xl font-semibold text-center 800px:text-start">
        Page Posts
      </h1> */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" w-full 800px:w-[55vw]">
          {posts.map((post) => {
            return <Post post={post} refetch={refetch} user={user} />;
          })}
        </div>
      )}
    </div>
  );
};

export default PageProfileData;
