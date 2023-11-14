"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const products = await fetch("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json");
    setProducts(await products.json());
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className={`${styles.navbarCntr} flexRowSBC`}>
      <Link href="/">
        <div className={styles.navLogo}>
          <img src="./tee-time-logo.png" alt="Navbar Logo" />
        </div>
      </Link>

      <div className={`${styles.navLinkCntr}`}>
        <div className={`${styles.searchCntr} flexRowSBC`}>
          <input type="text" />
          <span>🔍</span>
        </div>

        <Link className={`objCenter ${pathname === "/products" && styles.activeNav}`} href="/products">
          <p>Products</p>
        </Link>

        <Link className={`objCenter ${pathname === "/cart" && styles.activeNav}`} href="/cart">
          <div className={`${styles.cartIcon} objCenter`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Navbar;
