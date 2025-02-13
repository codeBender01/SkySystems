import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./refresh";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => {
        let queryString = "/orders/admin/clients";

        return queryString;
      },
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
