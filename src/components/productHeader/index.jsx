import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaBars } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { AiOutlinePinterest } from "react-icons/ai";
import { LuFacebook } from "react-icons/lu";
import { SlSocialTwitter } from "react-icons/sl";
import { LiaTelegram } from "react-icons/lia";
import styles from "./productHeader.module.scss";
import { HashLink } from "react-router-hash-link";

import logo from "../../assets/skylogo.svg";

const ProductHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.auth}>
            <Link style={{ borderRight: "1px solid black" }} to={"/"}>
              Home
            </Link>
            <a style={{ borderRight: "1px solid black" }} href="/contact">
              Contact
            </a>
          </div>
          <div>
            <Link style={{ display: "flex", alignItems: "center" }} to={"/"}>
              <img src={logo} alt="" style={{ height: "90px" }} />
            </Link>
          </div>
          <div className={styles.auth}>
            <Link
              style={{ borderLeft: "1px solid black" }}
              to={"/client-auth/signup"}
            >
              Sign in
            </Link>
            <Link
              style={{ borderLeft: "1px solid black" }}
              to={"/items/checkout"}
            >
              Cart
            </Link>
          </div>
        </nav>
        <div className={styles.mobile}>
          <div
            onClick={toggleMobileMenu}
            style={{ borderRight: "1px solid black" }}
            className="p-2 flex items-center justify-center"
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
                <HashLink to={"/#hero"} onClick={handleLinkClick}>
                  Home
                </HashLink>
              </li>
              <li>
                <Link to={"/allProducts"} onClick={handleLinkClick}>
                  Shop
                </Link>
              </li>
              <li>
                <HashLink smooth to={"/#contact"} onClick={handleLinkClick}>
                  Contact Us
                </HashLink>
              </li>
              <li>
                <HashLink smooth to={"/#about"} onClick={handleLinkClick}>
                  About Us
                </HashLink>
              </li>
              <li>
                <HashLink smooth to={"/#service"} onClick={handleLinkClick}>
                  Service
                </HashLink>
              </li>
              <li className={styles.socialIcons}>
                <FaInstagram />
                <AiOutlinePinterest />
                <LuFacebook />
                <SlSocialTwitter />
                <LiaTelegram />
              </li>
            </ul>
          </div>
          <div
            style={{ borderLeft: "1px solid black" }}
            className="p-2 flex items-center justify-center"
          >
            <Link to={"/items/checkout"}>
              <HiOutlineShoppingBag size={24} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default ProductHeader;
