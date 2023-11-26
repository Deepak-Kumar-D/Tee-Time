"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { searchItem } from "../GlobalRedux/Features/counter/counterSlice";

const Navbar = () => {
  const pathname = usePathname();
  const reduxProducts = useSelector((state: RootState) => state.productRed);
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);

  const searchProduct = (event: any) => {
    dispatch(searchItem(event.target.value.toLowerCase()));
  };

  return (
    <section className={`${styles.navbarCntr} flexRowSBC`}>
      <div className={styles.menuNavCntr}>
        <div className={styles.menuNav} onClick={() => setOpenMenu(!openMenu)}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
            <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
          </svg>
        </div>

        <Link href="/">
          <div className={styles.navLogo}>
            <img src="./tee-time-logo.png" alt="Navbar Logo" />
          </div>
        </Link>
      </div>

      <div className={styles.navLinkCntr}>
        <div className={`${styles.searchCntr} flexRowSBC`}>
          <input type="text" onKeyUp={searchProduct} />
          <span>🔍</span>
        </div>

        <Link className={`objCenter ${pathname === "/products" && styles.activeNav}`} href="/products">
          <p>Products</p>
        </Link>

        <Link className={`objCenter ${pathname === "/cart" && styles.activeNav}`} href="/cart">
          <div className={`${styles.cartIcon} objCenter`}>
            {reduxProducts.cart.length > 0 && <p className={`${styles.cartCount} objCenter`}>{reduxProducts.cart.length}</p>}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
            </svg>
          </div>
        </Link>
      </div>

      <div className={styles.navRespCntr}>
        <Link className={`objCenter`} href="/cart">
          <div className={`${styles.cartIcon} objCenter`}>
            {reduxProducts.cart.length > 0 && <p className={`${styles.cartCount} objCenter`}>{reduxProducts.cart.length}</p>}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Responsive Modal Navbar */}
      <div className={`${openMenu ? styles.openMenu : styles.closeMenu} modal`}>
        <div className={`${styles.navModal}`}>
          <div className={styles.navModalHeader}>
            <p onClick={() => setOpenMenu(!openMenu)}>🆇</p>

            <Link href="/">
              <div className={styles.navLogo}>
                <img src="./tee-time-logo.png" alt="Navbar Logo" />
              </div>
            </Link>
          </div>

          <div className={styles.navRespList} onClick={() => setOpenMenu(!openMenu)}>
            <Link className={`${pathname === "/" && styles.activeNav}`} href="/">
              Home
            </Link>

            <Link className={`${pathname === "/products" && styles.activeNav}`} href="/products" onClick={() => setOpenMenu(!openMenu)}>
              Products
            </Link>

            <Link className={`${pathname === "/cart" && styles.activeNav}`} href="/cart" onClick={() => setOpenMenu(!openMenu)}>
              Cart
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
