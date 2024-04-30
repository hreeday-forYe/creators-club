import React, { useState, useEffect } from 'react';
import { useAdminAllPostsQuery } from '../../../redux/slices/postApiSlice';
import Post from '../../utils/Post';
import { useSelector } from 'react-redux';
import Loader from '../../Loader';
import socketIO from 'socket.io-client';
import { server } from '../../../constants';
import { toast } from 'react-hot-toast';
const socketId = socketIO(server, { transports: ['websocket'] });

const UnApprovedPosts = () => {
  const [unApprovedPosts, setUnApprovedPosts] = useState([]);
  const { data, isLoading, refetch } = useAdminAllPostsQuery();
  const { authInfo } = useSelector((state) => state.auth);
  const user = authInfo.user;
  const posts = data?.posts;

  // console.log(user);

  useEffect(() => {
    if (posts) {
      // Filter posts to get only those with isVerified === true
      const filteredApprovedPosts = posts.filter(
        (post) => post.isVerified === false
      );
      setUnApprovedPosts(filteredApprovedPosts);
    }
  }, [posts]);

  // console.log(unApprovedPosts);
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

  // post, isCreator, deletePost, refetch, user
  return (
    <div className="w-[100%] border-red-500">
      <h3 className="text-lg font-Poppins mt-4">You can approve these posts</h3>
      {isLoading && <Loader />}
      {unApprovedPosts && unApprovedPosts.length > 0 ? (
        <div className="mt-8 w-[100%]">
          {unApprovedPosts.map((post) => (
            <>
              <Post
                post={post}
                isCreator={true}
                refetch={refetch}
                user={user}
                deletePost={adminDeletePost}
                key={post._id}
              />
            </>
          ))}
        </div>
      ) : (
        <> There are 0 unapproved posts </>
      )}
    </div>
  );
};

export default UnApprovedPosts;
