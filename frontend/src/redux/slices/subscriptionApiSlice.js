import { post_url } from '../../constants';
import { apiSlice } from './apiSlice';
import { subscribe_url } from '../../constants';
export const subscriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSubscription: builder.mutation({
      query: ({ pageId, payment_info }) => ({
        url: `${subscribe_url}/create-subscription`,
        method: 'POST',
        body: { pageId, payment_info },
      }),
    }),
    getStripePublishableKey: builder.query({
      query: () => ({
        url: `${subscribe_url}/payment/stripepublishablekey`,
        method: 'GET',
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: `${subscribe_url}/payment`,
        method: 'POST',
        body: {
          amount,
        },
        invalidatesTags: ['Page'],
      }),
    }),

    getUserSubscriptions: builder.query({
      query: () => ({
        url: `${subscribe_url}/user-subscriptions`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    getCreatorSubcriptions: builder.query({
      query: () => ({
        url: `${subscribe_url}/creator-subscriptions`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useGetStripePublishableKeyQuery,
  useCreatePaymentIntentMutation,
  useGetUserSubscriptionsQuery,
  useGetCreatorSubcriptionsQuery
} = subscriptionApiSlice;
