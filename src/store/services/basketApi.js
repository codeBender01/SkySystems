import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("userAccessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Basket", "Product"],
  endpoints: (builder) => ({
    addToBasket: builder.mutation({
      query: (obj) => ({
        url: `/basket/add`,
        method: "POST",
        body: {
          quantity: obj.quantity,
          colorId: obj.colorId,
          sizeId: obj.sizeId,
          productId: obj.productId,
        },
      }),
      invalidatesTags: ["Product"],
    }),
    getMyBasket: builder.query({
      query: () => {
        return "/basket/my-basket";
      },
      providesTags: ["Basket"],
    }),
    deleteFromBasket: builder.mutation({
      query: (id) => ({
        url: `/basket/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Basket"],
    }),

    orderProduct: builder.mutation({
      query: (obj) => ({
        url: "/orders/client/create-order",
        method: "POST",
        body: obj,
      }),
    }),
    getOneClientProductBasket: builder.query({
      query: (id) => {
        return `/products/client/${id}`;
      },
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useAddToBasketMutation,
  useGetMyBasketQuery,
  useDeleteFromBasketMutation,
  useOrderProductMutation,
  useGetOneClientProductBasketQuery,
} = basketApi;
