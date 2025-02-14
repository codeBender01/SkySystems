import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./refresh";

export const collectionsApi = createApi({
  reducerPath: "collectionsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Collection"],
  endpoints: (builder) => ({
    getAllCollectionsClient: builder.query({
      query: () => "/collection/client",
      providesTags: ["Collection"],
    }),
    getAllCollectionsAdmin: builder.query({
      query: () => "/collection/admin",
      providesTags: ["Collection"],
    }),
    createCollection: builder.mutation({
      query: (col) => ({
        url: "/collection",
        method: "POST",
        body: col,
      }),
      invalidatesTags: ["Collection"],
    }),
    deleteCollection: builder.mutation({
      query: (id) => ({
        url: `/collection/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collection"],
    }),
    addCollectionOption: builder.mutation({
      query: (col) => ({
        url: `/collection-options/${col.id}`,
        method: "POST",
        body: col.obj,
      }),
      invalidatesTags: ["Collection"],
    }),
    editCollectionOption: builder.mutation({
      query: (col) => ({
        url: `/collection-options/${col.id}`,
        method: "PATCH",
        body: col.obj,
      }),
      invalidatesTags: ["Collection"],
    }),
    deleteCollectionOption: builder.mutation({
      query: (id) => ({
        url: `/collection-options/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collection"],
    }),
    uploadCollectionImage: builder.mutation({
      query: (img) => ({
        url: `/collection/${img.id}/image`,
        method: "POST",
        body: img.image,
      }),
      invalidatesTags: ["Collection"],
    }),
    deleteCollectionImage: builder.mutation({
      query: (id) => ({
        url: `/collection/image/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collection"],
    }),
  }),
});

export const {
  useGetAllCollectionsAdminQuery,
  useGetAllCollectionsClientQuery,
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useAddCollectionOptionMutation,
  useEditCollectionOptionMutation,
  useDeleteCollectionOptionMutation,
  useUploadCollectionImageMutation,
  useDeleteCollectionImageMutation,
} = collectionsApi;
