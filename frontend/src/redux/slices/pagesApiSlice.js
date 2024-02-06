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
    // TODO: updatePageInfo
  }),
});

// exporting our query
export const {
  useLoginPageMutation,
  useVerifyPageMutation,
  useCreatePageMutation,
  useLogoutPageMutation,
} = pagesApiSlice;
