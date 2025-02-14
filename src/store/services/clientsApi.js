import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./refresh";

export const clientsApi = createApi({
  reducerPath: "clientsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => "/client/users",
      providesTags: ["Client"],
    }),
  }),
});

export const { useGetAllClientsQuery } = clientsApi;
