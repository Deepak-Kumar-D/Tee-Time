"use client";
import React from "react";
import styles from "./page.module.css";
import ProductsCntr from "../components/productsCntr";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "./GlobalRedux/Features/counter/counterSlice";

export default function Home() {
  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      const resp = await fetch("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json");
      const tempProducts = await resp.json();
      dispatch(addProduct(tempProducts));
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <section className={styles.homeCntr}>
      <div className={styles.homeBanner}>
        <img src="/images/home-banner.jpg" alt="Home Banner" />
      </div>

      <ProductsCntr />
    </section>
  );
}
