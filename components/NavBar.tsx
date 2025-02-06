"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useMenu } from "@/lib/MenuContext";

const NavBar = () => {
  const { menuOpen, toggleMenu, closeMenu } = useMenu();

  return (
    <>
      <nav className="main-nav">
        <div
          className={`toggle-menu ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
        </div>
        <Link href="/" style={{ cursor: "pointer" }}>
          <Image
            className="kolliflower-logo"
            src="/images/Kolliflower-Logo-Black.png"
            alt="Kolliflower Logo"
            width={180}
            height={50}
          />
        </Link>
        <span className="main-cart">
          <ShoppingCart />
        </span>
      </nav>

      <div className={`slide-down-menu ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link href="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" onClick={closeMenu}>
              Products
            </Link>
          </li>
          <li>
            <Link href="/about-us" onClick={closeMenu}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="/faq" onClick={closeMenu}>
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
