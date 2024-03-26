import { post_url } from '../../constants';
import { apiSlice } from './apiSlice';

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: `${post_url}/create-post`,
        method: 'POST',
        body: data,
      }),
    }),

    getMyPosts: builder.query({
      query: () => ({
        url: `${post_url}/my-posts`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    likeUnlikePost: builder.mutation({
      query: (postId) => ({
        url: `${post_url}/${postId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Post'],
    }),

    updatePost: builder.mutation({
      query: (postId, data) => ({
        url: `${post_url}/${postId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),

    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${post_url}/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),

    createComment: builder.mutation({
      query: ({ postId, comment }) => ({
        url: `${post_url}/comment/${postId}`,
        method: 'PUT',
        body: { comment },
      }),
      invalidatesTags: ['Post'],
    }),

    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `${post_url}/comment/${postId}`,
        method: 'DELETE',
        body: { commentId },
      }),
      providesTags: ['Post'],
    }),

    postsOfFollowings: builder.query({
      query: () => ({
        url: `${post_url}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    pagePosts: builder.query({
      query: (pageId) => ({
        url: `${post_url}/page/${pageId}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// exporting our query
export const {
  useCreatePostMutation,
  useCreateCommentMutation,
  useLikeUnlikePostMutation,
  useDeleteCommentMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  usePostsOfFollowingsQuery,
  useGetMyPostsQuery,
  usePagePostsQuery,
} = postApiSlice;
