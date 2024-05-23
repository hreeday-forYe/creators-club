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
      query: (data) => ({
        url: `${user_url}/update-avatar`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    updateUserPassword: builder.mutation({
      query: (data) => ({
        url: `${user_url}/update-password`,
        method: 'PUT',
        body: data,
      }),
    }),

    getSuggestedPages: builder.query({
      query: () => ({
        url: `${user_url}/suggested-pages`,
        method: 'GET',
      }),
    }),

    getUserById: builder.query({
      query: ({ userId }) => ({
        url: `${user_url}/${userId}`,
        method: 'GET',
      }),
    }),
    followUnfollowPage: builder.mutation({
      query: ({ pageId }) => ({
        url: `${user_url}/follow/${pageId}`,
        method: 'PUT',
      }),
    }),

    getUserFollowings: builder.query({
      query: () => ({
        url: `${user_url}/my-followings`,
        method: 'GET',
      }),
    }),

    getUserNotifications: builder.query({
      query: () => ({
        url: `${backend_url}/notification/get-user-notifications`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    updateUserNotifications: builder.mutation({
      query: ({ id }) => ({
        url: `${backend_url}/notification/update-user-notifications/${id}`,
        method: 'PUT',
      }),
    }),

    adminGetAllUsers: builder.query({
      query: () => ({
        url: `${user_url}/admin-all-users`,
        method: 'GET',
      }),
    }),
    adminAddUser: builder.mutation({
      query: (data) => ({
        url: `${user_url}/admin-add-user`,
        method: 'POST',
        body: data,
      }),
    }),
    adminDeleteUser: builder.mutation({
      query:(data) =>({
        url: `${user_url}/admin-delete-user`,
        method: 'DELETE',
        body: data
      })
    })
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
  useUpdateUserPasswordMutation,
  useGetUserByIdQuery,
  useGetSuggestedPagesQuery,
  useFollowUnfollowPageMutation,
  useGetUserFollowingsQuery,
  useGetUserNotificationsQuery,
  useUpdateUserNotificationsMutation,
  useAdminGetAllUsersQuery,
  useAdminAddUserMutation,
  useAdminDeleteUserMutation
} = usersApiSlice;
