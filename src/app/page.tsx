"use client";
import React from "react";
import styles from "./page.module.css";
import ProductsCntr from "../components/productsCntr";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  const getProducts = async () => {
    try {
      const resp = await fetch("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json");
      const products = await resp.json();
      setProducts(await products);
    } catch (error) {
      console.log(error);
    }
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
