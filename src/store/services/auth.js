import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL from "./base.js";

const TOKEN = localStorage.getItem("userAccessToken");

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${TOKEN}`);
      return headers;
    },
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
        method: "PATCH",
        body: {
          verificationPhoneNumberCode: creds.verificationPhoneNumberCode,
        },
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
