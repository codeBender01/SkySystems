import Sidebar from "../components/adminSidebar";
import Header from "../components/adminHeader";

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-[100vh] w-[100%] px-0 bg-paleGray">
      <div className="w-[25%] ">
        <Sidebar />
      </div>
      <div className="page w-[75%] px-[15px] overflow-y-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
