import { page_url } from '../../constants';
import { apiSlice } from './apiSlice';

export const pagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginPage: builder.mutation({
      query: (data) => ({
        url: `${page_url}/login-page`,
        method: 'POST',
        body: data,
      }),
    }),

    createPage: builder.mutation({
      query: (data) => ({
        url: `${page_url}/create-page`,
        method: 'POST',
        body: data,
      }),
    }),

    verifyPage: builder.mutation({
      query: (data) => ({
        url: `${page_url}/activate-page`,
        method: 'POST',
        body: data,
      }),
    }),

    logoutPage: builder.mutation({
      query: () => ({
        url: `${page_url}/logout-page`,
        method: 'POST',
      }),
    }),

    profile: builder.query({
      query: () => ({
        url: `${page_url}/page-profile`,
        method: 'GET',
      }),
    }),

    updatePageProfile: builder.mutation({
      query: (data) => ({
        url: `${page_url}/update-page-info`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Page'],
    }),

    getPageInfo: builder.query({
      query: (pageId) => ({
        url: `${page_url}/${pageId}`,
        method: 'GET',
      }),
      providesTags: ['Page'],
      keepUnusedDataFor: 5,
    }),

    updatePageAvatar: builder.mutation({
      query: (data) => ({
        url: `${page_url}/update-page-avatar`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Page'],
    }),

    updateCoverImage: builder.mutation({
      query: (data) => ({
        url: `${page_url}/update-cover-image`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Page'],
    }),

    deletePage: builder.mutation({
      query: () => ({
        url: `${page_url}/delete-page`,
        method: 'DELETE',
      }),
    }),
  }),
});

// exporting our query
export const {
  useLoginPageMutation,
  useVerifyPageMutation,
  useCreatePageMutation,
  useLogoutPageMutation,
  useGetPageInfoQuery,
  useProfileQuery,
  useUpdatePageProfileMutation,
  useUpdatePageAvatarMutation,
  useUpdateCoverImageMutation,
} = pagesApiSlice;
