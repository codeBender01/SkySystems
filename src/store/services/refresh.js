import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAccessToken, logout } from "../auth";
import baseURL from "./baseurl.js";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Helper function to delay retry (optional)
const pause = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const token = cookies.get("adminAccessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If the request returns 401 Unauthorized, try to refresh the token
  if (result.error || result.error.status === 401) {
    console.log("Access token expired. Attempting to refresh the token...");

    const refreshToken = cookies.get("adminRefreshToken");

    // Attempt to refresh the token
    const refreshResult = await baseQuery(
      {
        url: "/admin/auth/refresh",
        method: "GET",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newAccessToken = refreshResult.data.accessToken;
      api.dispatch(setAccessToken(newAccessToken));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      console.log("logout");
    }
  }

  return result;
};
