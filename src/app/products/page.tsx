"use client";
import React, { useEffect, useState } from "react";
import ProductsCntr from "../../components/productsCntr";
import styles from "./page.module.css";

const Products = () => {
  const [colors, setColors] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProd, setFilteredProd] = useState<any[]>([]);
  const [filters, setFilters] = useState({ gender: "", colours: [] as any, price: "", type: [] as any });

  const selectFilter = (type: any, option: any) => {
    let tempFilters = { ...filters };

    if (type === "gender") {
      tempFilters.gender = option;
      setFilters(tempFilters);
    } else if (type === "colour") {
      let colourIndx = tempFilters.colours.findIndex((ele: any) => ele === option);

      if (colourIndx > -1) {
        tempFilters.colours.splice(colourIndx, 1);
        setFilters(tempFilters);
      } else {
        tempFilters.colours.push(option);
        setFilters(tempFilters);
      }
    } else if (type === "type") {
      let typeIndx = tempFilters.type.findIndex((ele: any) => ele === option);

      if (typeIndx > -1) {
        tempFilters.type.splice(typeIndx, 1);
        setFilters(tempFilters);
      } else {
        tempFilters.type.push(option);
        setFilters(tempFilters);
      }
    } else if (type === "price") {
      tempFilters.price = option;
      setFilters(tempFilters);
    }

    filterProducts(tempFilters);
  };

  const filterProducts = (tempFilters: any) => {
    let arr = new Array();
    let tempFiltered = new Array();

    if (tempFilters.gender) {
      arr = products.filter((prod) => prod.gender.toLowerCase() === tempFilters.gender);
    } else {
      arr = [...products];
    }

    if (tempFilters.price) {
      let rangeP = tempFilters.price.split("-");
      let range1 = Number(rangeP[0].replace("₹", ""));
      let range2 = Number(rangeP[1].replace("₹", ""));

      arr = arr.filter((prod) => prod.price >= range1 && prod.price <= range2);
    } else {
      arr = [...products];
    }

    if (tempFilters.colours.length) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < tempFilters.colours.length; j++) {
          if (arr[i].color === tempFilters.colours[j]) {
            if (tempFilters.type.length) {
              for (let k = 0; k < tempFilters.type.length; k++) {
                if (arr[i].type === tempFilters.type[k]) {
                  tempFiltered.push(arr[i]);
                }
              }
            } else {
              tempFiltered.push(arr[i]);
            }
          }
        }
      }
    }

    if (!tempFilters.colours.length && tempFilters.type.length) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < tempFilters.type.length; j++) {
          if (arr[i].type === tempFilters.type[j]) {
            tempFiltered.push(arr[i]);
          }
        }
      }
    }

    if (tempFiltered.length) {
      setFilteredProd(tempFiltered);
    } else if ((tempFilters.gender || tempFilters.price) && !tempFilters.colours.length && !tempFilters.type.length) {
      setFilteredProd(arr);
    } else {
      setFilteredProd([]);
    }
  };

  const resetFilters = () => {
    setFilters({ gender: "", colours: [] as any, price: "", type: [] as any });
    setFilteredProd([...products]);
    document.querySelectorAll("input[type=checkbox]").forEach((el: any) => (el.checked = false));
    document.querySelectorAll("input[type=radio]").forEach((el: any) => (el.checked = false));
  };

  const getProducts = async () => {
    try {
      const resp = await fetch("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json");
      const tempProducts = await resp.json();
      setProducts(tempProducts);
      setFilteredProd(tempProducts);

      let tempColours = [];
      let tempTypes = [];

      for (let i = 0; i < tempProducts.length; i++) {
        let checkColor = tempColours.find((ele: any) => ele === tempProducts[i].color);
        if (!checkColor) tempColours.push(tempProducts[i].color);

        let checkType = tempTypes.find((ele: any) => ele === tempProducts[i].type);
        if (!checkType) tempTypes.push(tempProducts[i].type);
      }

      setColors(tempColours);
      setTypes(tempTypes);
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className={`${styles.productsPg}`}>
      <div className={`${styles.filterCntr}`}>
        <h4>
          Filter Products <span onClick={resetFilters}>Reset</span>
        </h4>

        <div className={`${styles.filterSubCntr}`}>
          <div className={`${styles.filterArea}`}>
            <h5>Gender</h5>

            <div className={`${styles.filterType}`}>
              <input type="radio" id="men" name="gender" value="men" onChange={(e) => selectFilter("gender", e.target.value)} />
              <label htmlFor="men">Men</label>
            </div>

            <div className={`${styles.filterType}`}>
              <input type="radio" id="women" name="gender" value="women" onChange={(e) => selectFilter("gender", e.target.value)} />
              <label htmlFor="women">Women</label>
            </div>
          </div>

          <div className={`${styles.filterArea}`}>
            <h5>Colour</h5>

            {colors.map((color, indx) => {
              return (
                <div className={`${styles.filterType}`} key={`color_+${indx}`}>
                  <input type="checkbox" id={color} name={color} onChange={() => selectFilter("colour", color)} />
                  <label htmlFor={color}>{color}</label>
                </div>
              );
            })}
          </div>

          <div className={`${styles.filterArea}`}>
            <h5>Price Range</h5>

            <div className={`${styles.filterType}`}>
              <input type="radio" id="price1" name="price" value="₹0 - ₹300" onChange={(e) => selectFilter("price", e.target.value)} />
              <label htmlFor="price1">₹0 - ₹300</label>
            </div>

            <div className={`${styles.filterType}`}>
              <input type="radio" id="price2" name="price" value="₹300 - ₹500" onChange={(e) => selectFilter("price", e.target.value)} />
              <label htmlFor="price2">₹300 - ₹500</label>
            </div>

            <div className={`${styles.filterType}`}>
              <input type="radio" id="price3" name="price" value="₹500 - ₹1000" onChange={(e) => selectFilter("price", e.target.value)} />
              <label htmlFor="price3">₹500 - ₹1000</label>
            </div>
          </div>

          <div className={`${styles.filterArea}`}>
            <h5>Type</h5>

            {types.map((type, indx) => {
              return (
                <div className={`${styles.filterType}`} key={`type_+${indx}`}>
                  <input type="checkbox" id={type} name={type} onChange={() => selectFilter("type", type)} />
                  <label htmlFor={type}>{type}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ProductsCntr products={filteredProd} />
    </section>
  );
};

export default Products;
