import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./refresh";

export const adminsApi = createApi({
  reducerPath: "adminsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: () => "/admin/users",
      providesTags: ["Admin"],
    }),
    createAdmin: builder.mutation({
      query: (obj) => ({
        url: "/admin/users",
        method: "POST",
        body: obj,
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
    editAdmin: builder.mutation({
      query: (obj) => ({
        url: `/admin/users/${obj.id}`,
        method: "PATCH",
        body: obj.admin,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useEditAdminMutation,
} = adminsApi;
