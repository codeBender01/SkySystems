import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientCategories = createApi({
  reducerPath: "clientCategories",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllClientCategories: builder.query({
      query: () => {
        let queryString = "/category/client";

        return queryString;
      },
    }),
  }),
});

export const { useGetAllClientCategoriesQuery } = clientCategories;
