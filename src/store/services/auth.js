import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL from "./base.js";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (creds) => ({
        url: "/admin/auth/login",
        method: "POST",
        body: creds,
      }),
    }),
    userLogin: builder.mutation({
      query: (creds) => ({
        url: "/client/auth/login",
        method: "POST",
        body: creds,
      }),
    }),
    userRegister: builder.mutation({
      query: (creds) => ({
        url: "/client/auth/registration",
        method: "POST",
        body: creds,
      }),
    }),
    verifyUser: builder.mutation({
      query: (creds) => ({
        url: `/client/auth/${creds.id}/verify`,
        method: "POST",
        body: creds.code,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useUserLoginMutation,
  useUserRegisterMutation,
  useVerifyUserMutation,
} = authApi;
