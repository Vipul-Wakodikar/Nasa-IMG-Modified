import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://images-assets.nasa.gov/',
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    getRecentImages: builder.query({
      query: () => ({ url: 'recent.json' }),
    }),
  }),
});

export const { useGetRecentImagesQuery } = apiSlice;

