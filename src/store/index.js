import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice";
import categoryProductsReducer from "./category/categoryProductsSlice";

import adminCategories from "./adminCategories";
import adminAuth from "./adminAuth";
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

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    categoryproducts: categoryProductsReducer,
    adminCategories,
    adminAuth,
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
  },
});
