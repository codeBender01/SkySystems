import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./refresh";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/category/client",
    }),
    getCategoriesAdmin: builder.query({
      query: () => "/category/admin",
      providesTags: ["Category"],
    }),
    getOneCategory: builder.query({
      query: (id) => `/category/${id}`,
    }),
    createCategory: builder.mutation({
      query: (cat) => ({
        url: "/category",
        method: "POST",
        body: cat,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    addCategoryOptions: builder.mutation({
      query: (cat) => ({
        url: `/category-options/${cat.id}`,
        method: "POST",
        body: cat.obj,
      }),
      invalidatesTags: ["Category"],
    }),
    editCategoryOptions: builder.mutation({
      query: (cat) => ({
        url: `/category-options/${cat.id}`,
        method: "PATCH",
        body: cat.obj,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategoryOption: builder.mutation({
      query: (id) => ({
        url: `/category-options/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    uploadCategoryImage: builder.mutation({
      query: (img) => ({
        url: `/category/${img.id}/image`,
        method: "POST",
        body: img.image,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategoryImage: builder.mutation({
      query: (id) => ({
        url: `/category/image/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesAdminQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useAddCategoryOptionsMutation,
  useEditCategoryOptionsMutation,
  useDeleteCategoryOptionMutation,
  useUploadCategoryImageMutation,
  useGetOneCategoryQuery,
  useDeleteCategoryImageMutation,
} = categoriesApi;
