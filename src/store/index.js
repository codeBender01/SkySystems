import { configureStore } from "@reduxjs/toolkit";

import userAuth from "./userAuth";
import adminOrders from "./adminOrders";
import clients from "./clients";
import admins from "./admins";
import basket from "./basket";

import authSlice from "./auth/index.jsx";

import { categoriesApi } from "./services/categoriesApi";
import { collectionsApi } from "./services/collectionsApi.js";
import { productsApi } from "./services/productsApi.js";
import { authApi } from "./services/auth";
import { colorsApi } from "./services/colorsApi.js";
import { sizesApi } from "./services/sizesApi.js";
import { ordersApi } from "./services/ordersApi.js";
import { clientCategories } from "./services/clientCats.js";
import { clientCols } from "./services/clientCols.js";
import { clientProducts } from "./services/clientProducts.js";

export const store = configureStore({
  reducer: {
    userAuth,
    adminOrders,
    clients,
    admins,
    basket,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [collectionsApi.reducerPath]: collectionsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [colorsApi.reducerPath]: colorsApi.reducer,
    [sizesApi.reducerPath]: sizesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [clientCategories.reducerPath]: clientCategories.reducer,
    [clientCols.reducerPath]: clientCols.reducer,
    [clientProducts.reducerPath]: clientProducts.reducer,
    authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      authApi.middleware,
      collectionsApi.middleware,
      productsApi.middleware,
      colorsApi.middleware,
      sizesApi.middleware,
      ordersApi.middleware,
      clientCategories.middleware,
      clientCols.middleware
    ),
});
