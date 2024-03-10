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

    profile: builder.query({
      query: () => ({
        url: `${user_url}/profile`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: `${user_url}/update-user-info`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    updateUserAvatar: builder.mutation({
      query: () => ({
        url: `${user_url}/update-avatar`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    getUserById: builder.query({
      quer: ({ userId }) => ({
        url: `${user_url}/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

// exporting our query
export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
  useProfileQuery,
  useUpdateUserInfoMutation,
  useUpdateUserAvatarMutation,
  useGetUserByIdQuery
} = usersApiSlice;
