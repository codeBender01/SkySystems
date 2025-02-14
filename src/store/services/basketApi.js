import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const basketApi = createApi({
    reducerPath: "basketApi",
    baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("Authorization", `Bearer ${TOKEN}`);
        return headers;
      },
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
    basketApi;