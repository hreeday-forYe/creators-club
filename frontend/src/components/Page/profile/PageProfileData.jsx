import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { usePagePostsQuery } from '../../../redux/slices/postApiSlice';
import { useAdminDeletePostMutation } from '../../../redux/slices/postApiSlice';
import { toast } from 'react-hot-toast';
// import {}
import Post from '../../utils/Post';
import Loader from '../../Loader';
import socketIO from 'socket.io-client';
import { server } from '../../../constants';
const socketId = socketIO(server, { transports: ['websocket'] });

const PageProfileData = () => {
  const { id: pageId } = useParams();
  // console.log(pageId);
  const { data, isLoading, refetch } = usePagePostsQuery(pageId);
  let posts = data?.posts;
  // console.log(posts);
  const { authInfo } = useSelector((state) => state.auth);
  const [deletePost, { isLoading: deleteLoading }] =
    useAdminDeletePostMutation();

  // console.log(authInfo);
  const user = authInfo?.user;
  const isCreator = user.role === 'Admin';

  const adminDeletePost = async (postId) => {
    try {
      if (window.confirm('Are you sure you want to delete this post? ')) {
        await deletePost(postId).unwrap();
        socketId.emit('notification', {
          title: 'Post Deleted',
          message: `Your Post has been deleted due to voilation of community guidelines`,
          userId: user._id,
        });
        refetch();
        toast.success('POST deleted');
      }
    } catch (error) {
      toast.error(error.error);
    }
  };
  return (
    <div className="w-[80vw] 800px:p-8 flex flex-col items-center">
      {isLoading && <Loader />}

      {posts?.length > 0 ? (
        <div className=" w-full 800px:w-[55vw]">
          {posts.map((post, index) => {
            return (
              <Post
                post={post}
                refetch={refetch}
                user={user}
                key={index}
                isCreator={isCreator}
                deletePost={adminDeletePost}
              />
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
