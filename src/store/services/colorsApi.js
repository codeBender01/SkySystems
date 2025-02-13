import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./refresh";

export const colorsApi = createApi({
  reducerPath: "colorsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Color"],
  endpoints: (builder) => ({
    addProductColor: builder.mutation({
      query: (pr) => ({
        url: `/product-colors/${pr.id}`,
        method: "POST",
        body: pr.obj,
      }),
      invalidatesTags: ["Color"],
    }),
    getOneProduct: builder.query({
      query: (id) => {
        return `/products/admin/${id}`;
      },
      providesTags: ["Color"],
    }),
    deleteProductColor: builder.mutation({
      query: (id) => ({
        url: `/product-colors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Color"],
    }),
    addProductColorOption: builder.mutation({
      query: (pr) => ({
        url: `/product-colors/${pr.id}/options`,
        method: "POST",
        body: pr.obj,
      }),
      invalidatesTags: ["Color"],
    }),
    editProductColorOption: builder.mutation({
      query: (pr) => ({
        url: `/product-colors/${pr.id}/options`,
        method: "PATCH",
        body: pr.obj,
      }),
      invalidatesTags: ["Color"],
    }),
    deleteProductColorOption: builder.mutation({
      query: (id) => ({
        url: `/product-colors/${id}/options`,
        method: "DELETE",
      }),
      invalidatesTags: ["Color"],
    }),
  }),
});

export const {
  useAddProductColorMutation,
  useGetOneProductQuery,
  useDeleteProductColorMutation,
  useAddProductColorOptionMutation,
  useEditProductColorOptionMutation,
  useDeleteProductColorOptionMutation,
} = colorsApi;
