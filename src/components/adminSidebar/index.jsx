import { useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Cookies from "universal-cookie";

import logo from "../../assets/logo.png";

import { BsPeopleFill } from "react-icons/bs";
import { BiBox } from "react-icons/bi";
import {
  MdOutlineShoppingCart,
  MdOutlineCategory,
  MdOutlineCollectionsBookmark,
} from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";

const tabs = [
  {
    id: 1,
    text: "Categories",
    path: "/admin/categories",
    icon: <MdOutlineCategory />,
  },
  {
    id: 2,
    text: "Collections",
    path: "/admin/collections",
    icon: <MdOutlineCollectionsBookmark />,
  },
  {
    id: 3,
    text: "Products",
    path: "/admin/products",
    icon: <BiBox />,
  },
  {
    id: 4,
    text: "Orders",
    path: "/admin/orders",
    icon: <MdOutlineShoppingCart />,
  },
  {
    id: 5,
    text: "Customers",
    path: "/admin/customers",
    icon: <BsPeopleFill />,
  },
  {
    id: 6,
    text: "Admin users",
    path: "/admin/users",
    icon: <RiAdminLine />,
  },
];

const cookies = new Cookies();

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-[100vh] overflow-y-auto bg-white py-4 flex flex-col items-center"
      style={{
        boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <div className="flex items-center justify-center gap-3">
        <img src={logo} alt="logo" />
        <div className="font-man text-[20px] text-blackMain">Admin</div>
      </div>

      <ul className="mt-6 flex flex-col gap-2 w-[100%] items-center">
        {tabs.map((t) => {
          return (
            <li
              onClick={() => {
                navigate(t.path);
              }}
              className={
                location.pathname.includes(t.path)
                  ? "flex items-center w-[85%] gap-3 p-2 bg-paleGray text-blackMain rounded-md cursor-pointer"
                  : "flex items-center w-[85%] gap-3 p-2 bg-white text-textGray rounded-md cursor-pointer hover:bg-paleGray duration-100 hover:text-blackMain"
              }
              key={t.id}
            >
              {t.icon}
              {t.text}
            </li>
          );
        })}
      </ul>

      <div className="bg-paleGray w-[100%] h-[2px] mt-32"></div>

      <div
        onClick={async () => {
          cookies.remove("adminAccessToken", { path: "/" });
          navigate("/");
        }}
        className="mt-auto bg-btnRed text-white w-[80%] text-center py-2 rounded-md text-md hover:opacity-85 duration-100 cursor-pointer"
      >
        Log out
      </div>
    </div>
  );
}
