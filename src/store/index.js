import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice";
import categoryProductsReducer from "./category/categoryProductsSlice";

import userAuth from "./userAuth";
import adminOrders from "./adminOrders";
import clients from "./clients";
import admins from "./admins";
import clientProducts from "./clientProducts";
import basket from "./basket";

import authSlice from "./auth/index.jsx";

import { categoriesApi } from "./services/categoriesApi";
import { collectionsApi } from "./services/collectionsApi.js";
import { productsApi } from "./services/productsApi.js";
import { authApi } from "./services/auth";
import { colorsApi } from "./services/colorsApi.js";
import { sizesApi } from "./services/sizesApi.js";
import { ordersApi } from "./services/ordersApi.js";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    categoryproducts: categoryProductsReducer,
    userAuth,
    adminOrders,
    clients,
    admins,
    clientProducts,
    basket,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [collectionsApi.reducerPath]: collectionsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [colorsApi.reducerPath]: colorsApi.reducer,
    [sizesApi.reducerPath]: sizesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
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
      ordersApi.middleware
    ),
});
