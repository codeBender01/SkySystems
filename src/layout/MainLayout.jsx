import React from "react";

import NewHeader from "../components/NewHeader";
import Footer from "../components/footer";

import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <NewHeader />
      <Outlet />
      <Footer />
    </div>
  );
}
