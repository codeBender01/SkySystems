import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL from "./baseurl";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const TOKEN = cookies.get("adminAccessToken");

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers: { Authorization: `Bearer ${TOKEN}` },
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (creds) => ({
        url: "/admin/auth/login",
        method: "POST",
        body: creds,
      }),
    }),
  }),
});

export const { useAdminLoginMutation, useRefreshTokenQuery } = authApi;
