import React from "react";

import ProductHeader from "../components/productHeader";
import Footer from "../components/footer";

import { Outlet } from "react-router";

export default function ProductLayout() {
  return (
    <div className="flex flex-col w-[100%] px-0 min-h-[100vh]">
      <ProductHeader />
      <Outlet />
      <Footer />
    </div>
  );
}
