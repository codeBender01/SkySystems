import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./refresh";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => {
        let queryString = "/products/admin";

        return queryString;
      },
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (obj) => ({
        url: "/products",
        method: "POST",
        body: obj,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    addProductOption: builder.mutation({
      query: (pr) => ({
        url: `/product-options/${pr.id}`,
        method: "POST",
        body: pr.obj,
      }),
      invalidatesTags: ["Product"],
    }),
    editProductOptions: builder.mutation({
      query: (pr) => ({
        url: `/product-options/${pr.id}`,
        method: "PATCH",
        body: pr.obj,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProductOption: builder.mutation({
      query: (id) => ({
        url: `/product-options/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useAddProductOptionMutation,
  useDeleteProductMutation,
  useEditProductOptionsMutation,
  useDeleteProductOptionMutation,
  useEditProductSizeMutation,
} = productsApi;
