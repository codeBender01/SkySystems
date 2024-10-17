import React, { useState, useEffect, useRef } from "react";

import { HashLink } from "react-router-hash-link";
import styles from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaBars } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { AiOutlinePinterest } from "react-icons/ai";
import { LuFacebook } from "react-icons/lu";
import { SlSocialTwitter } from "react-icons/sl";
import { LiaTelegram } from "react-icons/lia";
import { useDispatch } from "react-redux";

import logo from "../../assets/skylogo.svg";

function ClientHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientInfo, setClientInfo] = useState({});
  const dropdownRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.current &&
        !dropdownRefs.current.some((ref) => ref.contains(event.target))
      ) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    setClientInfo(JSON.parse(localStorage.getItem("clientInfo")));
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 2) {
      dispatch(search(value));
      navigate(`/search?query=${value}`);
    }
  };

  const handleLinkClick = () => {
    setDropdownOpen(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li className="w-[30%]">
            <Link style={{ display: "flex", alignItems: "center" }} to={"/"}>
              <img
                className="w-[100%] min-w-[90px]"
                src={logo}
                alt=""
                style={{ height: "90px" }}
              />
            </Link>
          </li>
          <li
            className={styles.navbar__dropdown}
            ref={(el) => (dropdownRefs.current[0] = el)}
            onClick={() => toggleDropdown(0)}
          >
            Dropdown
            {dropdownOpen === 0 && (
              <ul
                className={`${styles.navbar__dropdownMenu} ${styles.navbar__dropdownOpen}`}
              >
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            )}
          </li>

          <li onClick={() => navigate("/items/categories")}>Categories</li>
          <li onClick={() => navigate("/items/collections")}>Collections</li>
          <li onClick={() => navigate("/items/allProducts")}>Products</li>

          <li>
            <div
              className={`${styles.navbar__search} border-[1px] px-1 rounded-md border-paleGray outline-none`}
            >
              <IoIosSearch />
              <input
                type="text"
                placeholder="Search here"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </li>
        </ul>
        <div className={styles.navbar__login}>
          <Link to={"/items/checkout"}>
            {" "}
            <HiOutlineShoppingBag />
          </Link>

          <div className="text-nowrap">
            {clientInfo ? clientInfo.firstName : ""}
          </div>

          <div className="flex items-center gap-2">
            <Link
              className="hover:opacity-80 duration-150"
              to={"/client-auth/login"}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
      <div className={styles.mobile}>
        <div
          onClick={toggleMobileMenu}
          style={{ borderRight: "1px solid black" }}
          className="p-2 flex items-center"
        >
          <FaBars size={24} />
        </div>
        <div>
          <Link style={{ display: "flex", alignItems: "center" }} to={"/"}>
            <img src={logo} alt="" style={{ height: "90px" }} />
          </Link>
        </div>
        <div
          className={`${styles.mobile__menuBar} ${
            isMobileMenuOpen ? styles.mobile__menuBarOpen : ""
          }`}
        >
          <ul>
            <li>
              <HashLink to={"#hero"} onClick={handleLinkClick}>
                Home
              </HashLink>
            </li>
            <li>
              <HashLink to={"/items/allProducts"} onClick={handleLinkClick}>
                Products
              </HashLink>
            </li>
            <li>
              <Link to={"/items/allProducts"} onClick={handleLinkClick}>
                Shop
              </Link>
            </li>
            <li>
              <HashLink smooth to={"#contact"} onClick={handleLinkClick}>
                Contact Us
              </HashLink>
            </li>
            <li>
              <HashLink smooth to={"#about"} onClick={handleLinkClick}>
                About Us
              </HashLink>
            </li>
            <li>
              <HashLink smooth to={"#service"} onClick={handleLinkClick}>
                Service
              </HashLink>
            </li>
            <li>
              <HashLink smooth to={"/login"} onClick={handleLinkClick}>
                Login
              </HashLink>
            </li>
            <li className="hover:bg-white">
              <div>
                <FaInstagram />
              </div>
              <div>
                <AiOutlinePinterest />
              </div>
              <div>
                <LuFacebook />
              </div>
              <div>
                <SlSocialTwitter />
              </div>
              <div>
                <LiaTelegram />
              </div>
            </li>
          </ul>
        </div>
        <div
          style={{ borderLeft: "1px solid black" }}
          className="p-2 flex items-center"
        >
          <Link to={"/checkout"}>
            {" "}
            <HiOutlineShoppingBag size={24} />{" "}
          </Link>
        </div>
      </div>
    </>
  );
}

export default ClientHeader;
