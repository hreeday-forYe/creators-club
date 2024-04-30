import React, { useState, useEffect } from 'react';
import {
  useAdminAllPostsQuery,
  useAdminDeletePostMutation,
} from '../../../redux/slices/postApiSlice';
import Loader from '../../Loader';
import Post from '../../utils/Post';
import { useSelector } from 'react-redux';
import socketIO from 'socket.io-client';
import { server } from '../../../constants';
import { toast } from 'react-hot-toast';
const socketId = socketIO(server, { transports: ['websocket'] });
const ApprovedPosts = () => {
  const [approvedPosts, setApprovedPosts] = useState([]);
  const { data, isLoading, refetch } = useAdminAllPostsQuery();
  const [deletePost, { isLoading: deleteLoading }] =
    useAdminDeletePostMutation();
  const { authInfo } = useSelector((state) => state.auth);
  const user = authInfo.user;
  const posts = data?.posts;

  // console.log(posts);

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

  useEffect(() => {
    if (posts) {
      // Filter posts to get only those with isVerified === true
      const filteredApprovedPosts = posts.filter(
        (post) => post.isVerified === true
      );
      setApprovedPosts(filteredApprovedPosts);
    }
  }, [posts]);

  return (
    <div className="w-[100%] border-red-500">
      <h3 className="text-lg font-Poppins mt-4">Approved Posts</h3>
      {isLoading && <Loader />}
      <div className="mt-8 w-[100%]" >
        {approvedPosts && approvedPosts.length > 0 ? (
          approvedPosts.map((post) => (
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
          ))
        ) : (
          <> There are 0 unapproved posts </>
        )}
      </div>
    </div>
  );
};

export default ApprovedPosts;
