import React from "react";

import { IoIosLogOut, IoIosArrowForward } from "react-icons/io";

export default function Header() {
  return (
    <header className="w-[95%] mx-auto font-main flex justify-between items-center py-4">
      <div className="flex items-center gap-2">
        <div className="text-textGray ">Admin</div>
        <IoIosArrowForward />
        <div>Dashboard</div>
      </div>
      <div className="text-textGray text-[22px] cursor-pointer">
        <IoIosLogOut />
      </div>
    </header>
  );
}
