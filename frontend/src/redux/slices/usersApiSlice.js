import { user_url } from '../../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${user_url}/login-user`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${user_url}/register-user`,
        method: 'POST',
        body: data,
      }),
    }),
    verify: builder.mutation({
      query: (data) => ({
        url: `${user_url}/activate-user`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${user_url}/logout`,
        method: 'POST',
      }),
    }),
    // TODO: updateProfile 
  }),
});

// exporting our query
export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
} = usersApiSlice;
