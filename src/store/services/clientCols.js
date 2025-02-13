import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientCols = createApi({
  reducerPath: "clientCollections",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllClientCollections: builder.query({
      query: () => {
        let queryString = "/collection/client";

        return queryString;
      },
    }),
  }),
});

export const { useGetAllClientCollectionsQuery } = clientCols;
