import React from "react";

import ClientHeader from "../components/header";
import Footer from "../components/footer";

import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <ClientHeader />
      <Outlet />
      <Footer />
    </div>
  );
}
