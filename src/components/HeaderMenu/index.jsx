import { useEffect, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { FaEuroSign } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { FaTurkishLiraSign, FaManatSign } from "react-icons/fa6";

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

export default function HeaderMenu({ open }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <div
      className={`${
        open ? " translate-x-0" : "translate-x-[-200%] "
      } bg-white absolute top-[100%] w-[100%] left-0 z-[200] h-[100vh] duration-[400ms] ease-in-out flex flex-col`}
    >
      <ul className="flex flex-col justify-center gap-[20px] px-4">
        {arr.map((l, i) => {
          return (
            <li
              key={i}
              className={`relative z-50 text-sm text-headerGrayTwo uppercase ${
                l.isDrop ? "font-cat" : "font-mul"
              } cursor-pointer`}
              onClick={() => {
                if (l.isDrop) {
                  setActiveDropdown(i);
                }
                if (activeDropdown === i) {
                  setActiveDropdown(null);
                }
              }}
            >
              <div className="justify-between flex items-center gap-[6px] ">
                {l.name}
                {l.isDrop && (
                  <SlArrowDown
                    size={10}
                    className={`${
                      activeDropdown === i ? "rotate-180" : "rotate-0"
                    } mt-0 duration-300`}
                  />
                )}
              </div>
              {l.isDrop ? (
                <ul
                  className={`${
                    activeDropdown === i
                      ? "max-h-96 overflow-auto"
                      : "max-h-0 overflow-hidden"
                  } duration-700 ml-[15px] border-l-[1px] border-headerGray pl-2 flex flex-col gap-[4px]`}
                >
                  <li className="hover:text-blackMain cursor-pointer">Link</li>
                  <li className="hover:text-blackMain cursor-pointer">Link</li>
                  <li className="hover:text-blackMain cursor-pointer">Link</li>
                  <li className="hover:text-blackMain cursor-pointer">Link</li>
                  <li className="hover:text-blackMain cursor-pointer">Link</li>
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
      <div className="w-fit self-center mt-[20px] z-50 relative border-[1px] border-headerGray flex items-center text-headerGrayTwo font-cat p-[11px] gap-[10px] cursor-pointer rounded-[2px] group-hover:text-blackMain group/edit duration-150">
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
    </div>
  );
}
