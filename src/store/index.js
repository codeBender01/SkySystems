import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice";
import categoryProductsReducer from "./category/categoryProductsSlice";

import adminProducts from "./adminProducts";
import adminCollection from "./adminCollection";
import userAuth from "./userAuth";
import adminOrders from "./adminOrders";
import clients from "./clients";
import admins from "./admins";
import clientProducts from "./clientProducts";
import clientCollections from "./clientCollections";
import clientCategories from "./clientCategories";
import basket from "./basket";

import authSlice from "./auth/index.jsx";

import { categoriesApi } from "./services/categoriesApi";
import { collectionsApi } from "./services/collectionsApi.js";
import { authApi } from "./services/auth";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    categoryproducts: categoryProductsReducer,
    adminProducts,
    adminCollection,
    userAuth,
    adminOrders,
    clients,
    admins,
    clientProducts,
    clientCollections,
    clientCategories,
    basket,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [collectionsApi.reducerPath]: collectionsApi.reducer,
    authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      authApi.middleware,
      collectionsApi.middleware
    ),
});
