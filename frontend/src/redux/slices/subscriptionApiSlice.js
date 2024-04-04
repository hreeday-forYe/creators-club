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
      query: (amount, name, address) => ({
        url: `${subscribe_url}/payment`,
        method: 'POST',
        body: {
          amount,
        },
        invalidatesTags: ['Page'],
      }),
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useGetStripePublishableKeyQuery,
  useCreatePaymentIntentMutation,
} = subscriptionApiSlice;
