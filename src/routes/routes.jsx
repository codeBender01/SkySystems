import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

// Layout
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/Layout";
import ProductLayout from "../layout/Productlayout";

import AdminLogin from "../pages/adminLogin";

import ProtectedRoute from "./ProtectedRoute";

// Pages
const Home = lazy(() => import("../pages/home/home"));
const Product = lazy(() => import("../pages/product/index"));
const CheckoutForm = lazy(() => import("../pages/checkout"));
const TermsAndConditions = lazy(() => import("../pages/termsAndCond"));
const AllProducts = lazy(() => import("../pages/allProducts"));
const ShippingPolicy = lazy(() => import("../pages/shippingPolicy"));
const PrivacyPolicy = lazy(() => import("../pages/privacy"));
const CategoryProducts = lazy(() => import("../pages/categoryProducts"));
const UserForm = lazy(() => import("../pages/signUp"));
const LoginForm = lazy(() => import("../pages/login"));
const SearchResults = lazy(() => import("../pages/search"));
const Collections = lazy(() => import("../pages/allCollections"));
const Categories = lazy(() => import("../pages/allCategories"));
const NewHome = lazy(() => import("../pages/NewHome/index"));

//Admin

const AdminProducts = lazy(() => import("../pages/adminProducts"));
const AdminCategories = lazy(() => import("../pages/adminCategories"));
const AdminOrders = lazy(() => import("../pages/adminOrders"));
const AdminCustomers = lazy(() => import("../pages/adminCustomers"));
const AdminCollections = lazy(() => import("../pages/adminCollections"));
const AdminColors = lazy(() => import("../pages/adminColors"));
const AdminSizes = lazy(() => import("../pages/adminSizes"));
const Admins = lazy(() => import("../pages/admins"));

import Loading from "../pages/Loading";

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <Suspense fallback={<Loading />}>
          <MainLayout />
        </Suspense>
      ),
      path: "/",
      children: [
        { path: "/", element: <NewHome /> },
        { path: "/terms-conditions", element: <TermsAndConditions /> },
        { path: "/shipping-policy", element: <ShippingPolicy /> },
        { path: "/privacy-policy", element: <PrivacyPolicy /> },
        { path: "/search", element: <SearchResults /> }, // Add this line
      ],
    },
    {
      element: (
        <Suspense fallback={<Loading />}>
          <LoginForm />
        </Suspense>
      ),
      path: "/client-auth/login",
    },
    {
      element: (
        <Suspense fallback={<Loading />}>
          <UserForm />
        </Suspense>
      ),
      path: "/client-auth/signup",
    },

    {
      element: (
        <Suspense fallback={<Loading />}>
          <ProductLayout />
        </Suspense>
      ),
      path: "/items",
      children: [
        { path: "/items/allProducts", element: <AllProducts /> },
        { path: "/items/collections", element: <Collections /> },
        { path: "/items/categories", element: <Categories /> },
        {
          path: "/items/category-products/:categoryTitle",
          element: <CategoryProducts />,
        },
        { path: "/items/product/:productId", element: <Product /> },
        { path: "/items/checkout", element: <CheckoutForm /> },
      ],
    },
    {
      element: (
        <Suspense fallback={<Loading />}>
          <AdminLogin />
        </Suspense>
      ),
      path: "/admin/login",
    },
    {
      element: (
        <Suspense fallback={<Loading />}>
          <ProtectedRoute Component={AdminLayout} />
        </Suspense>
      ),
      path: "/admin",
      children: [
        {
          path: "/admin/categories",
          element: <AdminCategories />,
        },
        {
          path: "/admin/products",
          element: <AdminProducts />,
        },
        {
          path: "/admin/orders",
          element: <AdminOrders />,
        },
        {
          path: "/admin/customers",
          element: <AdminCustomers />,
        },
        {
          path: "/admin/collections",
          element: <AdminCollections />,
        },
        {
          path: "/admin/productcolors",
          element: <AdminColors />,
        },
        {
          path: "/admin/productsizes",
          element: <AdminSizes />,
        },
        {
          path: "/admin/users",
          element: <Admins />,
        },
      ],
    },
  ]);

  return routes;
}
