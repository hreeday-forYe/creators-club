import { analytics_url } from '../../constants';
import { apiSlice } from './apiSlice';

export const analyticsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostAnalytics: builder.query({
      query: () => ({
        url: `${analytics_url}/get-posts-analytics`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    getUsersAnalytics: builder.query({
      query: () => ({
        url: `${analytics_url}/get-users-analytics`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    getCreatorsAnalytics: builder.query({
      query: () => ({
        url: `${analytics_url}/get-creators-analytics`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    getSubscriptionAnalytics: builder.query({
      query: () => ({
        url: `${analytics_url}/get-subscription-analytics`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetPostAnalyticsQuery,
  useGetUsersAnalyticsQuery,
  useGetCreatorsAnalyticsQuery,
  useGetSubscriptionAnalyticsQuery,
} = analyticsApiSlice;
