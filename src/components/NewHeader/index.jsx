import { FaEuroSign } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import { BiDollar } from "react-icons/bi";
import { FaTurkishLiraSign, FaManatSign, FaHeart } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { GiShoppingBag } from "react-icons/gi";
import { TfiClose } from "react-icons/tfi";
import { AiOutlineMenu } from "react-icons/ai";

import { Modal, Divider, Input } from "antd";
import HeaderMenu from "../HeaderMenu";

import { useState } from "react";
import { useNavigate } from "react-router";

import logo from "../../assets/skyLogo.png";

import "../../antd.css";

const curr = [
  {
    name: "usd",
    icon: <BiDollar />,
  },
  {
    name: "try",
    icon: <FaTurkishLiraSign />,
  },
  {
    name: "tmt",
    icon: <FaManatSign />,
  },
];

const arr = [
  {
    name: "Home",
  },
  {
    name: "Link",
  },
  {
    name: "Link",
  },
  {
    name: "Collections",
    isDrop: true,
  },
  {
    name: "Categories",
    isDrop: true,
  },
  {
    name: "Gifts",
    isDrop: true,
  },
];

export default function NewHeader() {
  const navigate = useNavigate();

  const [openWishList, setOpenWishList] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openHeaderMenu, setOpenHeaderMenu] = useState(false);

  return (
    <header className="pt-[7px] px-4 w-[100%] relative">
      <div className="flex justify-between md:justify-end md:p-0 py-2 items-center">
        <div
          onClick={() => {
            setOpenHeaderMenu(!openHeaderMenu);
          }}
          className="block md:hidden text-headerGray hover:text-blackMain duration-150 cursor-pointer"
        >
          <AiOutlineMenu size={22} />
        </div>
        <div className="flex ml-[100px] md:hidden justify-center h-[50px] w-[140]">
          <img src={logo} alt="" className="w-[100%] h-[100%]" />
        </div>
        <div className="z-50 relative border-[1px] border-headerGray hidden md:flex items-center text-headerGrayTwo font-cat p-[11px] gap-[10px] cursor-pointer rounded-[2px] group-hover:text-blackMain group/edit duration-150">
          <div className="flex items-center uppercase text-sm font-bold">
            eur
            <FaEuroSign />
          </div>
          <div className="group-hover/edit:rotate-180 duration-300">
            <SlArrowDown size={14} />
          </div>
          <ul className="hidden absolute bg-white top-[110%] left-0 p-2 border-[1px] border-headerGray rounded-[2px] group-hover/edit:flex flex-col gap-4 w-[101%]">
            {curr.map((c) => {
              return (
                <li
                  key={c.name}
                  className="flex uppercase text-headerGrayTwo gap-2 items-center font-cat font-bold hover:text-blackMain duration-150"
                >
                  {c.name}
                  {c.icon}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center">
          <div className="text-headerGrayTwo ml-4 hover:text-blackMain duration-150 cursor-pointer">
            <IoSearchOutline
              onClick={() => setOpenSearchBar(!openSearchBar)}
              size={22}
            />
          </div>
          <div className="text-headerGrayTwo mx-[12px] hover:text-blackMain duration-150 cursor-pointer">
            <BsPersonCircle
              onClick={() => {
                navigate("/client-auth/login");
              }}
              size={22}
            />
          </div>
          <div className="text-headerGrayTwo mr-[10px] md:mr-[30px] hover:text-blackMain duration-150 cursor-pointer">
            <FiHeart onClick={() => setOpenWishList(!openWishList)} size={22} />
          </div>
          <div className="text-headerGrayTwo hover:text-blackMain duration-150 cursor-pointer">
            <GiShoppingBag size={20} />
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-center">
        <img src={logo} alt="" />
      </div>
      <ul className="hidden md:flex items-center justify-center gap-[40px]">
        {arr.map((l, i) => {
          return (
            <li
              key={i}
              className={`group/drop relative z-50 flex items-center gap-[6px] text-sm text-headerGrayTwo uppercase ${
                l.isDrop ? "font-cat" : "font-mul"
              } cursor-pointer`}
            >
              {l.name}
              {l.isDrop && <SlArrowDown size={10} className="mt-0" />}
              {l.isDrop ? (
                <ul
                  className="hidden bg-[white] absolute z-50 group-hover/drop:flex top-[100%] w-[100%] rounded-[2px] py-2 px-4 gap-[12px] flex-col min-w-[160px]"
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <li className="hover:text-blackMain duration-100">Link</li>
                  <li className="hover:text-blackMain duration-100">Link</li>
                  <li className="hover:text-blackMain duration-100">Link</li>
                  <li className="hover:text-blackMain duration-100">Link</li>
                  <li className="hover:text-blackMain duration-100">Link</li>
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>

      <Modal
        onCancel={() => setOpenWishList(false)}
        open={openWishList}
        footer={null}
        width={"60%"}
        centered
      >
        <div className="flex justify-between">
          <div className="flex items-center font-cat text-headerGrayTwo gap-2 text-md2">
            <FaHeart />
            Wishlist
          </div>
        </div>
        <Divider />
        <div>
          <p className="font-mul text-headerGray text-[16px] text-center py-12">
            there are no items in this wishlist
          </p>
        </div>
        <Divider />
      </Modal>

      <div
        className={`${
          openSearchBar ? "block animate-fade-in" : "hidden animate-fade-out"
        } absolute bg-white w-[90%] left-[50%] translate-x-[-50%] z-50 text-headerGrayTwo pb-8`}
      >
        <div className="flex w-[100%] justify-end duration-150 hover:text-md2 cursor-pointer">
          <TfiClose onClick={() => setOpenSearchBar(false)} />
        </div>
        <div className="text-lg text-center mt-8 font-mul">
          Search Our Collections
        </div>
        <Input
          className="mt-4 border-blackMain border-[1px] outline-none hover:border-blackMain"
          placeholder="What are you looking for?"
          prefix={<IoSearchOutline />}
        />
      </div>
      <HeaderMenu open={openHeaderMenu} />
    </header>
  );
}
