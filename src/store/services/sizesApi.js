import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./refresh";

export const sizesApi = createApi({
  reducerPath: "sizesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Size"],
  endpoints: (builder) => ({
    addProductSize: builder.mutation({
      query: (pr) => ({
        url: `/product-colors/${pr.id}/size`,
        method: "POST",
        body: pr.obj,
      }),
      invalidatesTags: ["Size"],
    }),
    getOneProductSize: builder.query({
      query: (id) => {
        return `/products/admin/${id}`;
      },
      providesTags: ["Size"],
    }),
    deleteProductSize: builder.mutation({
      query: (id) => ({
        url: `/product-colors/size/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Size"],
    }),
    editProductSize: builder.mutation({
      query: (pr) => ({
        url: `/product-colors/size/${pr.id}`,
        method: "PATCH",
        body: pr.obj,
      }),
      invalidatesTags: ["Size"],
    }),
    uploadProductSizeImage: builder.mutation({
      query: (img) => ({
        url: `/product-colors/size/${img.id}/image`,
        method: "POST",
        body: img.image,
      }),
      invalidatesTags: ["Size"],
    }),
    deleteProductSizeImage: builder.mutation({
      query: (id) => ({
        url: `/product-colors/size/image/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Size"],
    }),
  }),
});

export const {
  useAddProductSizeMutation,
  useGetOneProductSizeQuery,
  useDeleteProductSizeMutation,
  useEditProductSizeMutation,
  useUploadProductSizeImageMutation,
  useDeleteProductSizeImageMutation,
} = sizesApi;
