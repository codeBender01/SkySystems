import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientCols = createApi({
  reducerPath: "clientCollections",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllClientProducts: builder.query({
      query: () => {
        let queryString = "/products/client";

        return queryString;
      },
    }),
    getOneClientProduct: builder.query({
      query: (id) => {
        return `/products/client/${id}`;
      },
    }),
  }),
});

export const { useGetAllClientProductsQuery, useGetOneClientProductQuery } =
  clientCols;
