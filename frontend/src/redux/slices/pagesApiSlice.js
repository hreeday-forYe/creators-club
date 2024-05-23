import { backend_url, page_url } from '../../constants';
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

    pageProfile: builder.query({
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

    updateWithdrawMethod: builder.mutation({
      query: (withdrawMethod) => ({
        url: `${page_url}/update-payment-methods`,
        method: 'PUT',
        body: { withdrawMethod: withdrawMethod },
      }),
    }),

    deleteWithdrawMethod: builder.mutation({
      query: () => ({
        url: `${page_url}/delete-withdraw-method`,
        method: 'DELETE',
      }),
    }),

    createWithdrawRequest: builder.mutation({
      query: (amount) => ({
        url: `${backend_url}/withdraw/create-withdraw-request`,
        method: 'POST',
        body: { amount: amount },
      }),
    }),

    getAllWithdrawRequest: builder.query({
      query: () => ({
        url: `${backend_url}/withdraw/get-all-withdraw-request`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    updateWithdrawRequest: builder.mutation({
      query: ({ withdrawId, pageId }) => ({
        url: `${backend_url}/withdraw/update-withdraw-request/${withdrawId}`,
        method: 'PUT',
        body: { pageId: pageId },
      }),
    }),

    adminDeleteWithdraw: builder.mutation({
      query: (data) => ({
        url: `${backend_url}/withdraw/delete-withdraw-request`,
        method: 'DELETE',
        body: data,
      }),
    }),
    getCreatorsNotifications: builder.query({
      query: () => ({
        url: `${backend_url}/notification/get-creator-notifications`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    updateCreatorsNotifications: builder.mutation({
      query: ({ id }) => ({
        url: `${backend_url}/notification/update-creator-notifications/${id}`,
        method: 'PUT',
      }),
    }),

    getAllCreators: builder.query({
      query: () => ({
        url: `${page_url}/get-all-pages`,
        method: 'GET',
      }),
    }),

    adminFeatureCreator: builder.mutation({
      query: (pageId) => ({
        url: `${page_url}/feature-creator`,
        method: 'PUT',
        body: { pageId: pageId },
      }),
    }),

    getFeaturedCreators: builder.query({
      query: () => ({
        url: `${page_url}/get-featured-creators`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    adminBanCreator: builder.mutation({
      query: (pageid) => ({
        url: `${page_url}/ban-page/${pageid}`,
        method: 'PUT',
      }),
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
  usePageProfileQuery,
  useUpdatePageProfileMutation,
  useUpdatePageAvatarMutation,
  useUpdateCoverImageMutation,
  useUpdateWithdrawMethodMutation,
  useDeleteWithdrawMethodMutation,
  useCreateWithdrawRequestMutation,
  useGetAllWithdrawRequestQuery,
  useUpdateWithdrawRequestMutation,
  useAdminDeleteWithdrawMutation,
  useGetCreatorsNotificationsQuery,
  useUpdateCreatorsNotificationsMutation,
  useAdminFeatureCreatorMutation,
  useGetAllCreatorsQuery,
  useGetFeaturedCreatorsQuery,
  useAdminBanCreatorMutation
} = pagesApiSlice;
