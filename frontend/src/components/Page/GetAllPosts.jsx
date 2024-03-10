import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetMyPostsQuery } from '../../redux/slices/postApiSlice';
import Loader from '../Loader';
import Post from '../utils/Post';
import { useDeletePostMutation } from '../../redux/slices/postApiSlice';
import { toast } from 'react-hot-toast';
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

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className="w-full p-8">
        <h1 className="mb-4 text-2xl font-semibold">My Posts</h1>
        <div className="w-[80%] px-16 flex flex-col">
          {isLoading || deleteLoading ? (
            <Loader />
          ) : (
            // {toast.success("working fine")}
            posts &&
            posts.map((post) => {
              return (
                <Post
                  post={post}
                  isCreator={true}
                  deletePost={deletePostHandler}
                  refetch={refetch}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default GetAllPosts;
