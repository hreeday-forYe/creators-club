import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { backend_url } from '../../constants';

const baseQuery = fetchBaseQuery({
  baseUrl: backend_url,
  credentials: 'include',
});

// creating our api slice
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Page', 'Post', 'User', 'Subscription'],
  endpoints: (builder) => ({}),
});
