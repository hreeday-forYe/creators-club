import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetMyPostsQuery } from '../../redux/slices/postApiSlice';
import Loader from '../Loader';
import Post from '../utils/Post';
import { useDeletePostMutation } from '../../redux/slices/postApiSlice';
import { toast } from 'react-hot-toast';
import { Box } from '@mui/material';
const GetAllPosts = () => {
  const { data, isLoading, error, refetch } = useGetMyPostsQuery();
  console.log(data);
  const posts = data?.posts;
  const { authInfo } = useSelector((state) => state.auth);
  const creator = authInfo?.creator;

  const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation();

  const deletePostHandler = async (postId) => {
    if (window.confirm('Are you sure want to delete this post? ')) {
      try {
        await deletePost(postId);
        toast.success('Post deleted successfully');
        refetch();
      } catch (error) {
        toast.error(error.message || error.error);
      }
    }
  };

  const updatePost = async (postId) => {
    navigate;
    try {
    } catch (error) {}
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className="w-[80vw] 800px:p-8">
        <h1 className="mb-4 text-2xl font-semibold text-center 800px:text-start">
          My Posts
        </h1>
        <div className="flex justify-center w-[100%]">
          <div className="w-[100%] 800px:w-[800px]  flex flex-col justify-center">
            {isLoading || deleteLoading ? (
              <Loader />
            ) : !posts ? (
              <h4>You have no posts yet</h4>
            ) : (
              posts &&
              posts.map((post, index) => {
                return (
                  <Post
                    post={post}
                    isCreator={true}
                    deletePost={deletePostHandler}
                    refetch={refetch}
                    user={creator}
                    key={index}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GetAllPosts;
